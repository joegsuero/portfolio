/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useScroll, useTransform } from "framer-motion";
import PixelButton from "../../../components/PixelButton";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

const Hero = forwardRef((_props, ref: any) => {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col justify-center relative overflow-hidden pt-16 md:px-36 px-6"
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="container mx-auto px-4 z-10"
      >
        <div className="max-w-3xl">
          <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
            <h2 className="font-pixel text-sm text-blue-400">
              Software Engineer
            </h2>
          </div>
          <h1 className="font-pixel text-4xl md:text-6xl mb-6 leading-tight">
            <span className="block">José Daniel</span>
            <span className="block text-blue-400">García Suero</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-lg text-lg">
            Building digital experiences with 4 years of expertise in software
            development.
          </p>
          <div className="flex flex-wrap gap-4">
            <PixelButton
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="primary"
            >
              View Projects
            </PixelButton>
            <PixelButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="secondary"
            >
              Contact Me
            </PixelButton>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-blue-400 w-8 h-8" />
      </div>
    </section>
  );
});

export default Hero;
