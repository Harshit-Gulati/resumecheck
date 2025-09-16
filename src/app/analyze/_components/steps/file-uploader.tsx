import {
  IconFileUpload,
  IconX,
  IconFileTypePdf,
  IconFileTypeDoc,
  IconFileTypeDocx,
} from "@tabler/icons-react";
import { useState } from "react";
import { useStepContext } from "../context/step-context";
import { toast } from "sonner";
import { formatFileSize } from "@/lib/files";

export const FileUploader = () => {
  const { handleFileChange, files, stepNumber, removeFile } = useStepContext();
  const [isDragActive, setIsDragActive] = useState(false);

  const currentFile = stepNumber === 1 ? files.resumeFile : files.jdFile;
  const fileType = stepNumber === 1 ? "resume" : "jd";
  const placeholder =
    stepNumber === 1 ? "Upload your resume" : "Upload job description";

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length === 0) {
      toast.error("No files detected in drop");
      return;
    }

    if (droppedFiles.length > 1) {
      toast.warning("Please drop only one file at a time");
      return;
    }

    //@ts-ignore
    const syntheticEvent = {
      target: {
        files: droppedFiles,
        value: "",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleFileChange(syntheticEvent);
  };

  if (currentFile)
    return (
      <FileList
        currentFile={currentFile}
        removeFile={removeFile}
        handleFileChange={handleFileChange}
        fileType={fileType}
      />
    );

  return (
    <div className="h-full w-full">
      <label
        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
          isDragActive
            ? "scale-[1.02] border-blue-400 bg-blue-500/10"
            : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div
            className={`mb-2 transition-colors ${isDragActive ? "text-blue-400" : "text-white/70"}`}
          >
            <IconFileUpload className="size-8" />
          </div>
          <p
            className={`text-sm font-medium transition-colors ${isDragActive ? "text-blue-400" : "text-white"}`}
          >
            {isDragActive ? "Drop file here" : placeholder}
          </p>
          <p className="text-xs text-white/60">
            {isDragActive ? "Release to upload" : "or drag and drop"}
          </p>
          <p className="mt-2 text-xs text-white/40">Supports PDF (max 10MB)</p>
        </div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

const FileList = ({
  currentFile,
  removeFile,
  handleFileChange,
  fileType,
}: {
  currentFile: { file: File; url: string };
  removeFile: (type: "resume" | "jd") => void;
  fileType: "resume" | "jd";
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full p-1">
      <div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/10 p-4">
        <div className="mr-2 flex w-full items-center">
          {getFileIcon(currentFile)}
          <div className="ml-2 flex w-full items-center justify-between">
            <p className="truncate text-sm font-medium text-green-400">
              {currentFile.file.name}
            </p>
            <p className="text-xs text-white/60">
              {formatFileSize(currentFile.file.size)}
            </p>
          </div>
        </div>

        <button
          onClick={() => removeFile(fileType)}
          className="rounded-full p-1 text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
          title="Remove file"
        >
          <IconX className="size-4" />
        </button>
      </div>

      <label className="mt-2 flex w-full cursor-pointer items-center justify-center p-2 text-xs text-white/60 transition-colors hover:text-white/80">
        <span>Click to replace file</span>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

const getFileIcon = (fileData?: { file: File; url: string }) => {
  if (!fileData) return <IconFileUpload className="size-8" />;

  const type = fileData.file.type;

  if (type.includes("pdf"))
    return (
      <div className="text-xl text-red-500">
        <IconFileTypePdf />
      </div>
    );
  else if (type.includes("docx"))
    return (
      <div className="text-xl text-blue-500">
        <IconFileTypeDocx />
      </div>
    );
  else
    return (
      <div className="text-xl text-blue-500">
        <IconFileTypeDoc />
      </div>
    );
};
