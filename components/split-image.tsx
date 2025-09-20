"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface SplitImageProps {
  src: string
  alt: string
  hoverSrc?: string
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export function SplitImage({ 
  src, 
  alt, 
  hoverSrc,
  className = "", 
  children,
  ...props 
}: SplitImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clean up any existing elements first
    const existingQuadrants = container.querySelectorAll('.quadrant')
    const existingOverlay = container.querySelector('.split-image-overlay')
    
    existingQuadrants.forEach(q => q.remove())
    if (existingOverlay) existingOverlay.remove()

    // Create the quadrant elements for hover effect - ONE image split into 4 parts
    const quadrants = [
      { class: 'quadrant-1', position: 'top left' },
      { class: 'quadrant-2', position: 'top right' },
      { class: 'quadrant-3', position: 'bottom left' },
      { class: 'quadrant-4', position: 'bottom right' }
    ]

    quadrants.forEach(({ class: className, position }) => {
      const quadrant = document.createElement('div')
      quadrant.className = `quadrant ${className}`
      quadrant.style.backgroundImage = `url(${hoverSrc || src})`
      quadrant.style.backgroundPosition = position
      quadrant.style.backgroundSize = '200% 200%' // This ensures the image is 2x size so each quadrant shows 1/4
      container.appendChild(quadrant)
    })

    return () => {
      // Clean up dynamically created elements
      const quadrants = container.querySelectorAll('.quadrant')
      
      quadrants.forEach(q => q.remove())
    }
  }, [src, hoverSrc])

  return (
    <div
      ref={containerRef}
      className={`split-image-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Default image - always visible */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ zIndex: 1 }}
      />
      {children}
    </div>
  )
}
