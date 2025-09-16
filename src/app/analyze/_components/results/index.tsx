import { useState } from "react";
import { useStepContext } from "../context/step-context";
import { Tabs, TabsSkeleton } from "./tabs";
import { TabKeys } from "@/types/tabs";
import { Overview } from "./overview";
import { Analysis } from "./analysis";
import { Actions } from "./actions";

export const Results = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>(TabKeys.overview);

  const { results, loading } = useStepContext();

  if (!results || loading) return <Skeleton />;

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className=":bg-gray-300 w-full flex-1 overflow-y-auto px-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-600/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700/80">
        {activeTab === TabKeys.overview && <Overview results={results} />}
        {activeTab === TabKeys.analysis && <Analysis results={results} />}
        {activeTab === TabKeys.actions && <Actions results={results} />}
      </div>
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <TabsSkeleton />
      <div className="px-2">
        <div className="mb-2 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          <div className="mx-auto h-20 w-20 animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-20 w-20 animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-20 w-20 animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-20 w-20 animate-pulse rounded bg-gray-900/80" />
        </div>
        <div className="mb-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mx-auto h-20 w-full animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-20 w-full animate-pulse rounded bg-gray-900/80" />
        </div>
        <div className="mb-2 grid w-full grid-cols-1 gap-2">
          <div className="mx-auto h-5 w-20 animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-5 w-full animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-5 w-full animate-pulse rounded bg-gray-900/80" />
        </div>
        <div className="mb-2 grid w-full grid-cols-1 gap-2">
          <div className="mx-auto h-5 w-20 animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-5 w-full animate-pulse rounded bg-gray-900/80" />
          <div className="mx-auto h-5 w-full animate-pulse rounded bg-gray-900/80" />
        </div>
      </div>
    </div>
  );
};
