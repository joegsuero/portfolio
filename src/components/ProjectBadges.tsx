import { CheckCircle2, CircleDashed, Github, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/data";

/** Status chips shown over a project's cover image. */
export default function ProjectBadges({ project }: { project: Project }) {
  const { t } = useTranslation();

  const badges = [
    project.featured && {
      key: "featured",
      icon: Star,
      label: t("projects.featured"),
      className: "text-amber-300 border-amber-400/40",
    },
    project.inProgress && {
      key: "progress",
      icon: CircleDashed,
      label: t("projects.statusInProgress"),
      className: "text-sky-300 border-sky-400/40",
    },
    project.completedDate && {
      key: "completed",
      icon: CheckCircle2,
      label: t("projects.statusCompleted"),
      className: "text-emerald-300 border-emerald-400/40",
    },
    project.code && {
      key: "oss",
      icon: Github,
      label: t("projects.statusOpenSource"),
      className: "text-gray-200 border-white/25",
    },
  ].filter(Boolean) as {
    key: string;
    icon: typeof Star;
    label: string;
    className: string;
  }[];

  if (badges.length === 0) return null;

  return (
    <ul className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
      {badges.map(({ key, icon: Icon, label, className }) => (
        <li
          key={key}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold bg-slate-950/85 backdrop-blur-md shadow-lg ${className}`}
        >
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
