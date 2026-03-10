// interface TechStack {
//   name: string;
//   level: number;
// }

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  challenges?: string;
  tech: string[];
  features: string[];
  image: string;
  code?: string | null;
  live?: string | null;
  completedDate?: string;
  role: string;
}

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools";

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
  { name: "PostgreFDW", years: 4, category: "Database" },
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

export const PROJECTS: Project[] = [
  // {
  //   title: "Terminal Playground",
  //   description: "Interactive browser-based terminal simulator.",
  //   longDescription:
  //     "Learn core technology CLI commands without local setup via guided lessons. This project was designed to help beginners get comfortable with terminal commands in a safe, interactive environment.",
  //   challenges:
  //     "Creating a realistic terminal emulation in the browser required careful handling of user input and command parsing. I solved this by implementing a custom command interpreter with React hooks for state management.",
  //   tech: ["React", "Typescript", "Vite"],
  //   features: [
  //     "Interactive terminal emulator",
  //     "Guided lessons for beginners",
  //     "Command history",
  //     "Responsive design works on all devices",
  //   ],
  //   image: "showcase/terminal-playground/terminal-playground.png",
  //   live: "https://joegsuero.github.io/terminal-playground",
  //   completedDate: "Work in progress",
  //   role: "Full Stack Developer",
  //   code: "https://github.com/joegsuero/terminal-playground",
  // },
  {
    title: "Geographic Information System for Sugarcane Industry",
    description:
      "GIS designed for help in the decision making process in the Sugarcane Industry.",
    longDescription:
      "This comprehensive GIS system includes real-time communication and integration with legacy systems. It provides spatial analysis tools specifically tailored for the sugarcane industry, helping optimize planting, harvesting and logistics.",
    challenges:
      "Integrating with multiple legacy systems required developing custom middleware. The biggest challenge was ensuring real-time data synchronization across all components while maintaining performance.",
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
    features: [
      "Real-time data visualization",
      "Integration with legacy systems",
      "Custom spatial analysis tools",
      "Role-based access control",
    ],
    image: "/showcase/sig/sig.png",
    live: null,
    completedDate: "December 2023",
    role: "Lead Developer",
  },
  {
    title: "Django Generator",
    description: "Automatically generate Django applications from YAML config.",
    longDescription:
      "This package allows you to automatically generate Django applications and models from a YAML configuration file, streamlining your development process by defining your data structure declaratively.",
    challenges:
      "Parsing complex YAML structures and generating valid Django code required careful validation and error handling. I implemented a multi-phase validation system to ensure generated code would work correctly and a custom IDE browser using Monaco Editor.",
    tech: ["Next.js", "React", "Typescript", "Django", "Python"],
    features: [
      "YAML to Django model conversion",
      "Support for complex relationships",
      "Customizable templates",
      "Validation and error reporting",
    ],
    image: "showcase/django-generator/django-generator.png",
    live: "https://joegsuero.github.io/django-gen-editor/",
    role: "Full Stack Developer",
    code: "https://github.com/joegsuero/django-generator",
    completedDate: "Work in progress",
  },
  {
    title: "Django ERD Designer",
    description: "Visual ERD designer for Django applications.",
    longDescription:
      "A web-based tool that allows developers to design Entity-Relationship Diagrams (ERD) visually and automatically generate complete Django applications from them. The tool connects with django-generator to transform the visual diagram into fully functional Django models, migrations, and admin configurations. It supports all Django model field types, relationships, and common model patterns.",
    challenges:
      "The main challenge was creating an intuitive interface for complex model relationships while ensuring the generated code follows Django best practices. I implemented a custom drag-and-drop interface with real-time validation and used a two-way conversion system between the visual diagram and the underlying data structure.",
    tech: [
      "Next.js",
      "React",
      "Typescript",
      "Django",
      "Python",
      "Tailwind CSS",
    ],
    features: [
      "Interactive ERD diagram builder with drag-and-drop interface",
      "Support for all Django field types and relationships",
      "Real-time code preview as you design",
      "Export to full Django application via django-generator",
      "Import existing Django models to visualize",
      "Customizable templates for common patterns",
      "Collaborative editing capabilities",
    ],
    image: "/showcase/django-erd-designer/django-erd-designer.png",
    completedDate: "Work in progress",
    role: "Full Stack Developer",
  },
  // {
  //   title: "CoinIt Platform Landing Page",
  //   description: "Landing Page for the CoinIt Platform.",
  //   longDescription:
  //     "Designed for collectors to showcase, trade, and connect over rare items. The landing page highlights key features of the platform with interactive demos and clear call-to-action sections to drive conversions.",
  //   challenges:
  //     "Creating performant animations that work across all devices while maintaining SEO best practices required careful optimization. I implemented lazy loading and progressive enhancement strategies.",
  //   tech: ["Next.js", "React", "Typescript", "Tailwind", "Supabase"],
  //   features: [
  //     "Performance-optimized animations",
  //     "SEO-optimized content structure",
  //     "Mobile-first responsive design",
  //   ],
  //   image: "showcase/coinit/4.png",
  //   live: "https://coinit-one.vercel.app/",
  //   completedDate: "January 2024",
  //   role: "Frontend Developer",
  // },
  // {
  //   title: "Personal Tracker",
  //   description: "Organize and keep the control of your data.",
  //   longDescription:
  //     "Comprehensive personal organization tool for lets you chat with your data using LLM technology. Track habits, expenses, notes and more in a unified interface with powerful search and analysis capabilities.",
  //   tech: ["Rust", "Tauri", "React", "Typescript", "LLM"],
  //   features: [
  //     "Natural language data interaction",
  //     "Cross-platform desktop app",
  //     "Local-first data storage",
  //     "Customizable tracking modules",
  //   ],
  //   image: "/showcase/tracker/tracker.png",
  //   code: "https://github.com/joegsuero/personal-tracker",
  //   role: "Full Stack Developer",
  //   completedDate: "Work in progress",
  // },
  // {
  //   title: "Email Handler",
  //   description: "Platform for managing email lists and newsletters.",
  //   longDescription:
  //     "Comprehensive solution for entrepreneurs to manage their email marketing campaigns. Includes list segmentation, analytics, and template management with a focus on ease of use and deliverability.",
  //   challenges:
  //     "Ensuring high deliverability required implementing proper email validation, bounce handling, and engagement tracking. I integrated with multiple ESP APIs to provide the best results.",
  //   tech: ["React", "Typescript", "Django", "Python"],
  //   features: [
  //     "Drag-and-drop email builder",
  //     "List segmentation",
  //     "Campaign analytics",
  //     "A/B testing",
  //   ],
  //   image: "/showcase/email_handler/emails.png",
  //   code: "https://github.com/joegsuero/email_list_handler",
  //   role: "Full Stack Developer",
  //   completedDate: "Work in progress",
  // },
];
