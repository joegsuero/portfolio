/* eslint-disable @typescript-eslint/no-explicit-any */
import { TECH_STACK } from "@/data/data";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Tech = forwardRef((_props, ref: any) => {
  return (
    <section id="tech" ref={ref} className="py-24 relative px-2">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-900/20 px-3 py-1 rounded-md mb-4">
              <h2 className="font-pixel text-sm text-blue-400">
                Main Tech Stack
              </h2>
            </div>
            <h3 className="font-pixel text-3xl md:text-4xl">
              Tools & Technologies
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-blue-950/10 border border-blue-900/30 rounded-lg p-4 hover:bg-blue-900/20 transition-all"
              >
                <div className="font-pixel text-blue-400 mb-2">{tech.name}</div>
                <div className="w-full bg-blue-900/20 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Tech;
