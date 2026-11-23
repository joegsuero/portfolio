import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar } from "lucide-react";
import { PROJECTS } from "@/data/data";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatMonth, useProjectText } from "@/hooks/useProjectText";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const { t, i18n } = useTranslation();
  const getText = useProjectText();

  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);

  if (currentIndex === -1) {
    // Old links used the English title as the slug: redirect them to the new URL
    const enT = i18n.getFixedT("en");
    const legacy = PROJECTS.find(
      (p) => enT(`projectsData.${p.id}.title`) === slug,
    );
    if (legacy) return <Navigate to={`/projects/${legacy.id}`} replace />;

    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-blue-400 mb-6">
            {t("projectDetail.notFoundTitle")}
          </h1>
          <p className="text-gray-400 mb-8">{t("projectDetail.notFoundText")}</p>
          <Link
            to="/projects"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95"
          >
            {t("projectDetail.back")}
          </Link>
        </motion.div>
      </main>
    );
  }

  const project = PROJECTS[currentIndex];
  const text = getText(project);
  const prevProject = PROJECTS[currentIndex - 1];
  const nextProject = PROJECTS[currentIndex + 1];
  const language = i18n.resolvedLanguage ?? "en";

  return (
    <main className="min-h-screen bg-black">
      <div className="py-32 relative px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Back link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t("projectDetail.back")}
            </Link>

            {/* Project header */}
            <div className="mb-12">
              <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass">
                <p className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  {t("projectDetail.badge")}
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {text.title}
              </h1>
              <p className="text-gray-400 text-lg">{text.description}</p>
            </div>

            {/* Project image */}
            <div className="relative mb-16 rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40">
              <img
                src={project.image}
                alt={text.title}
                width={project.imageWidth}
                height={project.imageHeight}
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>

            {project.video && (
              <section className="mb-16">
                <h2 className="text-xl font-bold text-white mb-6">
                  {t("projectDetail.video")}
                </h2>
                <video
                  src={project.video}
                  poster={project.image}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full rounded-3xl border border-white/5 bg-slate-900/40"
                />
              </section>
            )}

            {/* Project details grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Main content */}
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {t("projectDetail.overview")}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {text.longDescription ?? text.description}
                  </p>
                </section>

                {text.problem && (
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6">
                      {t("projectDetail.problem")}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {text.problem}
                    </p>
                  </section>
                )}

                {text.approach.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6">
                      {t("projectDetail.approach")}
                    </h2>
                    <ol className="space-y-4">
                      {text.approach.map((step, i) => (
                        <li key={step} className="flex gap-4">
                          <span
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-bold flex items-center justify-center"
                            aria-hidden="true"
                          >
                            {i + 1}
                          </span>
                          <span className="text-gray-300 leading-relaxed pt-1">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {text.features.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6">
                      {t("projectDetail.keyFeatures")}
                    </h2>
                    <ul className="space-y-3">
                      {text.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-gray-400">
                          <span className="text-blue-400 font-bold" aria-hidden="true">
                            →
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* "Challenges" is superseded by the step-by-step approach */}
                {text.challenges && text.approach.length === 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6">
                      {t("projectDetail.challenges")}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {text.challenges}
                    </p>
                  </section>
                )}

                {text.outcome && (
                  <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">
                    <h2 className="text-xl font-bold text-white mb-3">
                      {t("projectDetail.outcome")}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {text.outcome}
                    </p>
                  </section>
                )}
              </div>

              {/* Sidebar - Project Info Card */}
              <aside className="h-fit md:sticky md:top-28">
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 glass-dark">
                  <h2 className="text-xl font-bold text-white mb-8">
                    {t("projectDetail.sidebarTitle")}
                  </h2>

                  <dl className="space-y-8">
                    <div>
                      <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {t("projectDetail.technologies")}
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>

                    {(project.completedDate || project.inProgress || project.inProduction) && (
                      <div>
                        <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          {project.completedDate
                            ? t("projectDetail.completed")
                            : t("projectDetail.status")}
                        </dt>
                        <dd className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-blue-400" aria-hidden="true" />
                          <span className="text-gray-300">
                            {project.completedDate
                              ? formatMonth(project.completedDate, language)
                              : project.inProduction
                                ? t("projectDetail.inProduction")
                                : t("projectDetail.inProgress")}
                          </span>
                        </dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {t("projectDetail.role")}
                      </dt>
                      <dd className="text-gray-300">{text.role}</dd>
                    </div>
                  </dl>

                  {(project.live || project.code) && (
                    <div className="mt-8 pt-4 border-t border-white/5 space-y-3">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-400" aria-hidden="true" />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {t("projectDetail.viewLive")}
                          </span>
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                        >
                          <Github className="w-4 h-4 text-blue-400" aria-hidden="true" />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {t("projectDetail.viewCode")}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </aside>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <section className="mb-16">
                <h2 className="text-xl font-bold text-white mb-6">
                  {t("projectDetail.gallery")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.gallery.map((img, i) => (
                    <a
                      key={img.src}
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-colors"
                    >
                      <img
                        src={img.src}
                        alt={`${text.title} — ${i + 2}`}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Navigation between projects */}
            <nav className="border-t border-white/5 pt-12 mt-12 flex items-center justify-between gap-4">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 border border-white/5 rounded-xl font-semibold glass-dark hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  {t("projectDetail.previous")}
                </Link>
              ) : (
                <span />
              )}
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 border border-white/5 rounded-xl font-semibold glass-dark hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                >
                  {t("projectDetail.next")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </nav>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
