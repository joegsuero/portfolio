"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function PixelButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: PixelButtonProps) {
  const baseClasses =
    "font-pixel px-6 py-3 rounded-md transition-all relative overflow-hidden";

  const variantClasses = {
    primary: "bg-blue-800 hover:bg-blue-700 text-white",
    secondary: "border border-blue-800 text-blue-400 hover:bg-blue-900/30",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-0 hover:opacity-100 transition-opacity"></span>
    </motion.button>
  );
}
