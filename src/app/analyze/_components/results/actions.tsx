import { GeminiAnalysisResponse, Priority } from "@/types/prompt";

const getPriority = (a: Priority) => {
  switch (a) {
    case "high":
      return 0;
    case "medium":
      return 1;
    case "low":
      return 2;
  }
};

export const Actions = ({ results }: { results: GeminiAnalysisResponse }) => {
  return (
    <>
      {/* High Priority Changes */}
      <div>
        <h4 className="mb-1 font-medium text-white">Recommended Changes</h4>
        {results.recommendedChanges
          .sort((a, b) => getPriority(a.priority) - getPriority(b.priority))
          .map((change, i) => (
            <div key={i} className="mb-2 rounded-lg bg-white/5 p-2">
              <div className="mb-1 flex items-center justify-between text-xs md:text-sm">
                <span className="font-medium text-white">{change.section}</span>
                <PriorityBadge priority={change.priority} />
              </div>
              <p className="text-left text-xs text-white/80 md:text-sm">
                {change.suggestion}
              </p>
            </div>
          ))}
      </div>

      {/* Quick Improvements */}
      <div>
        <h4 className="mb-1 font-medium text-blue-300">Quick Suggestions</h4>
        <ul className="list-disc text-xs text-white/70 md:text-sm">
          {results.improvementSuggestions.slice(0, 3).map((suggestion, i) => (
            <li key={i} className="mb-1 ml-2 list-item text-left">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const colors: Record<Priority, string> = {
    high: "bg-red-500/20 text-red-300 border-red-500/50",
    medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
    low: "bg-blue-500/20 text-blue-300 border-blue-500/50",
  };

  return (
    <span className={`rounded border px-1.5 py-0.5 ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};
