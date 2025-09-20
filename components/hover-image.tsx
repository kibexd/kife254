"use client"

import { useState } from "react"
import Image from "next/image"

interface HoverImageProps {
  src: string
  alt: string
  hoverSrc?: string
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export function HoverImage({
  src,
  alt,
  hoverSrc,
  className = "",
  children,
  ...props
}: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`hover-image-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="hover-image-wrapper relative w-full h-full">
        <Image
          src={isHovered && hoverSrc ? hoverSrc : src}
          alt={alt}
          fill
          className="hover-image object-cover"
          sizes="(max-width: 768px) 32px, 32px"
        />
        {children}
      </div>
    </div>
  )
}