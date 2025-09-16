export interface PDFInfo {
  PDFFormatVersion?: string;
  IsAcroFormPresent?: boolean;
  IsXFAPresent?: boolean;
  [key: string]: any;
}

export interface PDFParseResult {
  success: boolean;
  text?: string;
  pages?: number;
  info?: PDFInfo;
  metadata?: any;
  wordCount?: number;
  characterCount?: number;
  error?: string;
}
