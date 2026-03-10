/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

const Hero = forwardRef((_props, ref: any) => {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // custom ease-out-expo
      },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="h-screen flex flex-col justify-center relative overflow-hidden pt-16 lg:px-48 md:px-36 px-6"
    >
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 z-10"
      >
        <div className="max-w-4xl">
          <motion.div
            variants={itemVariants}
            className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
          >
            <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
              Software Engineer
            </h2>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block opacity-90">José Daniel</span>
            <span className="block text-gradient">García Suero</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 mb-10 max-w-xl text-lg md:text-xl leading-relaxed"
          >
            Crafting high-performance digital solutions with 4 years of
            expertise. I specialize in building scalable applications that
            bridge the gap between complex logic and human-centric design.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95"
            >
              Explore My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-secondary text-secondary-foreground border border-white/5 rounded-xl font-semibold glass-dark hover:bg-white/5 transition-all outline-none"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown className="text-blue-400 w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
      </motion.div>
    </section>
  );
});

export default Hero;
