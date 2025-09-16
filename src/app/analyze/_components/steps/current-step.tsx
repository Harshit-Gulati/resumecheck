import { useStepContext } from "../context/step-context";
import { Results } from "../results";
import { UploadJD } from "./upload-jd";
import { UploadResume } from "./upload-resume";

export const CurrentStep = () => {
  const { stepNumber } = useStepContext();
  return (
    <div className="flex h-[450px] w-full flex-col items-center justify-between rounded-lg border border-white/15 px-2 py-4 shadow-md shadow-purple-600/30">
      {stepNumber === 1 && <UploadResume />}
      {stepNumber === 2 && <UploadJD />}
      {stepNumber === 3 && <Results />}
    </div>
  );
};
