import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Filter, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/data/data";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjectText } from "@/hooks/useProjectText";

const ALL_TECH = Array.from(new Set(PROJECTS.flatMap((p) => p.tech))).sort();

const ProjectsPage = () => {
  const { t } = useTranslation();
  const getText = useProjectText();
  const location = useLocation();

  // Optional pre-applied filter passed through navigation state
  const incomingFilter: string | undefined = location.state?.techFilter;

  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    incomingFilter ? [incomingFilter] : [],
  );

  const filteredProjects = useMemo(
    () =>
      selectedFilters.length === 0
        ? PROJECTS
        : PROJECTS.filter((project) =>
            selectedFilters.some((filter) => project.tech.includes(filter)),
          ),
    [selectedFilters],
  );

  const toggleFilter = (tech: string) => {
    setSelectedFilters((prev) =>
      prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech],
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  return (
    <main className="min-h-screen bg-black">
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
                <p className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  {t("projectsPage.badge")}
                </p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                {t("projectsPage.headingStart")}{" "}
                <span className="text-gradient">
                  {t("projectsPage.headingHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                {t("projectsPage.description")}
              </motion.p>
            </div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 glass-dark"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-white">
                    {t("projectsPage.filterTitle")}
                  </h2>
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    {t("projectsPage.clearAll")}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {ALL_TECH.map((tech) => {
                  const active = selectedFilters.includes(tech);
                  return (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => toggleFilter(tech)}
                      aria-pressed={active}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all ${
                        active
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500/50 hover:text-blue-300"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
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
                  {t("projectsPage.noResults")}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-8 py-4 bg-secondary text-secondary-foreground border border-white/5 rounded-xl font-semibold glass-dark hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  {t("projectsPage.clearFilters")}
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => {
                  const text = getText(project);
                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group h-full"
                    >
                      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                        <Link
                          to={`/projects/${project.id}`}
                          className="relative block overflow-hidden aspect-video"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <img
                            src={project.image}
                            alt=""
                            width={project.imageWidth}
                            height={project.imageHeight}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                        </Link>

                        <div className="p-8 flex flex-col flex-grow">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                            <Link to={`/projects/${project.id}`}>{text.title}</Link>
                          </h3>
                          <p className="text-gray-400 mb-6 line-clamp-2 text-base leading-relaxed">
                            {text.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
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

                          <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                            <div className="flex gap-4">
                              {project.code && (
                                <a
                                  href={project.code}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={t("projectsPage.codeAria", { title: text.title })}
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
                                  aria-label={t("projectsPage.liveAria", { title: text.title })}
                                  className="text-gray-400 hover:text-blue-400 flex items-center gap-2 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                            <Link
                              to={`/projects/${project.id}`}
                              className="text-blue-400 hover:text-blue-300 font-bold text-sm transition-all flex items-center gap-2 hover:gap-3"
                            >
                              {t("projects.viewDetails")} <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
