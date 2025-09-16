import { getGeminiAnalysis } from "@/lib/gemini";
import { fetchAndProcessPdf } from "@/lib/pdf";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { resumeUrl, jdUrl } = await request.json();

    if (!resumeUrl || !jdUrl)
      return Response.json(
        {
          success: false,
          error: "Both resume and job description URLs are required",
        },
        { status: 400 },
      );

    const cleanedResumeText = await fetchAndProcessPdf(resumeUrl, "resume");
    const cleanedJdText = await fetchAndProcessPdf(jdUrl, "job description");

    const analysisResults = await getGeminiAnalysis(
      cleanedResumeText,
      cleanedJdText,
    );

    return Response.json({
      success: true,
      data: analysisResults,
    });
  } catch (error) {
    console.error("Analysis failed:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 },
    );
  }
}
