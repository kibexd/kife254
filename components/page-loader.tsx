'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  pageName: string
  isLoading: boolean
  onComplete?: () => void
}

export function PageLoader({ pageName, isLoading, onComplete }: PageLoaderProps) {
  const [loadingText, setLoadingText] = useState('')
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    if (isLoading) {
      console.log(`PageLoader: Starting to load ${pageName}`)
      setLoadingText(`Loading ${pageName}`)
      
      // Trigger glitch effect intermittently
      const glitchInterval = setInterval(() => {
        setShowGlitch(true)
        setTimeout(() => setShowGlitch(false), 200)
      }, 800)

      const timer = setTimeout(() => {
        console.log('PageLoader: Auto-completing after timeout')
        if (onComplete) onComplete()
      }, 600) // Reduced from 1000ms to 600ms for faster loading

      // Safety mechanism - force stop after maximum time
      const safetyTimer = setTimeout(() => {
        console.log('PageLoader: Safety stop after maximum time')
        if (onComplete) onComplete()
      }, 1500) // Maximum 1.5 seconds

      return () => {
        clearInterval(glitchInterval)
        clearTimeout(timer)
        clearTimeout(safetyTimer)
      }
    } else {
      console.log('PageLoader: Not loading, resetting state')
      // Reset state when not loading
      setLoadingText('')
      setShowGlitch(false)
    }
  }, [isLoading, pageName, onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.2 } // Faster exit
          }}
          transition={{ duration: 0.2 }} // Faster entrance
          className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center space-y-8">
            {/* Custom Helix Loader */}
            <div className="helix-container">
              <div className="slice"></div>
              <div className="slice"></div>
              <div className="slice"></div>
              <div className="slice"></div>
              <div className="slice"></div>
              <div className="slice"></div>
            </div>

            {/* Loading Text with Glitch Effect */}
            <motion.div
              className={`text-2xl md:text-3xl font-bold text-center relative ${
                showGlitch ? 'loading-text-glitch' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              data-text={loadingText}
            >
              <span className="cyber-text">{loadingText}</span>
              <motion.span
                className="text-cyan-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 256 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
