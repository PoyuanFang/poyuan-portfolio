export interface Project {
  _id: string;
  title: string;
  image: any; // Sanity image asset reference
  description: string; // Short description
  longDescription: string; // Long description
  link?: string; // General project link (URL)
  skills: string; // Comma-separated string of skills
  category: string;
  galleryImages?: any[]; // Array of Sanity image asset references
  techStack?: string[]; // Array of strings for tech stack
  liveUrl?: string; // Live site URL
  repoUrl?: string; // GitHub repo URL
  featured?: boolean; // New field for featured projects
}