/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { EXPERIENCE } from "@/data/data";
import { formatMonth } from "@/hooks/useProjectText";

/** Renders nothing until EXPERIENCE in data.ts has entries. */
const Experience = forwardRef((_props, ref: any) => {
  const { t, i18n } = useTranslation();
  if (EXPERIENCE.length === 0) return null;

  const language = i18n.resolvedLanguage ?? "en";

  return (
    <section id="experience" ref={ref} className="py-32 relative px-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
            >
              <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                {t("experience.title")}
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              {t("experience.headingStart")}{" "}
              <span className="text-gradient">{t("experience.headingHighlight")}</span>
            </motion.h3>
          </div>

          <ol className="relative border-l border-white/10 ml-2 space-y-12">
            {EXPERIENCE.map((job, index) => {
              const base = `experienceData.${job.id}`;
              const highlights = t(`${base}.highlights`, { returnObjects: true });
              const location = i18n.exists(`${base}.location`)
                ? t(`${base}.location`)
                : undefined;
              const period = `${formatMonth(job.start, language)} — ${
                job.end ? formatMonth(job.end, language) : t("experience.present")
              }`;

              return (
                <motion.li
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative pl-8 md:pl-10"
                >
                  <span
                    className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-black ${
                      job.end ? "bg-slate-600" : "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    {period}
                    {location && <span className="text-gray-500"> · {location}</span>}
                  </p>
                  <h4 className="text-xl md:text-2xl font-bold text-white">
                    {t(`${base}.role`)}{" "}
                    <span className="text-gray-400 font-semibold">@ </span>
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gradient inline-flex items-center gap-1"
                      >
                        {job.company}
                        <ExternalLink className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-gradient">{job.company}</span>
                    )}
                  </h4>

                  {Array.isArray(highlights) && highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {(highlights as string[]).map((item) => (
                        <li key={item} className="flex gap-3 text-gray-400 leading-relaxed">
                          <span className="text-blue-400" aria-hidden="true">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
