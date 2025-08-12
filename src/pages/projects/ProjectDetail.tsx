"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { PROJECTS } from "@/data/data";
import PixelButton from "@/components/PixelButton";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { title: slug } = useParams();

  const navigate = useNavigate();
  const project =
    PROJECTS.find((p) => p.title === slug || p.title === undefined) ||
    PROJECTS[Number.parseInt(slug as string, 10)];

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-pixel text-3xl text-blue-400 mb-4">
            Project Not Found
          </h1>
          <PixelButton onClick={() => navigate("/projects")}>
            Back to Projects
          </PixelButton>
        </div>
      </div>
    );
  }

  const goBack = () => {
    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="py-24 bg-blue-950/20 relative px-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Back button */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 font-pixel"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </button>

            {/* Project header */}
            <div className="mb-12">
              <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
                <h2 className="font-pixel text-sm text-blue-400">
                  Project Details
                </h2>
              </div>
              <h1 className="font-pixel text-3xl md:text-5xl mb-2 text-white">
                {project.title}
              </h1>
            </div>

            {/* Project image */}
            <div className="relative mb-12 rounded-lg overflow-hidden border border-blue-900/30">
              <img
                src={project.image || "/placeholder.svg?height=600&width=1200"}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Project details */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h3 className="font-pixel text-2xl text-blue-400 mb-4">
                  Overview
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  {project.longDescription && (
                    <p className="text-gray-300 mb-6">
                      {project.longDescription}
                    </p>
                  )}

                  <h4 className="font-pixel text-xl text-blue-400 mt-8 mb-4">
                    Key Features
                  </h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  {project.challenges && (
                    <>
                      <h4 className="font-pixel text-xl text-blue-400 mt-8 mb-4">
                        Challenges & Solutions
                      </h4>
                      <p className="text-gray-300">{project.challenges}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-950/20 p-6 rounded-lg border border-blue-900/30 h-fit">
                <h3 className="font-pixel text-xl text-blue-400 mb-4">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded font-pixel"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.completedDate && (
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Completed</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">
                          {project.completedDate}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Role</h4>
                    <span className="text-gray-300">{project.role}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-pixel"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Demo
                      </a>
                    )}

                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-pixel"
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation between projects */}
            <div className="border-t border-blue-900/30 pt-8 mt-12">
              <div className="flex justify-between">
                <div>
                  {slug !== PROJECTS[0].title && (
                    <PixelButton
                      onClick={() => {
                        const currentIndex =
                          Number.parseInt(slug as string, 10) ||
                          PROJECTS.findIndex((p) => p.title === slug);
                        const prevIndex = Math.max(0, currentIndex - 1);
                        const prevProject = PROJECTS[prevIndex];
                        navigate(`/projects/${prevProject.title || prevIndex}`);
                        setTimeout(() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }, 50);
                      }}
                      variant="secondary"
                    >
                      ← Previous Project
                    </PixelButton>
                  )}
                </div>
                <div>
                  {(Number.parseInt(slug as string, 10) < PROJECTS.length - 1 ||
                    PROJECTS.findIndex((p) => p.title === slug) <
                      PROJECTS.length - 1) && (
                    <PixelButton
                      onClick={() => {
                        const currentIndex =
                          Number.parseInt(slug as string, 10) ||
                          PROJECTS.findIndex((p) => p.title === slug);
                        const nextIndex = Math.min(
                          PROJECTS.length - 1,
                          currentIndex + 1
                        );
                        const nextProject = PROJECTS[nextIndex];
                        navigate(`/projects/${nextProject.title || nextIndex}`);
                        setTimeout(() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }, 50);
                      }}
                      variant="secondary"
                    >
                      Next Project →
                    </PixelButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
