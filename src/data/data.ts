/**
 * Project metadata. All human-readable text (title, description, features,
 * role...) lives in the locale files under `projectsData.<id>`, so it can be
 * translated. `id` is also the URL slug: /projects/<id>.
 */
export interface Project {
  id: string;
  tech: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  code?: string;
  live?: string;
  /** "YYYY-MM". Omit when the project is still in progress. */
  completedDate?: string;
  inProgress?: boolean;
}

export const SOCIAL = {
  email: "joegsuero@gmail.com",
  github: "https://github.com/joegsuero",
  linkedin: "https://linkedin.com/in/joegsuero",
  medium: "https://medium.com/@joegsuero",
  mediumFeed: "https://medium.com/feed/@joegsuero",
};

/** Resume PDFs, served from /public/resume. */
export const RESUME_URL: Record<"en" | "es", string> = {
  en: "/resume/jose-garcia-suero-cv-en.pdf",
  es: "/resume/jose-garcia-suero-cv-es.pdf",
};

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools";

export type TechCategoryKey = keyof typeof TECH_CATEGORY_TRANSLATIONS;

export interface TechStack {
  name: string;
  years: number; // Años de experiencia
  category: TechCategory;
}

export const TECH_STACK: TechStack[] = [
  // FRONTEND
  { name: "JavaScript", years: 5, category: "Frontend" },
  { name: "TypeScript", years: 5, category: "Frontend" },
  { name: "React.js", years: 5, category: "Frontend" },
  { name: "Next.js", years: 3, category: "Frontend" },
  { name: "Tailwind CSS", years: 5, category: "Frontend" },
  { name: "Framer Motion", years: 2, category: "Frontend" },

  // BACKEND
  { name: "Node.js", years: 4, category: "Backend" },
  { name: "Python", years: 5, category: "Backend" },
  { name: "Django", years: 4, category: "Backend" },
  { name: "FastAPI", years: 3, category: "Backend" },

  // DATABASE
  { name: "SQL", years: 5, category: "Database" },
  { name: "PostgreSQL", years: 5, category: "Database" },
  { name: "PostgresFDW", years: 4, category: "Database" },
  { name: "MongoDB", years: 2, category: "Database" },
  { name: "Redis", years: 3, category: "Database" },

  // DEVOPS
  { name: "Docker", years: 3, category: "DevOps" },
  { name: "Git", years: 5, category: "DevOps" },
  { name: "GitHub Actions", years: 4, category: "DevOps" },
  { name: "Nginx", years: 5, category: "DevOps" },
  { name: "Linux", years: 5, category: "DevOps" },

  // TOOLS
  { name: "REST APIs", years: 5, category: "Tools" },
  { name: "GraphQL", years: 2, category: "Tools" },
  { name: "Vite", years: 5, category: "Tools" },
  { name: "Trello", years: 5, category: "Tools" },
  { name: "Slack", years: 5, category: "Tools" },
];

export const getTechByCategory = (category: TechCategory) => {
  return TECH_STACK.filter((tech) => tech.category === category);
};

export const TECH_CATEGORIES: TechCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

export const TECH_CATEGORY_TRANSLATIONS = {
  Frontend: "techCategories.Frontend",
  Backend: "techCategories.Backend",
  Database: "techCategories.Database",
  DevOps: "techCategories.DevOps",
  Tools: "techCategories.Tools",
};

export const PROJECTS: Project[] = [
  {
    id: "sugarcane-gis",
    tech: [
      "Vue.js",
      "Quasar",
      "Typescript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "Geoserver",
      "PostgresFDW",
    ],
    image: "/showcase/sig/sig.webp",
    imageWidth: 1600,
    imageHeight: 732,
    completedDate: "2023-12",
  },
  {
    id: "django-generator",
    tech: ["Next.js", "React", "Typescript", "Django", "Python"],
    image: "/showcase/django-generator/django-generator.webp",
    imageWidth: 1515,
    imageHeight: 699,
    live: "https://joegsuero.github.io/django-gen-editor/",
    code: "https://github.com/joegsuero/django-generator",
    inProgress: true,
  },
  {
    id: "django-erd-designer",
    tech: [
      "Next.js",
      "React",
      "Typescript",
      "Django",
      "Python",
      "Tailwind CSS",
    ],
    image: "/showcase/django-erd-designer/django-erd-designer.webp",
    imageWidth: 1524,
    imageHeight: 695,
    inProgress: true,
  },
  // Hidden for now. Uncomment to publish (texts already exist in the locale files).
  // {
  //   id: "terminal-playground",
  //   tech: ["React", "Typescript", "Vite"],
  //   image: "/showcase/terminal-playground/terminal-playground.webp",
  //   imageWidth: 1600,
  //   imageHeight: 739,
  //   live: "https://joegsuero.github.io/terminal-playground",
  //   code: "https://github.com/joegsuero/terminal-playground",
  //   inProgress: true,
  // },
  // {
  //   id: "coinit-platform-landing-page",
  //   tech: ["Next.js", "React", "Typescript", "Tailwind", "Supabase"],
  //   image: "/showcase/coinit/4.webp",
  //   imageWidth: 1600,
  //   imageHeight: 773,
  //   live: "https://coinit-one.vercel.app/",
  //   completedDate: "2024-01",
  // },
  // {
  //   id: "personal-tracker",
  //   tech: ["Rust", "Tauri", "React", "Typescript", "LLM"],
  //   image: "/showcase/tracker/tracker.webp",
  //   imageWidth: 1600,
  //   imageHeight: 850,
  //   code: "https://github.com/joegsuero/personal-tracker",
  //   inProgress: true,
  // },
  // {
  //   id: "email-handler",
  //   tech: ["React", "Typescript", "Django", "Python"],
  //   image: "/showcase/email_handler/emails.webp",
  //   imageWidth: 1600,
  //   imageHeight: 769,
  //   code: "https://github.com/joegsuero/email_list_handler",
  //   inProgress: true,
  // },
];
