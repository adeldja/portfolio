export interface FeaturedProject {
  id: string;
  name: string;
  period: string;
  role: string;
  context: string;
  approach: string;
  result: string;
  stack: string[];
  linkHref: string | null;
  linkLabel: string;
}

export interface ExperienceEntry {
  date: string;
  role: string;
  org: string;
}

export interface OtherProject {
  name: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface RecommendationItem {
  label: string;
  imageAlt: string;
  downloadLabel: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}
