"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const techEmojis = ["✨", "💻", "🚀", "⚡", "🔥", "🌐", "🛠️", "🔧", "📱", "🤖", "🧠", "🔍"]

export function AnimatedEmoji() {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % techEmojis.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentEmojiIndex}
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="inline-block animate-bounce"
      >
        {techEmojis[currentEmojiIndex]}
      </motion.span>
    </AnimatePresence>
  )
}
