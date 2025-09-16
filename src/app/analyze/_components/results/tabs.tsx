import { TabKeys, TabType } from "@/types/tabs";
import { motion } from "motion/react";

const tabs: TabType[] = [
  { key: TabKeys.overview, label: "Overview" },
  { key: TabKeys.analysis, label: "Analysis" },
  { key: TabKeys.actions, label: "Actions" },
];

export const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKeys;
  setActiveTab: React.Dispatch<React.SetStateAction<TabKeys>>;
}) => {
  return (
    <div className="mb-2 flex w-full border-b border-white/10">
      {tabs.map(({ key, label }: TabType) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`relative flex-1 px-4 pb-2 text-sm font-medium transition-colors duration-[650] md:text-base ${
            activeTab === key
              ? "text-purple-600"
              : "text-white/60 hover:text-white/80"
          }`}
        >
          {activeTab === key && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 border-b-2 border-purple-600"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  );
};

export const TabsSkeleton = () => {
  return (
    <div className="mb-2 flex h-7 w-full items-center justify-between">
      <div className="mr-2 h-6 w-1/3 animate-pulse rounded bg-gray-900/80" />
      <div className="mr-2 h-6 w-1/3 animate-pulse rounded bg-gray-900/80" />
      <div className="h-6 w-1/3 animate-pulse rounded bg-gray-900/80" />
    </div>
  );
};
