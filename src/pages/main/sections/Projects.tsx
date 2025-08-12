/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { forwardRef } from "react";
import PixelButton from "../../../components/PixelButton";
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
      className="py-24 bg-blue-950/20 relative px-2"
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
            <h3 className="font-pixel text-3xl md:text-4xl">
              Some Featured Work
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 4).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-black border border-blue-900/30 rounded-lg overflow-hidden group"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigateToProjectDetail(project.title)}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-6">
                  <h4
                    className="font-pixel text-xl text-blue-400 mb-2 cursor-pointer"
                    onClick={() => navigateToProjectDetail(project.title)}
                  >
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
                      href={project.code ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-pixel text-sm"
                    >
                      {project.code && (
                        <>
                          <Github className="w-4 h-4" /> Code
                        </>
                      )}
                    </a>
                    <a
                      href={project.live ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-pixel text-sm"
                    >
                      {project.live && (
                        <>
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </>
                      )}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <PixelButton
              onClick={() => {
                navigate("projects");
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 300);
              }}
              variant="secondary"
            >
              View All Projects
            </PixelButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Projects;
