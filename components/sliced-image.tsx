"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface SlicedImageProps {
  src: string
  alt: string
  className?: string
  orientation?: "vertical" | "horizontal"
  slices?: number
  children?: React.ReactNode
  [key: string]: any
}

export function SlicedImage({ 
  src, 
  alt, 
  className = "", 
  orientation = "vertical", 
  slices = 5,
  children,
  ...props 
}: SlicedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create the sliced image wrap
    const wrap = document.createElement('div')
    wrap.className = 'sliced-image-wrap'
    wrap.style.setProperty('--slices', slices.toString())
    
    // Create slices
    for (let i = 0; i < slices; i++) {
      const slice = document.createElement('div')
      slice.className = 'sliced-image-slice'
      slice.style.backgroundImage = `url(${src})`
      slice.style.transitionDelay = `${i * 0.05}s`
      wrap.appendChild(slice)
    }
    
    container.appendChild(wrap)

    return () => {
      if (container.contains(wrap)) {
        container.removeChild(wrap)
      }
    }
  }, [src, slices])

  return (
    <div
      ref={containerRef}
      className={`sliced-image-container ${className}`}
      data-orientation={orientation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="sliced-image-overlay"></div>
      {children}
    </div>
  )
}
