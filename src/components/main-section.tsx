import { Doto } from "next/font/google";
import { SeeMore } from "./see-more";
import { MotionValue, motion, useTransform } from "motion/react";
import Link from "next/link";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const MainSection = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="relative mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center">
        <Link
          href="/"
          className={`absolute top-5 text-lg font-[900] md:text-2xl ${doto.className}`}
        >
          <motion.span
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
          >
            ResumeCheck
          </motion.span>
        </Link>
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeInOut",
          }}
          className={`${doto.className} mx-6 text-2xl font-[900] md:text-5xl`}
        >
          Transform Your Resume with AI-Powered Analysis
        </motion.h1>
        <motion.p
          className="m-8 text-lg"
          viewport={{ once: true }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: "easeInOut",
          }}
        >
          Get personalized feedback, match scores, and improvement suggestions
          in seconds
        </motion.p>
        <motion.span
          className={`mt-5 rounded-lg bg-purple-600 px-6 py-2 text-base font-[800] text-white transition-all hover:bg-purple-700 md:text-xl ${doto.className} hover:scale-[1.05]`}
          viewport={{ once: true }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          <Link href="/analyze">Analyze My Resume</Link>
        </motion.span>
        <SeeMore label="See How It Works" opacity={opacity} />
      </div>
    </section>
  );
};
