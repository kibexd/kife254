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
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  return (
    <PageContainer>
      <section className="container pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight group">
              <AnimatedText englishText="Hi there" swahiliText="Habari" className="group-hover:text-primary" />
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
                  //emoji="😊"
                  className="inline-block group-hover:text-primary"
                  delay={0.2}
                />
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-md">
              Full Stack Developer specializing in Business Central 365, front-end web development, and ERP systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="apple-button glow-effect">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="apple-button glow-effect" onClick={() => setShowCVPreview(true)}>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
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

          <div
            className="relative w-full max-w-md h-[400px] mx-auto md:ml-auto fade-in profile-image-container rounded-3xl overflow-hidden border"
            style={{ animationDelay: "0.2s" }}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <AnimatePresence mode="wait">
              {isImageHovered ? (
                <motion.div
                  key="alternate-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0"
                >
                  <img
                  src="/dp2.jpg"
                  alt="Enock Kibe - Coding"
                  className="w-full h-full object-cover profile-image"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="main-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0"
                >
                  <img
                    src="/dp1.jpg"
                    alt="Enock Kibe"
                    className="w-full h-full object-cover profile-image"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <QuoteDisplay />
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Latest Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Workers Rights Watch Website", image: "/wrw1.jpg", link: "https://workers-rights-watch-website.vercel.app" },
              { title: "Umithio Consultancy Website", image: "/umithio.png", link: "/projects" },
              { title: "Ivy's Website", image: "/ivy2.jpg?height=300&width=400", link: "/projects" },
              { title: "Decentralized Voting System", image: "/votez.png?height=300&width=400", link: "/projects" },
            ].map((project, index) => (
              <Link href={project.link} key={index} className="group">
                <div className="bg-card rounded-lg overflow-hidden border hover-lift">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">View project details</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
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
