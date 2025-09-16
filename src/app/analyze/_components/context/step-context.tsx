"use client";

import { GeminiAnalysisResponse } from "@/types/prompt";
import { upload } from "@vercel/blob/client";
import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

interface FileData {
  resumeFile?: { file: File; url: string };
  jdFile?: { file: File; url: string };
}

type StepContextType = {
  stepNumber: number;
  loading: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  results: GeminiAnalysisResponse | null;
  files: FileData;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (type: "resume" | "jd") => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [files, setFiles] = useState<FileData>({});
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<GeminiAnalysisResponse | null>(null);

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 10 * 1024 * 1024;
    const minSize = 100;

    if (!validTypes.includes(file.type))
      return {
        isValid: false,
        error: "Please upload a PDF, DOC, or DOCX file",
      };

    if (file.size > maxSize)
      return {
        isValid: false,
        error: "File size must be less than 10MB",
      };

    if (file.size < minSize)
      return {
        isValid: false,
        error: "File appears to be empty or corrupted",
      };

    return { isValid: true };
  };

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      const validation = validateFile(file);
      if (!validation.isValid) {
        toast.error(validation.error);
        return;
      }

      const key = stepNumber === 1 ? "resumeFile" : "jdFile";
      const fileType = stepNumber === 1 ? "Resume" : "Job Description";

      setIsUploading(true);

      const uploadToast = toast.loading(`Uploading ${fileType}...`);

      try {
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          onUploadProgress: (progress) => {
            console.log("progress", progress);
          },
        });

        setFiles((prev) => ({
          ...prev,
          [key]: { file, url: newBlob.url },
        }));

        toast.success(`${fileType} uploaded successfully!`, {
          id: uploadToast,
        });

        event.target.value = "";
      } catch (error) {
        toast.error(`Failed to upload ${fileType}`, {
          id: uploadToast,
          description: (error as Error).message,
        });
        const urls = [];
        if (files.resumeFile?.url) urls.push(files.resumeFile.url);
        if (files.jdFile?.url) urls.push(files.jdFile.url);
        cleanupBlobs(urls);
      } finally {
        setIsUploading(false);
      }
    },
    [stepNumber],
  );

  const removeFile = useCallback(async (type: "resume" | "jd") => {
    const key = type === "resume" ? "resumeFile" : "jdFile";
    const fileType = type === "resume" ? "Resume" : "Job Description";

    if (!key || !files[key]) return;

    await cleanupBlobs([files[key].url]);

    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[key as keyof FileData];
      return newFiles;
    });

    toast.info(`${fileType} removed`);
  }, []);

  const canProceed = useCallback(() => {
    if (isUploading) return false;

    switch (stepNumber) {
      case 1:
        return !!files.resumeFile;
      case 2:
        return !!files.jdFile;
      default:
        return false;
    }
  }, [stepNumber, files, isUploading]);

  const handlePrev = useCallback(() => {
    if (stepNumber === 1) return;

    setStepNumber((prev) => prev - 1);
  }, [stepNumber]);

  const handleNext = useCallback(() => {
    if (isUploading) {
      toast.error("Please wait for file upload to complete");
      return;
    }

    if (!canProceed()) {
      toast.error(
        `Please upload ${stepNumber === 1 ? "a resume" : "both resume and job description"} to continue`,
      );
      return;
    }

    if (stepNumber === 2) {
      getResults();
      return;
    }

    setStepNumber((prev) => prev + 1);
  }, [stepNumber, canProceed, isUploading]);

  const cleanupBlobs = async (urls: string[]) => {
    try {
      await fetch("/api/blob/cleanup", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      console.log("Blobs cleaned up successfully");
    } catch (error) {
      console.error("Failed to cleanup blobs:", error);
    }
  };

  const getResults = useCallback(async () => {
    if (!files.resumeFile?.url || !files.jdFile?.url) {
      toast.error("Please upload both resume and job description first");
      return;
    }

    if (isUploading) {
      toast.error("Please wait for uploads to complete");
      return;
    }

    const analysisToast = toast.loading("Analyzing resume...", {
      description: "This may take up to 30 seconds",
    });

    setLoading(true);
    setResults(null);

    const blobUrlsToDelete: string[] = [];
    if (files.resumeFile?.url) blobUrlsToDelete.push(files.resumeFile.url);
    if (files.jdFile?.url) blobUrlsToDelete.push(files.jdFile.url);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeUrl: files.resumeFile.url,
          jdUrl: files.jdFile.url,
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const result = await response.json();

      toast.success("Analysis completed!", {
        id: analysisToast,
        description: "Check your results below",
      });

      setResults(result.data);

      setLoading(false);

      setStepNumber(3);

      if (blobUrlsToDelete.length > 0) await cleanupBlobs(blobUrlsToDelete);
    } catch (error) {
      toast.error("Analysis failed", {
        id: analysisToast,
        description: (error as Error).message,
      });
      if (blobUrlsToDelete.length > 0) await cleanupBlobs(blobUrlsToDelete);
    }
  }, [files, isUploading]);

  return (
    <StepContext.Provider
      value={{
        results,
        loading,
        stepNumber,
        handlePrev,
        handleNext,
        handleFileChange,
        files,
        removeFile,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const context = useContext(StepContext);

  if (!context)
    throw new Error("useStepContext must be used within a StepContextProvider");

  return context;
};
