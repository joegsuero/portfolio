"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PixelTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function PixelText({ children, className = "", delay = 0 }: PixelTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`font-pixel relative ${className}`}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </motion.div>
  )
}

