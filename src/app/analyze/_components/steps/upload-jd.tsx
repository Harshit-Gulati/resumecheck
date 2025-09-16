import { Doto } from "next/font/google";
import { FileUploader } from "./file-uploader";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const UploadJD = () => {
  return (
    <>
      <h3 className={`${doto.className} mb-1 text-lg font-semibold md:text-xl`}>
        Upload Job Description
      </h3>
      <p className="text-white/70">Upload your resume file</p>
      <div className="mx-3 mt-2 flex h-full w-full max-w-sm flex-col items-center justify-center rounded-md">
        <FileUploader />
      </div>
    </>
  );
};
