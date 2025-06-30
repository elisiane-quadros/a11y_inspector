import type { ResultItem } from "./ResultItem";

export interface AccessibilityResults {
  images: ResultItem[];
  forms: ResultItem[];
  headings: string[];
  links: string[];
  buttons: ResultItem[];
  landmarks: string[];
  url: string;
}
