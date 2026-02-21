"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, X, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { QuoteDisplay } from "@/components/quote-display"
import { AnimatedText } from "@/components/animated-text"
import { CVPreview } from "@/components/cv-preview"
import { useState } from "react"
import { AnimatedEmoji } from "@/components/animated-emoji"
import { LoadingDemo } from "@/components/loading-demo"
import { motion, AnimatePresence } from "framer-motion"

// Simple hover image component
type HoverImageProps = {
  src: string
  alt: string
  hoverSrc: string
  className?: string
  style?: React.CSSProperties
}

const HoverImage: React.FC<HoverImageProps> = ({ src, alt, hoverSrc, className, style }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className={className}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={isHovered ? hoverSrc : src}
        alt={alt}
        fill
        className="object-cover transition-all duration-500 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

export default function Home() {
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  return (
    <PageContainer>
      <style jsx global>{`
        main {
          padding-top: 0px !important;
          margin-top: 0px !important;
        }
        .sidebar-content {
          padding-top: 40px !important;
        }
        .glitch-line {
          animation: glitch 0.3s infinite;
        }
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <section 
        className="container pb-2 min-h-screen flex items-center"
        style={{ 
          paddingTop: '0px !important',
          marginTop: '0px !important',
          padding: '0px 0px 8px 0px !important'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center w-full">
          <div className="space-y-8 slide-in-left" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight group">
              <AnimatedText
                englishText="Hi there"
                swahiliText="Habari"
                className="group-hover:text-primary transition-all duration-300"
              />
              <span className="inline-block ml-2">
                <AnimatedEmoji />
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground group">
              <AnimatedText
                englishText="I'm"
                swahiliText="Naitwa"
                className="inline-block mr-2 group-hover:text-primary"
                delay={0.1}
              />
              <span className="text-foreground">
                <AnimatedText
                  englishText="Enock Kibe"
                  swahiliText="Kife (Kajobe)"
                  className="inline-block group-hover:text-primary"
                  delay={0.2}
                />
              </span>
            </h2>

            <p className="text-lg text-muted-foreground" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
              Full Stack Developer specializing in Business Central 365, front-end web development, and ERP systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4" style={{ justifyContent: 'center' }}>
              <Button asChild className="apple-button glow-effect rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-105">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="apple-button glow-effect rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-105 border-primary/30 hover:border-primary" onClick={() => setShowCVPreview(true)}>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>

            <div className="flex gap-6 pt-6" style={{ justifyContent: 'center' }}>
              <Link href="https://github.com/kibexd" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/kibe_xd" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                <X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://www.linkedin.com/in/enockkibe/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <HoverImage
            src="/kife 4k 1.jpeg"
            alt="Enock Kibe"
            hoverSrc="/kife 4k 1.jpeg"
            className="relative w-full max-w-sm h-[350px] mx-auto lg:ml-auto slide-in-right profile-image-container rounded-3xl overflow-hidden border-2"
            style={{ 
              animationDelay: "0.2s",
              isolation: "isolate"
            }}
          />
        </div>
      </section>

      <section className="bg-muted fade-in grainy-background py-12">
        <div className="w-full flex justify-center">
          <div className="max-w-4xl px-4">
            <div className="flex flex-col items-center justify-center text-center w-full">
              <QuoteDisplay />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-muted to-muted/50 grainy-background">
        <div className="container py-16">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold scale-in relative inline-block group cursor-pointer">
              Latest Projects
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full group-hover:shadow-lg group-hover:shadow-blue-500/50"></span>
            </h2>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
            {[
              { title: "Workers Rights Watch Website", image: "/wrw1.jpg", link: "https://workers-rights-watch-test.vercel.app", category: "Web Development", tags: "#react #nextjs" },
              { title: "Umithio Consultancy Website", image: "/umithio.png", link: "/projects", category: "Consulting", tags: "#business #website" },
              // { title: "Ivy's Website", image: "/ivy2.jpg", link: "/projects", category: "Portfolio", tags: "#personal #design" },
              { title: "Decentralized Voting System", image: "/votez.png", link: "/projects", category: "Blockchain", tags: "#voting #decentralized" },
            ].map((project, index) => (
              <Link href={project.link} key={index} className="group fade-in w-full sm:w-72 lg:w-72" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-slate-900/40">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image || "/placeholder.svg"})` }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-500" />
                  
                  {/* Glassmorphism panels - only visible on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Top-left panel */}
                    <div className="absolute top-3 left-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-lg">
                      <div className="text-white text-lg font-bold mb-1">{String(index + 1).padStart(2, '0')}</div>
                      <div className="text-white/80 text-xs font-medium">{project.tags}</div>
                    </div>
                    
                    {/* Top-right panel with icon */}
                    <div className="absolute top-3 right-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Bottom panel */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-lg">
                      <div className="text-white text-sm font-semibold mb-1">{project.category}</div>
                      <div className="text-white/80 text-xs font-medium truncate">{project.title}</div>
                    </div>
                  </div>
                  
                  {/* Default content - visible when not hovering */}
                  <div className="absolute bottom-3 left-3 right-3 group-hover:opacity-0 transition-opacity duration-500">
                    <div className="text-white text-sm font-semibold mb-1">{project.category}</div>
                    <div className="text-white/80 text-xs font-medium truncate">{project.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-3">
            <Button asChild variant="outline" className="apple-button glow-effect">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CVPreview open={showCVPreview} onOpenChange={setShowCVPreview} />
    </PageContainer>
  )
}