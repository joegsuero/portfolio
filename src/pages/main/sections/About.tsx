/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { forwardRef } from "react";

const About = forwardRef((_props, ref: any) => {
  return (
    <section id="about" ref={ref} className="py-32 relative px-6 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row gap-16 items-center"
          >
            <div className="flex-1 order-2 md:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
              >
                <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">About Me</h2>
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              >
                The Developer Behind <span className="text-gradient">The Code</span>
              </motion.h3>

              <div className="space-y-6">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  Hello! I'm Jose, a passionate software engineer with 
                  <span className="text-white font-medium"> 4 years of experience </span> 
                  building robust and scalable applications. I specialize in 
                  creating efficient solutions that solve real-world problems.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  My journey in software development has equipped me with a 
                  diverse skill set and a deep understanding of modern development 
                  practices. I'm constantly learning and adapting to new 
                  technologies to stay at the forefront of the industry.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or sharing my knowledge 
                  with the developer community.
                </motion.p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex-1 order-1 md:order-2 w-full max-w-md"
            >
              <div className="relative group">
                {/* Decorative frames */}
                <div className="absolute -inset-4 border border-blue-500/20 rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -inset-8 border border-white/5 rounded-2xl -z-20 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="aspect-[4/5] bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl glass-dark">
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src="Profile.jpeg" 
                    alt="Jose Garcia Suero"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;
