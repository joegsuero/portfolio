import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Tech from "./sections/Tech";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import useScrollSections from "@/hooks/useScrollSections";

const SECTIONS = [
  "hero",
  "about",
  "experience",
  "projects",
  "tech",
  "blog",
  "contact",
] as const;

function Main() {
  const {
    heroRef,
    aboutRef,
    experienceRef,
    projectsRef,
    techRef,
    blogRef,
    contactRef,
  } = useScrollSections(SECTIONS);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <Hero ref={heroRef} />

      {/* About Section */}
      <About ref={aboutRef} />

      {/* Experience (hidden while EXPERIENCE is empty) */}
      <Experience ref={experienceRef} />

      {/* Projects Section */}
      <Projects ref={projectsRef} />

      {/* Tech Stack Section */}
      <Tech ref={techRef} />

      {/* Blog Section */}
      <Blog ref={blogRef} />

      {/* Contact Section */}
      <Contact ref={contactRef} />
    </main>
  );
}

export default Main;
