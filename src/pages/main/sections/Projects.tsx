/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { forwardRef } from "react";
import { PROJECTS } from "@/data/data";
import { Link } from "react-router-dom";
import { useProjectText } from "@/hooks/useProjectText";
import ProjectBadges from "@/components/ProjectBadges";
import { useTranslation } from "react-i18next";

const Projects = forwardRef((_props, ref: any) => {
  const { t } = useTranslation();
  const getText = useProjectText();

  const featured = PROJECTS.slice(0, 4);
  // 3 projects -> 3 columns on desktop; an odd last card spans the full row on tablet
  const gridCols =
    featured.length === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  const lastCardSpan =
    featured.length % 2 === 1
      ? featured.length === 3
        ? "md:col-span-2 lg:col-span-1"
        : "md:col-span-2"
      : "";

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
                {t('projects.title')}
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t("projects.headingStart")}{" "}
              <span className="text-gradient">{t("projects.headingHighlight")}</span>
            </motion.h3>
          </div>

          <div className={`grid gap-8 lg:gap-10 ${gridCols}`}>
            {featured.map((project, index) => {
              const text = getText(project);
              const isLast = index === featured.length - 1;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group relative ${isLast ? lastCardSpan : ""}`}
                >
                  <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden glass-dark h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="relative">
                      <ProjectBadges project={project} />
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
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        <Link to={`/projects/${project.id}`}>{text.title}</Link>
                      </h4>
                      <p className="text-gray-400 mb-6 line-clamp-2 text-lg">
                        {text.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-white/5">
                        <div className="flex gap-5">
                          {project.code && (
                            <a
                              href={project.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                              <Github className="w-5 h-5" /> {t("projects.code")}
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" /> {t("projects.liveDemo")}
                            </a>
                          )}
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
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

          <div className="text-center mt-20">
            <Link
              to="/projects"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t("projects.viewAll")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
