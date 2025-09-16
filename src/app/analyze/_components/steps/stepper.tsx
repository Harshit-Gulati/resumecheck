import { motion } from "motion/react";
import { useStepContext } from "../context/step-context";
import { Doto } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Stepper = () => {
  const { stepNumber } = useStepContext();

  return (
    <div className="mb-5 flex w-full items-center justify-center">
      <motion.div
        className="h-[2px] w-[calc(50%_-_80px)] bg-gradient-to-l from-purple-600 to-transparent"
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{
          opacity: stepNumber === 1 ? 0 : 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
      <motion.div
        className={`flex size-10 items-center justify-center rounded-full bg-purple-600 text-xl font-semibold ${doto.className} shadow-md shadow-white/30`}
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
      >
        {stepNumber}
      </motion.div>
      <motion.div
        className="h-[2px] w-[calc(50%_-_80px)] bg-gradient-to-r from-purple-600 to-transparent"
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        animate={{
          opacity: stepNumber === 3 ? 0 : 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
    </div>
  );
};
