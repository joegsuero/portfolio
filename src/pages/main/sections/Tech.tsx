"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TECH_STACK } from "@/data/data";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Tech = forwardRef((_props, ref: any) => {
  return (
    <section id="tech" ref={ref} className="py-32 relative px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
            >
              <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">Toolkit</h2>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Tools & <span className="text-gradient">Technologies</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              A curated list of technologies I use to bring ideas to life. 
              Always curious and constantly evolving my stack.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 glass-dark transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 h-full flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold group-hover:bg-blue-400 group-hover:text-slate-900 transition-colors shrink-0">
                    {tech.name.substring(0, 1)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{tech.name}</div>
                    <div className="text-gray-500 text-sm font-medium">Expertise</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Tech.displayName = "Tech";

export default Tech;
