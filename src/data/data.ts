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
    title: "Personal Trackers",
    description:
      "A desktop application for have organized all your personal data and integrate it with LLM.",
    tech: ["React.js", "Rust", "Typescript", "Tauri"],
    image: "/placeholder.svg",
    code: "https://github.com/joegsuero/personal-tracker",
    live: null,
  },
  {
    title: "Personal development website",
    description:
      "A website for a personal development project for share insights and knowledge about mental strength.",
    tech: ["React.js", "Typescript", "Vite.js"],
    image: "/placeholder.svg",
    live: null,
    // live: "https://guiasmentales.netlify.app/",
  },
  {
    title: "API Gateway",
    description:
      "Microservice architecture with API gateway for efficient service communication and load balancing.",
    tech: ["Go", "Docker", "Kubernetes"],
    image: "/placeholder.svg",
  },
  {
    title: "Mobile Companion",
    description:
      "Cross-platform mobile application with offline capabilities and seamless cloud synchronization.",
    tech: ["React Native", "GraphQL", "AWS"],
    image: "/placeholder.svg",
  },
];
