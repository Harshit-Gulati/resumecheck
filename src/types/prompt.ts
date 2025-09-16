export type Priority = "high" | "medium" | "low";

interface RecommendedChange {
  section: string;
  suggestion: string;
  priority: Priority;
}

export interface GeminiAnalysisResponse {
  overallScore: number;
  keywordMatch: number;
  skillsGap: string[];
  improvementSuggestions: string[];
  atsCompatibility: number;
  experienceRelevance: number;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  recommendedChanges: RecommendedChange[];
}
