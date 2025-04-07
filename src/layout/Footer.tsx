import TypewriterLogo from "@/components/TypewriterLogo";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t bg-black border-blue-900/30 md:px-36">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-pixel tracking-wider text-blue-400">
              {/* <span className="bg-blue-900 px-2 py-1 rounded">JGS</span> */}
              <TypewriterLogo />
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} José Daniel García Suero. All
            rights reserved.
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:jose@example.com"
              className="text-gray-400 hover:text-blue-400"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
