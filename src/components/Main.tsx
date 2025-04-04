"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import PixelButton from "./PixelButton";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (
        aboutRef.current &&
        scrollPosition >= aboutRef.current.offsetTop &&
        scrollPosition < (projectsRef.current?.offsetTop || 0)
      ) {
        setActiveSection("about");
      } else if (
        projectsRef.current &&
        scrollPosition >= projectsRef.current.offsetTop &&
        scrollPosition < (techRef.current?.offsetTop || 0)
      ) {
        setActiveSection("projects");
      } else if (
        techRef.current &&
        scrollPosition >= techRef.current.offsetTop &&
        scrollPosition < (contactRef.current?.offsetTop || 0)
      ) {
        setActiveSection("tech");
      } else if (
        contactRef.current &&
        scrollPosition >= contactRef.current.offsetTop
      ) {
        setActiveSection("contact");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-blue-900/30 md:px-36">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-pixel tracking-wider text-blue-400">
            <span className="bg-blue-900 px-2 py-1 rounded">JGS</span>
          </div>
          <ul className="hidden md:flex space-x-8">
            {["about", "projects", "tech", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    document
                      .getElementById(item)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="h-screen flex flex-col justify-center relative overflow-hidden pt-16 md:px-36"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 z-10"
        >
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
              <h2 className="font-pixel text-sm text-blue-400">
                Software Engineer
              </h2>
            </div>
            <h1 className="font-pixel text-4xl md:text-6xl mb-6 leading-tight">
              <span className="block">Jose</span>
              <span className="block text-blue-400">Garcia Suero</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-lg text-lg">
              Building digital experiences with 4 years of expertise in software
              development.
            </p>
            <div className="flex flex-wrap gap-4">
              <PixelButton
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="primary"
              >
                View Projects
              </PixelButton>
              <PixelButton
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="secondary"
              >
                Contact Me
              </PixelButton>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-blue-400 w-8 h-8" />
        </div>

        {/* Background grid */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="grid-bg w-full h-full"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
              <h2 className="font-pixel text-sm text-blue-400">About Me</h2>
            </div>
            <h3 className="font-pixel text-3xl md:text-4xl mb-8">
              The Developer Behind The Code
            </h3>

            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <p className="text-gray-300 mb-4">
                  Hello! I'm Jose, a passionate software engineer with 4 years
                  of experience building robust and scalable applications. I
                  specialize in creating efficient solutions that solve
                  real-world problems.
                </p>
                <p className="text-gray-300 mb-4">
                  My journey in software development has equipped me with a
                  diverse skill set and a deep understanding of modern
                  development practices. I'm constantly learning and adapting to
                  new technologies to stay at the forefront of the industry.
                </p>
                <p className="text-gray-300">
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge with the developer community.
                </p>
              </div>
              <div className="md:col-span-2 relative">
                <div className="aspect-square bg-blue-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-blue-400 rounded-lg flex items-center justify-center">
                      <span className="font-pixel text-blue-400 text-center">
                        [Your Photo]
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="border-blue-900/20 border-r border-b"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-24 bg-blue-950/20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
                <h2 className="font-pixel text-sm text-blue-400">Projects</h2>
              </div>
              <h3 className="font-pixel text-3xl md:text-4xl">Featured Work</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Project Alpha",
                  description:
                    "A full-stack application with real-time data synchronization and advanced user authentication.",
                  tech: ["React", "Node.js", "MongoDB"],
                  image: "/placeholder.jpg",
                },
                {
                  title: "Data Visualizer",
                  description:
                    "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
                  tech: ["Vue.js", "D3.js", "Firebase"],
                  image: "/placeholder.jpg",
                },
                {
                  title: "API Gateway",
                  description:
                    "Microservice architecture with API gateway for efficient service communication and load balancing.",
                  tech: ["Go", "Docker", "Kubernetes"],
                  image: "/placeholder.jpg",
                },
                {
                  title: "Mobile Companion",
                  description:
                    "Cross-platform mobile application with offline capabilities and seamless cloud synchronization.",
                  tech: ["React Native", "GraphQL", "AWS"],
                  image: "/placeholder.jpg",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-black border border-blue-900/30 rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-pixel text-xl text-blue-400 mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded font-pixel"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-pixel text-sm"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-pixel text-sm"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <PixelButton variant="secondary">View All Projects</PixelButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" ref={techRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
                <h2 className="font-pixel text-sm text-blue-400">Tech Stack</h2>
              </div>
              <h3 className="font-pixel text-3xl md:text-4xl">
                Tools & Technologies
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "JavaScript", level: 90 },
                { name: "TypeScript", level: 85 },
                { name: "React", level: 90 },
                { name: "Node.js", level: 85 },
                { name: "Python", level: 75 },
                { name: "MongoDB", level: 80 },
                { name: "SQL", level: 75 },
                { name: "Docker", level: 70 },
                { name: "AWS", level: 65 },
                { name: "Git", level: 90 },
                { name: "GraphQL", level: 75 },
                { name: "Vite", level: 85 },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-blue-950/10 border border-blue-900/30 rounded-lg p-4 hover:bg-blue-900/20 transition-all"
                >
                  <div className="font-pixel text-blue-400 mb-2">
                    {tech.name}
                  </div>
                  <div className="w-full bg-blue-900/20 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24 bg-blue-950/20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
                <h2 className="font-pixel text-sm text-blue-400">Contact</h2>
              </div>
              <h3 className="font-pixel text-3xl md:text-4xl">Get In Touch</h3>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                Interested in working together? Feel free to reach out through
                any of the channels below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black border border-blue-900/30 rounded-lg p-6">
                <h4 className="font-pixel text-xl text-blue-400 mb-6">
                  Send a Message
                </h4>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-pixel text-gray-400 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-blue-950/10 border border-blue-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-pixel text-gray-400 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-blue-950/10 border border-blue-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-pixel text-gray-400 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full bg-blue-950/10 border border-blue-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    ></textarea>
                  </div>
                  <PixelButton
                    type="submit"
                    variant="primary"
                    className="w-full"
                  >
                    Send Message
                  </PixelButton>
                </form>
              </div>

              <div className="bg-black border border-blue-900/30 rounded-lg p-6">
                <h4 className="font-pixel text-xl text-blue-400 mb-6">
                  Connect With Me
                </h4>
                <div className="space-y-6">
                  <a
                    href="mailto:jose@example.com"
                    className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="bg-blue-900/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-pixel text-sm text-gray-400">
                        Email
                      </div>
                      <div>jose@example.com</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="bg-blue-900/20 p-3 rounded-lg">
                      <Github className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-pixel text-sm text-gray-400">
                        GitHub
                      </div>
                      <div>github.com/josegarcia</div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="bg-blue-900/20 p-3 rounded-lg">
                      <Linkedin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-pixel text-sm text-gray-400">
                        LinkedIn
                      </div>
                      <div>linkedin.com/in/josegarcia</div>
                    </div>
                  </a>

                  <div className="pt-4 mt-4 border-t border-blue-900/30">
                    <div className="font-pixel text-sm text-gray-400 mb-2">
                      Location
                    </div>
                    <div className="text-gray-300">
                      Available for remote work worldwide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-blue-900/30 md:px-36">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-pixel tracking-wider text-blue-400">
                <span className="bg-blue-900 px-2 py-1 rounded">JGS</span>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Jose Garcia Suero. All rights
              reserved.
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
    </main>
  );
}

export default App;
