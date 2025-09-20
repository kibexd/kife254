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
                className="group-hover:text-primary transition-all duration-300 text-hover" 
              />
              <span className="inline-block ml-2">
                <AnimatedEmoji />
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground group">
              <AnimatedText
                englishText="I'm"
                swahiliText="Naitwa"
                className="inline-block mr-2 group-hover:text-primary text-hover"
                delay={0.1}
              />
              <span className="text-foreground">
                <AnimatedText
                  englishText="Enock Kibe"
                  swahiliText="Kife (Kajobe)"
                  className="inline-block group-hover:text-primary text-hover"
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
            src="/dp1.jpg"
            alt="Enock Kibe"
            hoverSrc="/dp2.jpg"
            className="relative w-full max-w-sm h-[350px] mx-auto lg:ml-auto slide-in-right profile-image-container rounded-3xl overflow-hidden border-2"
            style={{ 
              animationDelay: "0.2s",
              isolation: "isolate"
            }}
          />
        </div>
      </section>

      <section className="bg-muted fade-in grainy-background py-4">
        <div className="w-full flex justify-center">
          <div className="max-w-4xl px-4">
            <div className="flex flex-col items-center justify-center text-center w-full">
              <QuoteDisplay />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted grainy-background">
        <div className="container py-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 scale-in text-hover">Latest Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Workers Rights Watch Website", image: "/wrw1.jpg", link: "https://workers-rights-watch-website.vercel.app", category: "Web Development", tags: "#react #nextjs" },
              { title: "Umithio Consultancy Website", image: "/umithio.png", link: "/projects", category: "Consulting", tags: "#business #website" },
              { title: "Ivy's Website", image: "/ivy2.jpg?height=300&width=400", link: "/projects", category: "Portfolio", tags: "#personal #design" },
              { title: "Decentralized Voting System", image: "/votez.png?height=300&width=400", link: "/projects", category: "Blockchain", tags: "#voting #decentralized" },
            ].map((project, index) => (
              <Link href={project.link} key={index} className="group fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid-item-card bg-card rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl">
                  <div 
                    className="grid-item-img"
                    style={{ backgroundImage: `url(${project.image || "/placeholder.svg"})` }}
                  ></div>
                  <div className="grid-item-box grid-item-box--a">
                    <span className="grid-item-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="grid-item-tags">{project.tags}</span>
                  </div>
                  <div className="grid-item-box grid-item-box--b">
                    <span className="grid-item-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="grid-item-tags">{project.tags}</span>
                  </div>
                  <div className="grid-item-box grid-item-box--c">
                    <span className="grid-item-category">{project.category}</span>
                  </div>
                  <div className="grid-item-box grid-item-box--d">
                    <span className="grid-item-category">{project.category}</span>
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