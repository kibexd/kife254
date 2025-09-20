"use client"

import React from "react"

export function MarqueeBanner() {
  const marqueeText = "Enock Kibe • Full Stack Developer • Business Central Expert • Tech Enthusiast • ERP Systems Specialist • Web Development • Cybersecurity Enthusiast •"

  return (
    <>
      <div 
        className="marquee-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '40px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 25%, #92400e 50%, #7f1d1d 75%, #064e3b 100%)',
          backgroundSize: '400% 400%',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          animation: 'gradient-flow 8s ease infinite'
        }}
      >
        {/* Grainy overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '120px',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        
        <div 
          className="marquee-content"
          style={{
            display: 'flex',
            animation: 'marquee-scroll 40s linear infinite',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            position: 'relative',
            zIndex: 2
          }}
        >
          <span 
            className="marquee-text"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              marginRight: '6rem',
              flexShrink: 0
            }}
          >
            {marqueeText}
          </span>
          <span 
            className="marquee-text marquee-duplicate"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              marginRight: '6rem',
              flexShrink: 0
            }}
          >
            {marqueeText}
          </span>
          <span 
            className="marquee-text marquee-duplicate"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              marginRight: '6rem',
              flexShrink: 0
            }}
          >
            {marqueeText}
          </span>
          <span 
            className="marquee-text marquee-duplicate"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.5px',
              marginRight: '6rem',
              flexShrink: 0
            }}
          >
            {marqueeText}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Light mode gradient */
        :global(.light) .marquee-container {
          background: linear-gradient(135deg, #3730a3 0%, #7c2d12 25%, #be123c 50%, #be185d 75%, #166534 100%) !important;
          background-size: 400% 400% !important;
          animation: gradient-flow 8s ease infinite !important;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .marquee-container {
            height: 35px !important;
          }
          
          .marquee-text {
            font-size: 12px !important;
            margin-right: 3rem !important;
          }
          
          .marquee-duplicate {
            margin-right: 3rem !important;
          }
        }
      `}</style>
    </>
  )
}
