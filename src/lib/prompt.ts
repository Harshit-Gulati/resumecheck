export const getPrompt = (resumeText: string, jobDescription: string) => {
  const prompt = `
  You are an expert resume analyzer and ATS (Applicant Tracking System) specialist. 
  Analyze the following resume against the job description and provide detailed feedback.
  
  RESUME:
  ${resumeText}
  
  JOB DESCRIPTION:
  ${jobDescription}
  
  Please analyze and provide a JSON response with the following structure:
  {
    "overallScore": <number 0-100>,
    "keywordMatch": <number 0-100>,
    "skillsGap": [<array of missing skills>],
    "improvementSuggestions": [<array of specific suggestions>],
    "atsCompatibility": <number 0-100>,
    "experienceRelevance": <number 0-100>,
    "missingKeywords": [<array of important keywords not found>],
    "strengths": [<array of resume strengths>],
    "weaknesses": [<array of resume weaknesses>],
    "recommendedChanges": [
      {
        "section": "<section name>",
        "suggestion": "<specific suggestion>",
        "priority": "<high/medium/low>"
        }
        ]
        }
        
        Scoring criteria:
        - Overall Score: Based on resume-job match, ATS compatibility, and presentation
        - Keyword Match: Percentage of job keywords found in resume
        - ATS Compatibility: How well the resume will perform in automated screening
        - Experience Relevance: How relevant the candidate's experience is to the role
        
        Provide actionable, specific suggestions. Focus on concrete improvements.
        `;
  return prompt;
};
