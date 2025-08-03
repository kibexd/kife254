"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const techEmojis = ["✨", "💻", "🚀", "⚡", "🔥", "🌐", "🛠️", "🔧", "📱", "🤖", "🧠", "🔍"]

export function AnimatedEmoji() {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [manualGlitch, setManualGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger glitch effect before changing emoji
      setIsGlitching(true)
      
      setTimeout(() => {
        setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % techEmojis.length)
      }, 100) // Faster emoji change
      
      setTimeout(() => {
        setIsGlitching(false)
      }, 800) // Keep glitch visible longer
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    setManualGlitch(true)
    setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % techEmojis.length)
    
    setTimeout(() => {
      setManualGlitch(false)
    }, 800)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentEmojiIndex}
        initial={{ 
          opacity: 0, 
          rotateY: 90
        }}
        animate={{ 
          opacity: 1, 
          rotateY: 0
        }}
        exit={{ 
          opacity: 0, 
          rotateY: -90
        }}
        transition={{ 
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onClick={handleClick}
        className={cn(
          "inline-block transition-all duration-300 cursor-pointer select-none", 
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          "leading-none",
          (isGlitching || manualGlitch) && "glitch-emoji cyber-glitch"
        )}
        style={{
          transformOrigin: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
        }}
        whileHover={{ 
          scale: 1.05
        }}
        whileTap={{ 
          scale: 0.98
        }}
      >
        {techEmojis[currentEmojiIndex]}
      </motion.span>
    </AnimatePresence>
  )
}
