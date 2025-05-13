"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
  },
]

export function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const intervalRef = useRef(null)

  // Function to change the quote
  const changeQuote = () => {
    setIsVisible(false)

    // After exit animation completes, change the quote
    setTimeout(() => {
      const nextIndex = (quoteIndex + 1) % quotes.length
      setQuoteIndex(nextIndex)
      setCurrentQuote(quotes[nextIndex])
      setIsVisible(true)
    }, 500)
  }

  useEffect(() => {
    // Change quote every hour
    intervalRef.current = setInterval(
      () => {
        changeQuote()
      },
      60 * 60 * 1000,
    ) // 1 hour in milliseconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [quoteIndex])

  // For demo purposes, you can uncomment this to change quotes more frequently
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     changeQuote()
  //   }, 5000) // Change every 5 seconds for demo
  //   return () => clearInterval(interval)
  // }, [quoteIndex])

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{
            rotate: isVisible ? [0, 10, 0] : 0,
            scale: isVisible ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Quote className="h-6 w-6 text-primary" />
        </motion.div>

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="quote-container"
            >
              <motion.blockquote
                className="text-xl md:text-2xl font-medium mb-4 max-w-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                "{currentQuote.text}"
              </motion.blockquote>

              <motion.cite
                className="text-muted-foreground block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                — {currentQuote.author}
              </motion.cite>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
