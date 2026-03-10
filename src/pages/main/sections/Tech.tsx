"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TECH_STACK } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Phase = "idle" | "opening" | "zooming";

const Tech = forwardRef((_props, ref: any) => {
  const navigate = useNavigate();

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [clipStart, setClipStart] = useState<string>("");

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTechClick = (techName: string, index: number) => {
    if (phase !== "idle") return;

    const el = cardRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const t = Math.round(rect.top);
      const r = Math.round(window.innerWidth - rect.right);
      const b = Math.round(window.innerHeight - rect.bottom);
      const l = Math.round(rect.left);
      setClipStart(`inset(${t}px ${r}px ${b}px ${l}px round 16px)`);
    }

    setSelectedTech(techName);
    setPhase("opening");

    // Phase 2: start the void zoom after door fully opens
    setTimeout(() => setPhase("zooming"), 650);

    // Phase 3: navigate once the void covers the screen
    setTimeout(() => {
      navigate("/projects", { state: { techFilter: techName } });
    }, 1750);
  };

  return (
    <>
      <section
        id="tech"
        ref={ref}
        className="py-32 relative px-6 overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 glass"
              >
                <h2 className="text-sm font-medium tracking-wider uppercase text-blue-400">
                  Toolkit
                </h2>
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

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                  // Perspective must live on the PARENT for rotateY to look 3-D
                  style={{ perspective: "1000px" }}
                >
                  {/*
                   * BLACK VOID — sits behind the door.
                   * Rendered first so it's below the door in stacking order.
                   */}
                  <div className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Subtle radial glow so the void feels deep, not flat */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_transparent_70%)]" />
                    <span className="relative text-blue-500/40 text-[10px] font-bold tracking-[0.35em] uppercase select-none">
                      {/* Enter */}
                    </span>
                  </div>

                  {/*
                   * THE DOOR CARD
                   * transformOrigin: 'left center' → hinged on the left side.
                   * rotateY: -90 → swings open to the left (like a real door).
                   */}
                  <motion.div
                    ref={(el) => (cardRefs.current[index] = el)}
                    animate={
                      selectedTech === tech.name && phase !== "idle"
                        ? { rotateY: -90 }
                        : { rotateY: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      cursor: phase === "idle" ? "pointer" : "default",
                    }}
                    onClick={() => handleTechClick(tech.name, index)}
                    className="relative bg-slate-900/40 border border-white/5 rounded-2xl p-6 glass-dark h-full flex items-center gap-4 transition-colors duration-300 hover:border-blue-500/30 hover:bg-blue-500/5"
                  >
                    {/* Front face of the door */}
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold group-hover:bg-blue-400 group-hover:text-slate-900 transition-colors shrink-0">
                      {tech.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-gray-500 text-sm font-medium">
                        Expertise
                      </div>
                    </div>

                    {/*
                     * Door edge — visible as the card rotates, giving it physical
                     * thickness. Absolutely positioned on the right edge of the card.
                     */}
                    <div
                      className="absolute top-0 right-0 w-3 h-full bg-slate-700/60 rounded-r-2xl"
                      style={{
                        transform: "rotateY(90deg) translateZ(6px)",
                        transformOrigin: "right center",
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
       * FULL-SCREEN VOID OVERLAY
       *
       * Uses clipPath to start as a rect exactly matching the clicked card,
       * then expands to cover the whole viewport.  This creates the "you are
       * walking into the door" pull effect.
       */}
      <AnimatePresence>
        {phase === "zooming" && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black overflow-hidden"
            initial={{ clipPath: clipStart }}
            animate={{ clipPath: "inset(0px 0px 0px 0px round 0px)" }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Radial depth layers — expand outward like a tunnel rushing past */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0.05 + i * 0.05, opacity: 0 }}
                animate={{ scale: 5 + i * 2, opacity: [0, 0.35, 0] }}
                transition={{
                  duration: 1.0,
                  delay: i * 0.06,
                  ease: "easeIn",
                }}
              >
                <div
                  className="rounded-full border border-blue-500/20"
                  style={{ width: 120 + i * 40, height: 120 + i * 40 }}
                />
              </motion.div>
            ))}

            {/* Central glow that rushes toward you */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.18)_0%,_transparent_60%)]"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 2.5, opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, ease: "easeIn" }}
            />

            {/* Tech label — scales toward the viewer then fades */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.4, opacity: 0, y: 10 }}
                animate={{ scale: 1.3, opacity: [0, 1, 0], y: -20 }}
                transition={{ duration: 1.0, ease: "easeIn" }}
                className="text-center select-none"
              >
                <p className="text-blue-400 text-xs font-semibold tracking-[0.4em] uppercase mb-3">
                  Filtering by
                </p>
                <p className="text-white text-5xl font-bold tracking-tight">
                  {selectedTech}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Tech.displayName = "Tech";
export default Tech;
