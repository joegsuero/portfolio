/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef } from "react";

const About = forwardRef((_props, ref: any) => {
  return (
    <section id="about" ref={ref} className="py-24 relative px-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
            <h2 className="font-pixel text-sm text-blue-400">About Me</h2>
          </div>
          <h3 className="font-pixel text-3xl md:text-4xl mb-8">
            The Developer Behind The Code
          </h3>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <p className="text-gray-300 mb-4">
                Hello! I'm Jose, a passionate software engineer with 4 years of
                experience building robust and scalable applications. I
                specialize in creating efficient solutions that solve real-world
                problems.
              </p>
              <p className="text-gray-300 mb-4">
                My journey in software development has equipped me with a
                diverse skill set and a deep understanding of modern development
                practices. I'm constantly learning and adapting to new
                technologies to stay at the forefront of the industry.
              </p>
              <p className="text-gray-300">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                with the developer community.
              </p>
            </div>
            <div className="md:col-span-2 relative">
              <div className="aspect-square bg-blue-900/30 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/4 h-4/4 border-1 rounded-lg flex items-center justify-center">
                    <span className="font-pixel text-blue-400 text-center pt-24">
                      <img src="Profile.jpeg" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default About;
