"use client";

import { StepContextProvider } from "../context/step-context";
import { Stepper } from "./stepper";
import { StepControls } from "./step-controls";
import { CurrentStep } from "./current-step";

export const Steps = () => {
  return (
    <StepContextProvider>
      <div className="flex w-full flex-col items-center justify-center px-4">
        <Stepper />
        <CurrentStep />
        <StepControls />
      </div>
    </StepContextProvider>
  );
};
