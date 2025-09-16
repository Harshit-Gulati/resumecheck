import { PDFInfo, PDFParseResult } from "@/types/pdf";
import pdfParse from "pdf-parse";

export const parseFromBuffer = async (
  arrayBuffer: ArrayBuffer,
): Promise<PDFParseResult> => {
  try {
    const pdfBuffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(pdfBuffer);

    return {
      success: true,
      text: data.text,
      pages: data.numpages,
      info: data.info as PDFInfo,
      metadata: data.metadata,
      wordCount: data.text.split(/\s+/).filter((word) => word.length > 0)
        .length,
      characterCount: data.text.length,
    };
  } catch (error) {
    return {
      success: false,
      error: `PDF parsing failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const getCleanedText = (rawText: string): string => {
  const text = cleanRawText(rawText);

  const cleanedText = removeContactInfo(text);

  return cleanedText;
};

export const cleanRawText = (rawText: string): string => {
  return rawText
    .replace(/\s+/g, " ") // Multiple spaces to single space
    .replace(/\n\s*\n/g, "\n") // Multiple newlines to single
    .replace(/[^\x20-\x7E\n]/g, "") // Remove non-printable characters
    .trim(); // Remove leading/trailing whitespace
};

export const removeContactInfo = (text: string): string => {
  return (
    text
      // Remove phone numbers (various formats)
      .replace(
        /(\+?1?[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g,
        "[PHONE_REMOVED]",
      )
      // Remove email addresses
      .replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[EMAIL_REMOVED]",
      )
      // Remove street addresses (basic pattern)
      .replace(
        /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Way|Ct|Court|Place|Pl)\b/gi,
        "[ADDRESS_REMOVED]",
      )
      // Remove zip codes
      .replace(/\b\d{5}(?:-\d{4})?\b/g, "[ZIP_REMOVED]")
      // Remove URLs
      .replace(/https?:\/\/[^\s]+/g, "[URL_REMOVED]")
      // Remove LinkedIn profiles
      .replace(/linkedin\.com\/[^\s]+/gi, "[LINKEDIN_REMOVED]")
      // Clean up multiple spaces and newlines left after removals
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n")
      .trim()
  );
};

export const isValidPDF = (arrayBuffer: ArrayBuffer): boolean => {
  if (!arrayBuffer || arrayBuffer.byteLength < 4) return false;
  const buffer = Buffer.from(arrayBuffer);
  const pdfHeader = buffer.subarray(0, 4).toString();
  return pdfHeader === "%PDF";
};

export const fetchAndProcessPdf = async (
  url: string,
  typeName: string,
): Promise<string> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to download ${typeName} file: ${response.status} ${response.statusText}`,
      );
    }

    const buffer = await response.arrayBuffer();

    if (!isValidPDF(buffer)) throw new Error(`Invalid ${typeName} PDF format`);

    const parseResult = await parseFromBuffer(buffer);

    if (!parseResult.success || !parseResult.text)
      throw new Error(parseResult.error || `Failed to parse ${typeName} PDF`);

    return getCleanedText(parseResult.text);
  } catch (error) {
    console.error(`Error processing ${typeName}:`, error);
    throw error;
  }
};
