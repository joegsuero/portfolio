"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/data/data";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read a pre-applied filter coming from the Tech page portal animation
  const incomingFilter: string | undefined = location.state?.techFilter;

  // Get unique tech categories from all projects
  const allTechCategories = Array.from(
    new Set(PROJECTS.flatMap((project) => project.tech)),
  ).sort();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    incomingFilter ? [incomingFilter] : [],
  );
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);

  // Filter projects when selected filters change
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredProjects(PROJECTS);
    } else {
      const filtered = PROJECTS.filter((project) =>
        selectedFilters.some((filter) => project.tech.includes(filter)),
      );
      setFilteredProjects(filtered);
    }
  }, [selectedFilters]);

  // Toggle filter selection
  const toggleFilter = (tech: string) => {
    setSelectedFilters((prev) =>
      prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="py-32 relative px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header Section */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
              >
                <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  Portfolio
                </h2>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                All <span className="text-gradient">Projects</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                Browse through my complete collection of projects. Use the
                filters below to find projects by technology.
              </motion.p>
            </div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16 bg-slate-900/40 border border-white/5 rounded-3xl p-8 glass-dark"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">
                    Filter Projects
                  </h3>
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {allTechCategories.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleFilter(tech)}
                    className={`text-sm px-4 py-2 rounded-full font-medium transition-all ${
                      selectedFilters.includes(tech)
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500/50 hover:text-blue-300"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-24"
              >
                <p className="text-gray-400 mb-8 text-lg">
                  No projects match your selected filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 bg-secondary text-secondary-foreground border border-white/5 rounded-xl font-semibold glass-dark hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group h-full"
                  >
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                      {/* Image Section */}
                      <div
                        className="relative cursor-pointer overflow-hidden aspect-video"
                        onClick={() => {
                          navigate("/projects/" + project.title);
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }, 300);
                        }}
                      >
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h4
                          className="text-2xl font-bold text-white mb-3 cursor-pointer group-hover:text-blue-400 transition-colors line-clamp-2"
                          onClick={() => {
                            navigate("/projects/" + project.title);
                            setTimeout(() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 300);
                          }}
                        >
                          {project.title}
                        </h4>
                        <p className="text-gray-400 mb-6 line-clamp-2 text-base leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                                selectedFilters.includes(tech)
                                  ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                                  : "bg-white/5 border border-white/10 text-gray-300"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Footer with Links */}
                        <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                          <div className="flex gap-4">
                            {project.code && (
                              <a
                                href={project.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 flex items-center gap-2 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              navigate("/projects/" + project.title);
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }, 300);
                            }}
                            className="text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
