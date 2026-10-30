// ─── Project Card ────────────────────────────────────────────────────────────
export interface ProjectCard {
  id: number;
  title: string;
  year: string;
  services: string[];
  client: string;
  image: string;
  category: string;
  color: string;
}

// ─── Service Item ────────────────────────────────────────────────────────────
export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

// ─── Team Member ─────────────────────────────────────────────────────────────
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
  };
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  logo: string;
  avatar: string;
  rating: number;
}

// ─── Stat Item ───────────────────────────────────────────────────────────────
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

// ─── Nav Link ────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Theme State ─────────────────────────────────────────────────────────────
export type ThemeMode = 'dark' | 'light';
