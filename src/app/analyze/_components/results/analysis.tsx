import { GeminiAnalysisResponse } from "@/types/prompt";
import { Tooltip } from "./tooltip";

export const Analysis = ({ results }: { results: GeminiAnalysisResponse }) => {
  return (
    <>
      {/* Skills Gap */}
      <div>
        <h4 className="mb-1 font-medium text-white">Skills Gap</h4>
        <div className="flex flex-wrap gap-1">
          {results.skillsGap.slice(0, 6).map((skill: string, i: number) => (
            <span
              key={i}
              className="rounded border border-red-500/50 bg-red-500/20 px-1.5 py-0.5 text-xs text-red-300"
            >
              {skill}
            </span>
          ))}
          {results.skillsGap.length > 6 && (
            <Tooltip
              placement="right-start"
              arrowClassName="fill-gray-900"
              className="bg-gray-900"
              content={
                <div className="flex flex-wrap gap-1">
                  {results.skillsGap
                    .slice(0, 6)
                    .map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="rounded border border-red-500/50 bg-red-500/20 px-1.5 py-0.5 text-xs text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              }
            >
              <span className="rounded border border-transparent bg-white/10 px-1.5 py-0.5 text-xs text-white/60">
                +{results.skillsGap.length - 6} more
              </span>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Missing Keywords */}
      <div>
        <h4 className="my-1 font-medium text-white">Critical Keywords</h4>
        <div className="flex flex-wrap gap-1">
          {results.missingKeywords
            .slice(0, 8)
            .map((keyword: string, i: number) => (
              <span
                key={i}
                className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300"
              >
                {keyword}
              </span>
            ))}
          {results.missingKeywords.length > 8 && (
            <Tooltip
              placement="right-start"
              arrowClassName="fill-gray-900"
              className="bg-gray-900"
              content={
                <div className="flex flex-wrap gap-1">
                  {results.missingKeywords
                    .slice(8)
                    .map((keyword: string, i: number) => (
                      <span
                        key={i}
                        className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300"
                      >
                        {keyword}
                      </span>
                    ))}
                </div>
              }
            >
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/60">
                +{results.missingKeywords.length - 8}
              </span>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Strengths */}
      <div>
        <h4 className="my-1 font-medium text-green-300">Strengths</h4>
        <ul className="w-full list-[square] text-left text-xs text-white/80 md:text-sm">
          {results.strengths.map((strength: string, i: number) => (
            <li key={i} className="mb-1 ml-2 list-item">
              {strength}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
