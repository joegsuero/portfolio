"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { PROJECTS } from "@/data/data";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { title: slug } = useParams();

  const navigate = useNavigate();
  const project =
    PROJECTS.find((p) => p.title === slug || p.title === undefined) ||
    PROJECTS[Number.parseInt(slug as string, 10)];

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-blue-400 mb-6">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the project you're looking for.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95"
          >
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  const goBack = () => {
    navigate("/projects");
  };

  const currentIndex =
    Number.parseInt(slug as string, 10) ||
    PROJECTS.findIndex((p) => p.title === slug);
  const prevIndex = Math.max(0, currentIndex - 1);
  const nextIndex = Math.min(PROJECTS.length - 1, currentIndex + 1);
  const prevProject = PROJECTS[prevIndex];
  const nextProject = PROJECTS[nextIndex];

  return (
    <div className="min-h-screen bg-black">
      <div className="py-32 relative px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={goBack}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </motion.button>

            {/* Project header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass">
                <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  Project Details
                </h2>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {project.title}
              </h1>
              <p className="text-gray-400 text-lg">{project.description}</p>
            </motion.div>

            {/* Project image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mb-16 rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40"
            >
              <img
                src={project.image || "/placeholder.svg?height=600&width=1200"}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
            </motion.div>

            {/* Project details grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2"
              >
                <div className="space-y-12">
                  {/* Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Overview
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      {project.longDescription && (
                        <p className="text-gray-400 text-lg leading-relaxed">
                          {project.longDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-6">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex gap-3 text-gray-400"
                        >
                          <span className="text-blue-400 font-bold mt-1">
                            →
                          </span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  {project.challenges && (
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6">
                        Challenges & Solutions
                      </h4>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Sidebar - Project Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-fit"
              >
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 glass-dark sticky top-8">
                  <h3 className="text-xl font-bold text-white mb-8">
                    Project Details
                  </h3>

                  <div className="space-y-8">
                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:border-blue-500/50 hover:text-blue-300 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Completion Date */}
                    {project.completedDate && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          Completed
                        </h4>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">
                            {project.completedDate}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Role */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        My Role
                      </h4>
                      <span className="text-gray-300">{project.role}</span>
                    </div>

                    {/* Links */}
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
                        >
                          <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            View Live Demo
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
                          <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                            <Github className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            View Source Code
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation between projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-white/5 pt-12 mt-12"
            >
              <div className="flex items-center justify-between gap-4">
                {currentIndex > 0 && (
                  <button
                    onClick={() => {
                      navigate(`/projects/${prevProject.title || prevIndex}`);
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 50);
                    }}
                    className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 border border-white/5 rounded-xl font-semibold glass-dark hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </button>
                )}
                <div className="flex-1"></div>
                {nextIndex > currentIndex && (
                  <button
                    onClick={() => {
                      navigate(`/projects/${nextProject.title || nextIndex}`);
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 50);
                    }}
                    className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 border border-white/5 rounded-xl font-semibold glass-dark hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                  >
                    Next
                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
