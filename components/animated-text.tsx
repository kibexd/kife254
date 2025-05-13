"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTextProps {
  englishText: string
  swahiliText: string
  className?: string
  delay?: number
  emoji?: string
}

export function AnimatedText({ englishText, swahiliText, className = "", delay = 0, emoji = "" }: AnimatedTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? "swahili" : "english"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, delay: delay }}
          className="block"
        >
          {isHovered ? swahiliText : englishText} {emoji && <span className="ml-1">{emoji}</span>}
        </motion.span>
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}
