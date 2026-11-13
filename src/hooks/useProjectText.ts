import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/data";

export interface ProjectText {
  title: string;
  description: string;
  longDescription?: string;
  challenges?: string;
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
      const features = t(`${base}.features`, { returnObjects: true });

      return {
        title: t(`${base}.title`),
        description: t(`${base}.description`),
        longDescription: optional("longDescription"),
        challenges: optional("challenges"),
        features: Array.isArray(features) ? (features as string[]) : [],
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
