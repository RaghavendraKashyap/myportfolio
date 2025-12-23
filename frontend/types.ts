export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  logoUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Cloud' | 'DevOps' | 'Languages' | 'Tools';
  icon?: string; // Icon name from Lucide
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string; // For a logo or badge
  credentialUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}