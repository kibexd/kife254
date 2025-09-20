"use client"

import { useEffect, useRef } from "react"

interface CharShuffleProps {
  text: string
  className?: string
  shuffleType?: "default" | "project"
  [key: string]: any
}

export function CharShuffle({ 
  text, 
  className = "", 
  shuffleType = "default",
  ...props 
}: CharShuffleProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into characters
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span')
      span.className = 'char'
      span.textContent = char === ' ' ? '\u00A0' : char // Use non-breaking space for spaces
      span.style.animationDelay = `${index * 0.05}s`
      return span
    })

    // Clear container and add characters
    container.innerHTML = ''
    chars.forEach(char => container.appendChild(char))

    return () => {
      container.innerHTML = text
    }
  }, [text])

  return (
    <div
      ref={containerRef}
      className={`char-shuffle ${shuffleType === "project" ? "project-card-text" : ""} ${className}`}
      {...props}
    >
      {text}
    </div>
  )
}
