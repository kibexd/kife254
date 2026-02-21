"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const techEmojis = [
  // Dev fundamentals
  "⚡", "💻", "🚀", "🔥", "🌐", "🤖", "🧠",
  // Code & tools
  "{ }", "< />", "🛠️", "🔧", "⚙️", "🔩", "🧩",
  // Data & AI
  "📡", "🔬", "🧬", "📊", "📈", "🗄️", "☁️",
  // Security & infra
  "🔐", "🛡️", "🔑", "🖧", "🏗️", "🐳", "🐧",
  // Devices & signals
  "📱", "🖥️", "⌨️", "🕹️", "📡", "💾", "💿",
  // Fun / vibe
  "✨", "🌟", "💡", "🎯", "🏆", "🎮", "🔮",
]

export function AnimatedEmoji() {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [manualGlitch, setManualGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)

      // Change emoji at peak of glitch so the swap is hidden inside the distortion
      setTimeout(() => {
        setCurrentEmojiIndex((prev) => (prev + 1) % techEmojis.length)
      }, 150)

      // Hold glitch for full animation duration
      setTimeout(() => {
        setIsGlitching(false)
      }, 550)
    }, 2500) // Change every 2.5 seconds so glitch is more frequent

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
        initial={{ opacity: 0, scale: 0.6, y: -12 }}
        animate={{ opacity: 1, scale: 1,   y: 0 }}
        exit={{    opacity: 0, scale: 1.3,  y: 12 }}
        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={handleClick}
        className={cn(
          "inline-block cursor-pointer select-none leading-none",
          (isGlitching || manualGlitch) && "glitch-emoji cyber-glitch"
        )}
        style={{
          transformOrigin: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
        }}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
      >
        {techEmojis[currentEmojiIndex]}
      </motion.span>
    </AnimatePresence>
  )
}
