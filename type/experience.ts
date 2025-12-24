import type { PortableTextBlock } from "sanity";

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: PortableTextBlock[];
}