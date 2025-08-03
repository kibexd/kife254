'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScrolling() {
  const smoothScrollRef = useRef<number>(0)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Smooth scrolling implementation
      let currentY = 0
      let targetY = 0
      let ease = 0.08

      const smoothScrollTo = (target: number) => {
        targetY = target
      }

      const updateScroll = () => {
        currentY += (targetY - currentY) * ease
        window.scrollTo(0, currentY)
        
        if (Math.abs(targetY - currentY) > 0.1) {
          requestAnimationFrame(updateScroll)
        }
      }

      // Handle wheel events for smooth scrolling
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetY += e.deltaY * 1.2
        targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight))
        updateScroll()
      }

      // Handle anchor link clicks
      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLAnchorElement
        const href = target.getAttribute('href')
        
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
            smoothScrollTo(targetPosition)
            updateScroll()
          }
        }
      }

      // Add event listeners
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('click', handleAnchorClick)

      // Initialize scroll position
      currentY = window.pageYOffset
      targetY = currentY

      // GSAP scroll animations
      const initScrollAnimations = () => {
        // Fade in animations
        gsap.utils.toArray('.fade-in').forEach((element: any, index) => {
          gsap.fromTo(element, 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        })

        // Slide in from left
        gsap.utils.toArray('.slide-in-left').forEach((element: any, index) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              x: -120,
              rotationY: -15
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 1.4,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        })

        // Slide in from right
        gsap.utils.toArray('.slide-in-right').forEach((element: any, index) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              x: 120,
              rotationY: 15
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 1.4,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        })

        // Scale animations
        gsap.utils.toArray('.scale-in').forEach((element: any, index) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              scale: 0.7,
              rotationZ: -5
            },
            {
              opacity: 1,
              scale: 1,
              rotationZ: 0,
              duration: 1.6,
              ease: "elastic.out(1, 0.6)",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        })
      }

      // Initialize animations
      initScrollAnimations()

      // Custom scrollbar
      const initCustomScrollbar = () => {
        const scrollIndicator = document.createElement('div')
        scrollIndicator.className = 'scroll-indicator'
        scrollIndicator.style.cssText = `
          position: fixed;
          top: 0;
          right: 0;
          width: 4px;
          height: 100vh;
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          z-index: 9990;
          pointer-events: none;
          border-radius: 2px;
        `
        
        const scrollProgress = document.createElement('div')
        scrollProgress.style.cssText = `
          width: 100%;
          height: 0%;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
          transition: box-shadow 0.3s ease;
        `
        
        scrollIndicator.appendChild(scrollProgress)
        document.body.appendChild(scrollIndicator)

        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: self => {
            gsap.to(scrollProgress, {
              height: `${self.progress * 100}%`,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      }

      initCustomScrollbar()

      return () => {
        document.removeEventListener('wheel', handleWheel)
        document.removeEventListener('click', handleAnchorClick)
      }
    })

    return () => ctx.revert()
  }, [])

  return null
}
