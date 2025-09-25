'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Move cursor immediately
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
        ease: "none"
      })
    }

    const animateFollower = () => {
      // Smooth follow animation
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      gsap.set(follower, {
        x: followerX,
        y: followerY
      })

      requestAnimationFrame(animateFollower)
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3
      })
    }

    const handleMouseDown = () => {
      cursor.dataset.variant = cursor.dataset.variant === 'interactive' ? 'interactive-active' : 'active'
      follower.dataset.variant = cursor.dataset.variant
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1
      })
      gsap.to(follower, {
        scale: 1.2,
        duration: 0.1
      })
    }

    const handleMouseUp = () => {
      cursor.dataset.variant = cursor.dataset.variant?.includes('interactive') ? 'interactive' : 'default'
      follower.dataset.variant = cursor.dataset.variant
      gsap.to(cursor, {
        scale: 1,
        duration: 0.1
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.1
      })
    }

    // Add hover effects for interactive elements
    const handleHoverableEnter = (e: Event) => {
      if (cursor) {
        const el = e.currentTarget as Element
        cursor.dataset.variant = el && el.matches('input, textarea, select') ? 'crosshair' : 'interactive'
      }
      follower.dataset.variant = cursor.dataset.variant
      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.2
      })
      gsap.to(follower, {
        scale: 1.3,
        duration: 0.2
      })
    }

    const handleHoverableLeave = () => {
      if (cursor) cursor.dataset.variant = 'default'
      follower.dataset.variant = 'default'
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.2
      })
    }

    // Dynamic event listener for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, nav a, header a, [data-interactive]')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleHoverableEnter)
        el.addEventListener('mouseleave', handleHoverableLeave)
      })
      return interactiveElements
    }

    const removeHoverListeners = (elements: NodeListOf<Element>) => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter)
        el.removeEventListener('mouseleave', handleHoverableLeave)
      })
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Initial setup of hover effects
    let interactiveElements = addHoverListeners()

    // Re-scan for new interactive elements periodically (for dynamic content)
    const rescanInterval = setInterval(() => {
      removeHoverListeners(interactiveElements)
      interactiveElements = addHoverListeners()
    }, 1000)

    // Start follower animation
    animateFollower()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)

      removeHoverListeners(interactiveElements)
      clearInterval(rescanInterval)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fx-cursor fixed top-0 left-0 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 99999
        }}
        data-variant="default"
      />
      
      {/* Follower circle */}
      <div
        ref={followerRef}
        className="fx-follower fixed top-0 left-0 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 99998
        }}
      />
    </>
  )
}
