export interface Project {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Data Analytics' | 'Full-Stack';
  status: 'Completed' | 'In Progress' | 'Beta';
  coverImage: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  problem: string;
  goals: string[];
  solution: string;
  workflow: string[];
  architecture: string; // Describes technical flow / DB setup
  challenges: string;
  results: string;
  lessons: string;
  screenshots: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  achievement: string[];
  tags: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: { name: string; level: number; logo?: string }[];
}
