import { proxy } from "valtio";

const appState = proxy({
  activeSection: "about",
  theme: "dark",
  menuOpen: false,
});

export const actions = {
  setActiveSection: (tab: string) => {
    appState.activeSection = tab;
  },
  toggleTheme: () => {
    appState.theme = appState.theme === "dark" ? "light" : "dark";
  },
  toggleMenu: () => {
    appState.menuOpen = !appState.menuOpen;
  },
};

export default appState;
