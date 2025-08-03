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
  const [isGlitching, setIsGlitching] = useState(false)

  const handleHoverStart = () => {
    setIsHovered(true)
    setIsGlitching(true)
    // Stop glitch after animation completes
    setTimeout(() => setIsGlitching(false), 200)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    setIsGlitching(true)
    // Stop glitch after animation completes
    setTimeout(() => setIsGlitching(false), 200)
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? "swahili" : "english"}
          initial={{ 
            y: 5, 
            opacity: 0,
            rotateX: 10
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotateX: 0
          }}
          exit={{ 
            y: -5, 
            opacity: 0,
            rotateX: -10
          }}
          transition={{ 
            duration: 0.15, 
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={`block transition-all duration-150 ${
            isGlitching ? "text-transition-glitch" : ""
          }`}
        >
          {isHovered ? swahiliText : englishText} {emoji && <span className="ml-1">{emoji}</span>}
        </motion.span>
      </AnimatePresence>
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          boxShadow: isHovered 
            ? '0 0 8px rgba(var(--primary), 0.6), 0 0 16px rgba(var(--primary), 0.4)' 
            : 'none'
        }}
      />
    </div>
  )
}
