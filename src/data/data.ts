interface TechStack {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  code?: string | null;
  live?: string | null;
}

export const TECH_STACK: TechStack[] = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 80 },
  { name: "React.js", level: 90 },
  { name: "Next", level: 80 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 90 },
  { name: "Django", level: 90 },
  { name: "FastAPI", level: 80 },
  { name: "REST", level: 90 },
  { name: "Git", level: 90 },
  { name: "SQL", level: 85 },
  { name: "Flutter", level: 75 },
];

export const PROJECTS: Project[] = [
  {
    title: "CoinIt Platform Landing Page",
    description:
      "Landing Page for the CoinIt Platform, designed for collectors to showcase, trade, and connect over rare items.",
    tech: ["Next.js", "React", "Typescript", "Supabase"],
    image: "showcase/coinit/4.png",
    live: "https://coinit-one.vercel.app/",
  },
  {
    title: "Gegraphic Information System for Sugarcane Industry",
    description:
      "GIS designed for help in the desetion making process in the Sugarcane Industry. Include real-time comunication and integration with legacy systemas.",
    tech: [
      "Vue.js",
      "Typescript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "Geoserver",
      "PostgresFDW",
    ],
    image: "/showcase/sig/sig.png",
    live: null,
  },
  {
    title: "Personal Trackers",
    description:
      "A desktop application for have organized all your personal data and integrate it with LLM.",
    tech: ["React.js", "Rust", "Typescript", "Tauri"],
    image: "/placeholder.svg",
    code: "https://github.com/joegsuero/personal-tracker",
    live: null,
  },
  {
    title: "Email Handler",
    description:
      "Platform for make it easy for enterpreneurs to manage their email list and newsletter.",
    tech: ["React", "Typescript", "Django", "Python"],
    image: "/showcase/email_handler/emails.png",
    code: "https://github.com/joegsuero/email_list_handler",

  },
];
