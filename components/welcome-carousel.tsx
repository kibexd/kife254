"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedEmoji } from "@/components/animated-emoji"

const welcomeSlides = [
  {
    id: 1,
    title: "Welcome to My Journey! 🎉",
    subtitle: "Discover amazing projects and experiences",
    image: "/abstract.png",
    emoji: "👋"
  },
  {
    id: 2,
    title: "Full Stack Developer 💻",
    subtitle: "Specialized in Business Central 365 & Web Development",
    image: "/abstract.png",
    emoji: "🚀"
  },
  {
    id: 3,
    title: "Let's Build Something Amazing ⭐",
    subtitle: "Turning ideas into digital reality",
    image: "/abstract.png",
    emoji: "✨"
  }
]

export function WelcomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % welcomeSlides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % welcomeSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + welcomeSlides.length) % welcomeSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={welcomeSlides[currentSlide].image}
                alt={welcomeSlides[currentSlide].title}
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                    {welcomeSlides[currentSlide].title.replace(/[🎉💻⭐👋🚀✨]/g, "")}
                  </h1>
                  <motion.span
                    className="text-4xl md:text-6xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {welcomeSlides[currentSlide].emoji}
                  </motion.span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  {welcomeSlides[currentSlide].subtitle}
                </motion.p>

                {/* Floating Animated Emojis */}
                <div className="absolute top-10 left-10 opacity-70">
                  <AnimatedEmoji />
                </div>
                <div className="absolute top-20 right-16 opacity-60">
                  <motion.span
                    className="text-3xl"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🌟
                  </motion.span>
                </div>
                <div className="absolute bottom-16 left-20 opacity-50">
                  <motion.span
                    className="text-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      x: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    💫
                  </motion.span>
                </div>
                <div className="absolute bottom-20 right-12 opacity-60">
                  <motion.span
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    🎯
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-primary z-20"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-primary z-20"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {welcomeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary scale-110"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-primary text-xs"
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
        </Button>
      </div>
    </div>
  )
}
