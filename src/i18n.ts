import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./i18n/locales/en.json";
import es from "./i18n/locales/es.json";

export const SUPPORTED_LANGUAGES = ["en", "es"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    // "es-ES" / "en-US" collapse to "es" / "en"
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
};
syncHtmlLang(i18n.resolvedLanguage ?? "en");
i18n.on("languageChanged", syncHtmlLang);

/** Current UI language, always "en" or "es". */
export const currentLanguage = (): Language =>
  i18n.resolvedLanguage === "es" ? "es" : "en";

export const toggleLanguage = () =>
  i18n.changeLanguage(currentLanguage() === "en" ? "es" : "en");

export default i18n;
