import TypewriterLogo from "@/components/TypewriterLogo";
import appState from "@/store/store";
import { EXPERIENCE, RESUME_URL } from "@/data/data";
import { currentLanguage, toggleLanguage } from "@/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useTranslation } from "react-i18next";

const SECTIONS = [
  "about",
  // The Experience link only appears once there is experience data
  ...(EXPERIENCE.length > 0 ? ["experience"] : []),
  "projects",
  "tech",
  "blog",
  "contact",
];

const Navbar = () => {
  const { t } = useTranslation();
  const { activeSection } = useSnapshot(appState);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const resumeUrl = RESUME_URL[currentLanguage()];

  // Close the mobile menu on route change and with Escape
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigateToSection = (item: string) => {
    setMenuOpen(false);
    if (isHomePage) {
      // Next frame: the menu has closed and body scroll is unlocked again
      requestAnimationFrame(() =>
        document.getElementById(item)?.scrollIntoView({ behavior: "smooth" }),
      );
    } else {
      navigate("/", { state: { scrollTo: item } });
    }
  };

  const languageButton = (extra = "") => (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("navbar.switchLanguage")}
      title={t("navbar.switchLanguage")}
      className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-blue-500/30 hover:text-white ${extra}`}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {t("navbar.otherLanguage")}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/5 md:px-36">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          <TypewriterLogo />
        </div>

        {/* Desktop */}
        <ul className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {SECTIONS.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => navigateToSection(item)}
                aria-current={isHomePage && activeSection === item ? "true" : undefined}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isHomePage && activeSection === item
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t(`navbar.${item}`)}
              </button>
            </li>
          ))}
          <li>{languageButton()}</li>
          <li>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm font-bold text-blue-400 hover:bg-blue-500 hover:text-slate-950 transition-colors"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {t("navbar.resume")}
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-slate-950/95"
          >
            <ul className="container mx-auto px-6 py-4 flex flex-col">
              {SECTIONS.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => navigateToSection(item)}
                    className={`w-full text-left py-3 text-lg font-semibold transition-colors ${
                      isHomePage && activeSection === item
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {t(`navbar.${item}`)}
                  </button>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {t("navbar.resume")}
                </a>
                {languageButton("px-4")}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
