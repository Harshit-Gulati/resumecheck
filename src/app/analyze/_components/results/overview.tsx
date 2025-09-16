import { Doto } from "next/font/google";
import { motion } from "motion/react";
import { GeminiAnalysisResponse } from "@/types/prompt";

const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ScoreCircle = ({ score, label }: { score: number; label: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-16 w-16">
        <motion.svg
          className="h-16 w-16 -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={
              score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444"
            }
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: circumference * (1 - score / 100),
            }}
            initial={{ strokeDashoffset: circumference }}
            transition={{ duration: 1 }}
          />
        </motion.svg>
        <div
          className={`absolute inset-0 flex items-center justify-center text-xl font-[900] text-white ${doto.className}`}
        >
          {score}
        </div>
      </div>
      <span className="mt-1 text-center text-xs text-white/70 md:text-sm">
        {label}
      </span>
    </div>
  );
};

export const Overview = ({ results }: { results: GeminiAnalysisResponse }) => {
  return (
    <>
      {/* Score Dashboard */}
      <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-4">
        <ScoreCircle score={results.overallScore} label="Overall" />
        <ScoreCircle score={results.keywordMatch} label="Keywords" />
        <ScoreCircle score={results.atsCompatibility} label="ATS Ready" />
        <ScoreCircle score={results.experienceRelevance} label="Relevance" />
      </div>

      {/* Quick Stats */}
      <div className="my-1 grid grid-cols-1 gap-2 text-sm md:grid-cols-2 md:text-base">
        <div className="rounded-md bg-white/5 p-2">
          <div className="text-white/60">Skills Gap</div>
          <div className="font-semibold text-white">
            {results.skillsGap.length} areas
          </div>
        </div>
        <div className="rounded-md bg-white/5 p-2">
          <div className="text-white/60">Missing Keywords</div>
          <div className="font-semibold text-white">
            {results.missingKeywords.length} terms
          </div>
        </div>
      </div>

      {/* Top Strengths & Weaknesses */}
      <div className="mt-1 grid grid-cols-1 gap-4">
        <div>
          <h4 className="mb-1 font-medium text-green-300">Top Strengths</h4>
          <ul className="w-full list-disc text-left text-xs text-white/70 md:text-sm">
            {results.strengths
              .slice(0, 2)
              .map((strength: string, i: number) => (
                <li key={i} className="mb-1 ml-2 list-item">
                  {strength}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-1 font-medium text-red-300">Key Gaps</h4>
          <ul className="w-full list-disc text-left text-xs text-white/70 md:text-sm">
            {results.weaknesses
              .slice(0, 2)
              .map((weakness: string, i: number) => (
                <li key={i} className="mb-1 ml-2 list-item">
                  {weakness}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
