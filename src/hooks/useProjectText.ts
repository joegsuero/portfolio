import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/data";

export interface ProjectText {
  title: string;
  description: string;
  longDescription?: string;
  challenges?: string;
  /** Case study: what was wrong before the project. */
  problem?: string;
  /** Case study: key decisions, one per item. */
  approach: string[];
  /** Case study: measurable result. */
  outcome?: string;
  features: string[];
  role: string;
}

/** Returns a function that resolves the translated texts of a project. */
export const useProjectText = () => {
  const { t, i18n } = useTranslation();

  return useCallback(
    (project: Project): ProjectText => {
      const base = `projectsData.${project.id}`;
      const optional = (field: string) =>
        i18n.exists(`${base}.${field}`) ? t(`${base}.${field}`) : undefined;
      const list = (field: string) => {
        if (!i18n.exists(`${base}.${field}`)) return [];
        const value = t(`${base}.${field}`, { returnObjects: true });
        return Array.isArray(value) ? (value as string[]) : [];
      };

      return {
        title: t(`${base}.title`),
        description: t(`${base}.description`),
        longDescription: optional("longDescription"),
        challenges: optional("challenges"),
        problem: optional("problem"),
        approach: list("approach"),
        outcome: optional("outcome"),
        features: list("features"),
        role: t(`${base}.role`),
      };
    },
    // Re-create when the language changes so consumers re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.resolvedLanguage],
  );
};

/** "2023-12" -> "December 2023" / "diciembre de 2023" */
export const formatMonth = (yearMonth: string, language: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  const label = new Date(year, month - 1).toLocaleDateString(language, {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
};
