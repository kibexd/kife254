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

export function AnimatedText({
  englishText,
  swahiliText,
  className = "",
  delay = 0,
  emoji = "",
}: AnimatedTextProps) {
  const [isHovered, setIsHovered]   = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  const triggerGlitch = () => {
    setIsGlitching(true)
    // CSS animation runs 2× at 0.36 s each (0.72 s total).
    // Add extra buffer for the framer-motion `delay` prop so even
    // delayed text swaps (e.g. "Enock Kibe" delay=0.2) stay glitchy
    // throughout the full transition.
    const hold = 750 + delay * 1200
    setTimeout(() => setIsGlitching(false), hold)
  }

  const handleHoverStart = () => {
    setIsHovered(true)
    triggerGlitch()
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    triggerGlitch()
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      // Remove underline-hover from parent text-hover class
      style={{ textDecoration: 'none' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? "swahili" : "english"}
          initial={{ opacity: 0, y: -8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y:  8, scale: 1.05 }}
          transition={{
            duration: 0.14,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`inline-block whitespace-nowrap${isGlitching ? " text-transition-glitch" : ""}`}
        >
          {isHovered ? swahiliText : englishText}
          {emoji && <span className="ml-1">{emoji}</span>}
        </motion.span>
      </AnimatePresence>
      {/* Underline intentionally removed — glitch effect replaces it */}
    </span>
  )
}
