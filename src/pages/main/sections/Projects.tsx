/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { forwardRef } from "react";
import { PROJECTS } from "@/data/data";
import { useNavigate } from "react-router-dom";

const Projects = forwardRef((_props, ref: any) => {
  const navigate = useNavigate();

  const navigateToProjectDetail = (title: string) => {
    navigate("/projects/" + title);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32 relative px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
            >
              <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                Portfolio
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Some Featured <span className="text-gradient">Work</span>
            </motion.h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {PROJECTS.slice(0, 4).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div
                    className="relative cursor-pointer overflow-hidden aspect-video"
                    onClick={() => navigateToProjectDetail(project.title)}
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h4
                      className="text-2xl font-bold text-white mb-3 cursor-pointer group-hover:text-blue-400 transition-colors"
                      onClick={() => navigateToProjectDetail(project.title)}
                    >
                      {project.title}
                    </h4>
                    <p className="text-gray-400 mb-6 line-clamp-2 text-lg">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                        >
                          <Github className="w-5 h-5" /> Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                        >
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button
              onClick={() => {
                navigate("projects");
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 300);
              }}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
