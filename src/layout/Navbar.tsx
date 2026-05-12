"use client";

import TypewriterLogo from "@/components/TypewriterLogo";
import appState from "@/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { activeSection } = useSnapshot(appState);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname == "/";

  const navigateToSection = (item: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5 md:px-36">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          <TypewriterLogo />
        </div>
        <ul className="hidden md:flex items-center space-x-10">
          {["about", "projects", "tech", "blog", "contact"].map((item) => (
            <li key={item}>
              <button
                onClick={() => navigateToSection(item)}
                className={`text-sm font-semibold tracking-wide capitalize transition-all duration-300 ${
                  activeSection === item
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t(`navbar.${item}`)}
              </button>
            </li>
          ))}
          <li>
            <button
               onClick={() => navigateToSection('contact')}
               className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm font-bold text-blue-400 glass hover:bg-blue-500 hover:text-slate-950 transition-all"
            >
              {t('navbar.resume')}
            </button>
          </li>
        </ul>
        <button className="md:hidden text-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
