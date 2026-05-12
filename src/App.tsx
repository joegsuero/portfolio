import Page from "./components/Page";
import AnimatedBackground from "./layout/AnimatedBackground";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { i18n } = useTranslation(); // Used to trigger re-renders on language change

  return (
    <I18nextProvider i18n={i18n}>
      <AnimatedBackground />
      <Page />

      {/* Floating Language Switcher */}
      <button
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white font-bold text-sm hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 group"
        title={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
      >
        <span className="group-hover:scale-110 transition-transform duration-200">
          {i18n.language === 'en' ? 'ES' : 'EN'}
        </span>
      </button>
    </I18nextProvider>
  );
}

export default App;
