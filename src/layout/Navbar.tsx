"use client";

import TypewriterLogo from "@/components/TypewriterLogo";
import appState from "@/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const Navbar = () => {
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-blue-900/30 md:px-36">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-pixel tracking-wider text-blue-400">
          <TypewriterLogo />
        </div>
        <ul className="hidden md:flex space-x-8">
          {["about", "projects", "tech", "contact"].map((item) => (
            <li key={item}>
              <button
                onClick={() => navigateToSection(item)}
                className={`font-pixel uppercase text-sm tracking-wider ${
                  activeSection === item
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-blue-300"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-blue-400">
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
