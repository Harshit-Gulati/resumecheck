import { steps } from "@/constants/works";
import { motion } from "motion/react";
import { Doto } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const WorksSection = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto flex h-full max-w-2xl flex-col items-center text-center">
        <motion.h2
          viewport={{ once: true }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`${doto.className} mx-6 mt-10 mb-8 rounded-lg px-2 text-xl font-[900] backdrop-blur-[10px] backdrop-saturate-[180%] md:text-3xl`}
        >
          How It Works
        </motion.h2>
        <div className="mx-8 mt-5">
          {steps.map((step) => (
            <StepCard key={step.step} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
}: {
  step: {
    step: number;
    title: string;
    description: string;
    detail: string;
  };
}) => {
  return (
    <>
      <motion.div
        className="relative max-w-md rounded-r-lg border border-l-2 border-purple-600 border-y-white/15 border-r-white/15 bg-black/5 px-4 py-2 backdrop-blur-[10px] backdrop-saturate-[180%]"
        viewport={{ once: true }}
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.3,
          delay: step.step * 0.1,
          ease: "easeInOut",
        }}
      >
        <span
          className={`${doto.className} absolute top-0 left-0 -mx-5 -my-5 flex size-10 items-center justify-center rounded-full bg-purple-600 p-4 text-xl font-bold`}
        >
          {step.step}
        </span>
        <h3 className={`${doto.className} mb-5 text-lg font-[800] md:text-xl`}>
          {step.title}
        </h3>
        <p className="mx-2 mb-5 text-sm md:mx-4 md:text-base">
          {step.description}
        </p>
        <p className="mx-2 mb-2 text-xs text-white/80 md:mx-4 md:text-sm">
          {step.detail}
        </p>
      </motion.div>
      {step.step !== 3 && (
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: step.step * 0.1,
            ease: "easeInOut",
          }}
          className="h-10 border-l-2 border-purple-600"
        />
      )}
    </>
  );
};
