"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { PROJECTS } from "@/data/data";
import PixelButton from "@/components/PixelButton";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();
  // Get unique tech categories from all projects
  const allTechCategories = Array.from(
    new Set(PROJECTS.flatMap((project) => project.tech))
  ).sort();

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);

  // Filter projects when selected filters change
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredProjects(PROJECTS);
    } else {
      const filtered = PROJECTS.filter((project) =>
        selectedFilters.some((filter) => project.tech.includes(filter))
      );
      setFilteredProjects(filtered);
    }
  }, [selectedFilters]);

  // Toggle filter selection
  const toggleFilter = (tech: string) => {
    setSelectedFilters((prev) =>
      prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="py-24 bg-blue-950/20 relative px-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
                <h2 className="font-pixel text-sm text-blue-400">Portfolio</h2>
              </div>
              <h1 className="font-pixel text-3xl md:text-5xl mb-6  text-white">
                All Projects
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse through my complete collection of projects. Use the
                filters below to find projects by technology.
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-12 bg-blue-950/30 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-400" />
                  <h3 className="font-pixel text-blue-400">Filter Projects</h3>
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-400 hover:text-blue-300 font-pixel"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {allTechCategories.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleFilter(tech)}
                    className={`text-xs px-3 py-1.5 rounded-md font-pixel transition-colors ${
                      selectedFilters.includes(tech)
                        ? "bg-blue-600 text-white"
                        : "bg-blue-900/30 text-blue-300 hover:bg-blue-900/50"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 mb-4">
                  No projects match your selected filters.
                </p>
                <PixelButton onClick={clearFilters} variant="secondary">
                  Clear Filters
                </PixelButton>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black border border-blue-900/30 rounded-lg overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-pixel text-xl text-blue-400 mb-2">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
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
                      <div className="flex justify-end mt-4">
                        <span
                          onClick={() => {
                            navigate("/projects/" + project.title);
                            setTimeout(() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }, 300);
                          }}
                          className="text-blue-400 font-pixel text-sm hover:cursor-pointer hover:scale-105 p-2"
                        >
                          View Details →
                        </span>
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
