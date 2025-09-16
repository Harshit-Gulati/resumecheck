"use client";

import { BackgroundEffect } from "@/components/background-effect";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { MainSection } from "@/components/main-section";
import { WorksSection } from "@/components/works-sections";
import { useScroll } from "motion/react";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div className="relative" ref={ref}>
      <BackgroundEffect scrollYProgress={scrollYProgress} />
      {/* Scrolling content */}
      <div className="relative z-10">
        <MainSection scrollYProgress={scrollYProgress} />
        <WorksSection />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}
