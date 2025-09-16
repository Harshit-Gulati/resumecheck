import { motion } from "motion/react";
import { Doto } from "next/font/google";
import { useStepContext } from "../context/step-context";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const StepControls = () => {
  const { stepNumber, handlePrev, handleNext } = useStepContext();

  return (
    <div
      className={`mt-5 flex w-full items-center justify-between font-[900] ${doto.className}`}
    >
      <motion.button
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{
          opacity: stepNumber === 1 ? 0 : 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onClick={handlePrev}
      >
        Prev
      </motion.button>
      <motion.button
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{
          opacity: stepNumber === 3 ? 0 : 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onClick={handleNext}
      >
        {stepNumber === 1 && "Next"}
        {stepNumber === 2 && "Get Results"}
      </motion.button>
    </div>
  );
};
