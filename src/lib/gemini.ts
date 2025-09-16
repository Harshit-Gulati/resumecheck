import { GoogleGenAI, Type } from "@google/genai";
import { getPrompt } from "./prompt";
import { GeminiAnalysisResponse } from "@/types/prompt";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getGeminiAnalysis = async (
  resumeText: string,
  jobDescription: string,
): Promise<any> => {
  const prompt = getPrompt(resumeText, jobDescription);

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            overallScore: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            keywordMatch: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            skillsGap: {
              type: "array",
              items: { type: "string" },
            },
            improvementSuggestions: {
              type: "array",
              items: { type: "string" },
            },
            atsCompatibility: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            experienceRelevance: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            missingKeywords: {
              type: "array",
              items: { type: "string" },
            },
            strengths: {
              type: "array",
              items: { type: "string" },
            },
            weaknesses: {
              type: "array",
              items: { type: "string" },
            },
            recommendedChanges: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  section: { type: "string" },
                  suggestion: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                },
                required: ["section", "suggestion", "priority"],
              },
            },
          },
          required: [
            "overallScore",
            "keywordMatch",
            "skillsGap",
            "improvementSuggestions",
            "atsCompatibility",
            "experienceRelevance",
            "missingKeywords",
            "strengths",
            "weaknesses",
            "recommendedChanges",
          ],
        },
      },
      contents: prompt,
    });

    const analysisResult = response.text!;

    const parsed: GeminiAnalysisResponse = JSON.parse(analysisResult);

    return parsed;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(
      `Analysis failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};
