import { Doto } from "next/font/google";
import { motion } from "motion/react";
import { features } from "@/constants/features";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const FeaturesSection = () => {
  return (
    <section className="mt-20 flex items-center justify-center">
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
          Features
        </motion.h2>
        <div className="mx-4 my-5 grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              idx={index}
              heading={feature.title}
              subheading={feature.description}
              benefit={feature.benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  idx,
  heading,
  subheading,
  benefit,
}: {
  idx: number;
  heading: string;
  subheading: string;
  benefit: string;
}) => {
  return (
    <motion.div
      className="max-w-md rounded-lg border border-white/15 bg-black/5 px-2 py-4 backdrop-blur-[10px] backdrop-saturate-[180%]"
      viewport={{ once: true }}
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: idx * 0.1,
        ease: "easeInOut",
      }}
    >
      <h3 className={`${doto.className} mb-5 text-lg font-[800] md:text-xl`}>
        {heading}
      </h3>
      <p className="mx-2 mb-5 text-sm md:mx-4 md:text-base">{subheading}</p>
      <p className="mx-2 mb-2 text-xs text-white/80 md:mx-4 md:text-sm">
        {benefit}
      </p>
    </motion.div>
  );
};
