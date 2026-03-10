import TypewriterLogo from "@/components/TypewriterLogo";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950/50 md:px-36">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-2xl font-bold tracking-tight">
              <TypewriterLogo />
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Building digital excellence with precision and passion.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex space-x-6">
              <a
                href="https://github.com/joegsuero"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/joegsuero"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:joegsuero@gmail.com"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-500 text-xs font-medium">
              &copy; {new Date().getFullYear()} José Daniel García Suero.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
