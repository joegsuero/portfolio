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
  /** Live product in production (still evolving, so no completedDate). */
  inProduction?: boolean;
  /** Shown first and highlighted on the home page. */
  featured?: boolean;
  /** Extra screenshots for the case study page. */
  gallery?: { src: string; width: number; height: number }[];
  /** Short demo clip (mp4/webm in /public) for the case study page. */
  video?: string;
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
  | "Mobile"
  | "Backend"
  | "Database"
  | "DevOps";

export type TechCategoryKey = keyof typeof TECH_CATEGORY_TRANSLATIONS;

export interface TechStack {
  name: string;
  /** Years of hands-on experience. Omit to show the tech without a badge. */
  years?: number;
  category: TechCategory;
}

/** Total professional experience, used in the hero stats. */
export const YEARS_OF_EXPERIENCE = 5;

export const TECH_STACK: TechStack[] = [
  // FRONTEND
  { name: "TypeScript", years: 5, category: "Frontend" },
  { name: "JavaScript", years: 5, category: "Frontend" },
  { name: "React.js", years: 5, category: "Frontend" },
  { name: "Next.js", years: 3, category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Quasar", category: "Frontend" },
  { name: "Tailwind CSS", years: 5, category: "Frontend" },
  { name: "Framer Motion", years: 2, category: "Frontend" },

  // MOBILE
  { name: "Flutter", years: 4, category: "Mobile" },
  { name: "Dart", years: 4, category: "Mobile" },

  // BACKEND
  { name: "Python", years: 5, category: "Backend" },
  { name: "Django", years: 4, category: "Backend" },
  { name: "FastAPI", years: 3, category: "Backend" },
  { name: "Node.js", years: 4, category: "Backend" },
  { name: "REST APIs", years: 5, category: "Backend" },
  { name: "GraphQL", years: 2, category: "Backend" },
  { name: "SQLAlchemy", years: 1, category: "Backend" },
  { name: "WebSockets", years: 3, category: "Backend" },
  { name: "Stripe", years: 1, category: "Backend" },
  { name: "GeoServer", category: "Backend" },

  // DATABASE
  { name: "PostgreSQL", years: 5, category: "Database" },
  { name: "PostGIS", category: "Database" },
  { name: "PostgresFDW", years: 4, category: "Database" },
  { name: "SQL", years: 5, category: "Database" },
  { name: "Redis", years: 3, category: "Database" },
  { name: "MySQL", years: 4, category: "Database" },
  { name: "MongoDB", years: 2, category: "Database" },

  // DEVOPS
  { name: "Google Cloud", years: 1, category: "DevOps" },
  { name: "Docker", years: 3, category: "DevOps" },
  { name: "Linux", years: 5, category: "DevOps" },
  { name: "Nginx", years: 5, category: "DevOps" },
  { name: "Git", years: 5, category: "DevOps" },
  { name: "GitHub Actions", years: 4, category: "DevOps" },
  { name: "Vite", years: 5, category: "DevOps" },
];

export const getTechByCategory = (category: TechCategory) => {
  return TECH_STACK.filter((tech) => tech.category === category);
};

export const TECH_CATEGORIES: TechCategory[] = [
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "DevOps",
];

export const TECH_CATEGORY_TRANSLATIONS = {
  Frontend: "techCategories.Frontend",
  Mobile: "techCategories.Mobile",
  Backend: "techCategories.Backend",
  Database: "techCategories.Database",
  DevOps: "techCategories.DevOps",
};

/**
 * Work experience. Role, location and highlights are translated in the
 * locale files under `experienceData.<id>`. The Experience section (and its
 * navbar link) stays hidden while this list is empty.
 *
 * Example:
 * {
 *   id: "acme",                       // key in experienceData
 *   company: "Acme Corp",
 *   url: "https://acme.com",
 *   start: "2022-03",                 // YYYY-MM
 *   end: undefined,                   // omit while it's your current job
 *   tech: ["Django", "React", "PostgreSQL"],
 * }
 * and in en.json / es.json:
 * "experienceData": { "acme": {
 *   "role": "Full Stack Developer",
 *   "location": "Remote",
 *   "highlights": ["Cut API latency 40% by ...", "Led ..."]
 * } }
 */
export interface Experience {
  id: string;
  company: string;
  url?: string;
  start: string;
  end?: string;
  tech: string[];
}

/** Ordered by relevance: current roles first, then by end date. */
export const EXPERIENCE: Experience[] = [
  {
    id: "gmeti",
    company: "GMETI",
    start: "2021-10",
    tech: ["Python", "FastAPI", "Flutter", "Google Cloud", "Stripe", "Next.js", "Django"],
  },
  {
    id: "datazucar",
    company: "Datazucar",
    start: "2024-02",
    tech: ["Django", "FastAPI", "React", "PostGIS", "GeoServer", "Nginx"],
  },
  {
    id: "magizone",
    company: "Magizone",
    start: "2025-02",
    end: "2025-05",
    tech: ["Next.js", "Django", "PayPal"],
  },
  {
    id: "alsoftpro",
    company: "ALSOFTPRO",
    start: "2022-08",
    end: "2025-03",
    tech: ["Django", "Django REST Framework", "React", "TypeScript", "PostgreSQL"],
  },
  {
    id: "datazucar-intern",
    company: "Datazucar",
    start: "2022-03",
    end: "2023-12",
    tech: ["Flutter", "FastAPI", "PostGIS", "GeoServer", "Vue.js"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "hivecare",
    tech: [
      "Flutter",
      "Dart",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "WebSockets",
      "WebRTC",
      "Google Cloud",
      "Stripe",
      "GitHub Actions",
    ],
    image: "/showcase/hivecare/hivecare.webp",
    imageWidth: 1600,
    imageHeight: 800,
    live: "https://web.hivecareapp.com",
    inProduction: true,
    featured: true,
    gallery: [
      { src: "/showcase/hivecare/tablet.webp", width: 1600, height: 900 },
      { src: "/showcase/hivecare/signup.webp", width: 1440, height: 1024 },
      { src: "/showcase/hivecare/payment.webp", width: 1440, height: 1024 },
    ],
  },
  {
    id: "vizion",
    tech: ["Next.js", "React", "Typescript", "PostgreSQL", "Drizzle", "MCP", "Playwright"],
    image: "/showcase/vizion/vizion.webp",
    imageWidth: 1528,
    imageHeight: 784,
    inProgress: true,
    featured: true,
    gallery: [
      { src: "/showcase/vizion/editor.webp", width: 1528, height: 784 },
      { src: "/showcase/vizion/sql.webp", width: 1528, height: 784 },
      { src: "/showcase/vizion/templates.webp", width: 1600, height: 900 },
    ],
  },
  {
    id: "sugarcane-gis",
    tech: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "PostgresFDW",
      "Geoserver",
      "WebSockets",
      "Vue.js",
      "Quasar",
    ],
    image: "/showcase/sig/sig.webp",
    imageWidth: 1600,
    imageHeight: 732,
    completedDate: "2023-12",
    featured: true,
    gallery: [{ src: "/showcase/sig/deployment.webp", width: 968, height: 677 }],
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
  {
    id: "terminal-playground",
    tech: ["React", "Typescript", "Vite"],
    image: "/showcase/terminal-playground/terminal-playground.webp",
    imageWidth: 1600,
    imageHeight: 739,
    live: "https://joegsuero.github.io/terminal-playground",
    code: "https://github.com/joegsuero/terminal-playground",
    inProgress: true,
  },
  // Hidden for now. Uncomment to publish (texts already exist in the locale files).
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
