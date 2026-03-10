/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getTechByCategory,
  TECH_CATEGORIES,
  type TechCategory,
} from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useState } from "react";

const S = {
  rootSize: 140, // px — diámetro del círculo
  rootFontSize: 14, // px — texto "MY STACK"
  rootLineHeight: 48, // px — línea root → barra horizontal

  catLineHeight: 28, // px — línea categoría → items
  categoryFontSize: 13, // px
  categoryPaddingX: 18, // px
  categoryPaddingY: 10, // px

  techFontSize: 14, // px — nombre de la tecnología
  badgeFontSize: 11, // px — badge "Xy"
  techItemHeight: 48, // px — altura de cada fila
  techPaddingX: 12, // px
  techPaddingY: 8, // px
  techGap: 10, // px
  techTickWidth: 14, // px — guión horizontal desde la spine
};
// ════════════════════════════════════════════════════════════════════

const CATEGORY_COLORS: Record<TechCategory, string> = {
  Frontend: "#60a5fa",
  Backend: "#a78bfa",
  Database: "#34d399",
  DevOps: "#fb923c",
  Tools: "#f472b6",
};

// ─── Desktop: Vertical Branch ────────────────────────────────────────────────
function VerticalBranch({
  category,
  index,
  total,
}: {
  category: TechCategory;
  index: number;
  total: number;
}) {
  const techs = getTechByCategory(category);
  const color = CATEGORY_COLORS[category];
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const spineHeight = techs.length * S.techItemHeight - 12;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Crossbar + drop */}
      <div className="relative w-full flex justify-center">
        <div
          className="absolute top-0 h-px"
          style={{
            background: `linear-gradient(to right, ${color}00, ${color}55, ${color}00)`,
            left: isFirst ? "50%" : "-1px",
            right: isLast ? "50%" : "-1px",
          }}
        />
        <div
          style={{
            width: 1,
            height: S.rootLineHeight,
            background: `${color}50`,
          }}
        />
      </div>

      {/* Category pill */}
      <motion.div
        className="font-mono font-bold uppercase rounded-lg whitespace-nowrap cursor-default"
        style={{
          fontSize: S.categoryFontSize,
          letterSpacing: "0.13em",
          padding: `${S.categoryPaddingY}px ${S.categoryPaddingX}px`,
          color,
          border: `1px solid ${color}45`,
          background: `${color}12`,
          boxShadow: `0 0 16px ${color}10`,
        }}
        whileHover={{ scale: 1.07, boxShadow: `0 0 22px ${color}28` }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
      >
        {category}
      </motion.div>

      {/* Drop to items */}
      <div
        style={{ width: 1, height: S.catLineHeight, background: `${color}38` }}
      />

      {/* Tech items */}
      <div className="relative">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{ width: 1, height: spineHeight, background: `${color}25` }}
        />

        <div className="flex flex-col items-center">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="relative flex items-center"
              style={{ height: S.techItemHeight }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.08 + i * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Tick from spine */}
              <div
                className="absolute left-1/2 -translate-x-full"
                style={{
                  width: S.techTickWidth,
                  height: 1,
                  background: `${color}45`,
                }}
              />

              {/* Badge */}
              <motion.div
                className="flex items-center rounded-lg"
                style={{
                  gap: S.techGap,
                  paddingLeft: S.techPaddingX + S.techTickWidth,
                  paddingRight: S.techPaddingX,
                  paddingTop: S.techPaddingY,
                  paddingBottom: S.techPaddingY,
                  background: `${color}08`,
                  border: `1px solid ${color}20`,
                }}
                whileHover={
                  {
                    x: 5,
                    background: `${color}18`,
                    borderColor: `${color}40`,
                  } as any
                }
                transition={{ duration: 0.15 }}
              >
                <span
                  className="font-mono text-white/70 whitespace-nowrap"
                  style={{ fontSize: S.techFontSize }}
                >
                  {tech.name}
                </span>
                <span
                  className="font-mono rounded-md flex-shrink-0 font-semibold"
                  style={{
                    fontSize: S.badgeFontSize,
                    padding: "3px 7px",
                    background: `${color}18`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {tech.years}y
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile: Accordion Card ───────────────────────────────────────────────────
function MobileCard({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  const [open, setOpen] = useState(true);
  const techs = getTechByCategory(category);
  const color = CATEGORY_COLORS[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${color}28`, background: `${color}06` }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          {/* Color dot */}
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
          />
          <span
            className="font-mono font-bold uppercase tracking-widest"
            style={{ fontSize: 13, color }}
          >
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-mono rounded-full px-2 py-0.5"
            style={{ fontSize: 11, background: `${color}18`, color }}
          >
            {techs.length}
          </span>
          <motion.span
            className="text-white/30"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: 12 }}
          >
            ▼
          </motion.span>
        </div>
      </button>

      {/* Items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mx-5 mb-4"
              style={{ borderLeft: `1px solid ${color}28`, paddingLeft: 16 }}
            >
              {techs.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center justify-between py-2.5"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    borderBottom:
                      i < techs.length - 1 ? `1px solid ${color}12` : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-shrink-0"
                      style={{ width: 10, height: 1, background: `${color}45` }}
                    />
                    <span
                      className="font-mono text-white/65"
                      style={{ fontSize: 14 }}
                    >
                      {tech.name}
                    </span>
                  </div>
                  <span
                    className="font-mono font-semibold rounded-md"
                    style={{
                      fontSize: 11,
                      padding: "3px 8px",
                      background: `${color}18`,
                      color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {tech.years}y
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const Tech = forwardRef((_props, ref: any) => {
  const total = TECH_CATEGORIES.length;

  return (
    <section
      id="tech"
      ref={ref}
      className="py-32 relative px-6 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-violet-500/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="text-center lg:mb-10">
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
              Tools &amp; <span className="text-gradient">Technologies</span>
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

          {/* ══════════════════════════════════════════════════════════
              DESKTOP TREE (lg+)
          ══════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block">
            {/* Root node centered */}
            <div className="flex flex-col items-center">
              {/* Vertical drop from root */}
              <motion.div
                style={{
                  width: 1,
                  height: S.rootLineHeight,
                  background: "rgba(96,165,250,0.4)",
                }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.35, delay: 0.45 }}
                viewport={{ once: true }}
              />
            </div>

            {/* Branches */}
            <div className="grid grid-cols-5 gap-4">
              {TECH_CATEGORIES.map((cat, i) => (
                <VerticalBranch
                  key={cat}
                  category={cat}
                  index={i}
                  total={total}
                />
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              TABLET (md–lg): 2-col simplified tree
          ══════════════════════════════════════════════════════════ */}
          <div className="hidden md:block lg:hidden">
            <div className="flex flex-col items-center mb-10"></div>
            <div className="grid grid-cols-2 gap-4">
              {TECH_CATEGORIES.map((cat, i) => (
                <MobileCard key={cat} category={cat} index={i} />
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              MOBILE (<md): Accordion cards
          ══════════════════════════════════════════════════════════ */}
          <div className="md:hidden">
            {/* Compact root node */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative flex items-center justify-center"
                style={{ width: 90, height: 45 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(96,165,250,0.18)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            <div className="flex flex-col gap-3">
              {TECH_CATEGORIES.map((cat, i) => (
                <MobileCard key={cat} category={cat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Tech.displayName = "Tech";
export default Tech;
