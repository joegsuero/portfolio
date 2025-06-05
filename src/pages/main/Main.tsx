"use client";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Tech from "./sections/Tech";
import Contact from "./sections/Contact";
import useScrollSections from "@/hooks/useScrollSections";

function Main() {
  const { heroRef, aboutRef, projectsRef, techRef, contactRef } =
    useScrollSections(["hero", "about", "project", "contact", "tech"]);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <Hero ref={heroRef} />

      {/* About Section */}
      <About ref={aboutRef} />

      {/* Projects Section */}
      <Projects ref={projectsRef} />

      {/* Tech Stack Section */}
      <Tech ref={techRef} />

      {/* Contact Section */}
      <Contact ref={contactRef} />
    </main>
  );
}

export default Main;
