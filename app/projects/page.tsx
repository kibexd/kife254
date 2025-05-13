"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ProjectsPage() {
  const [animateCount, setAnimateCount] = useState(false)
  const completedCountRef = useRef(null)
  const upcomingCountRef = useRef(null)
  const isCompletedInView = useInView(completedCountRef, { once: true, threshold: 0.5 })
  const isUpcomingInView = useInView(upcomingCountRef, { once: true, threshold: 0.5 })

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateCount(true)
  }, [])

  const completedProjects = [
    {
      title: "Voting System for Tea Planters Association",
      description: "Decentralized voting system for secure and transparent elections.",
      image: "/votez.png",
      category: "Web Development",
      date: "March 2024",
      status: "completed",
      link: "https://decentralizedvotingsystem.netlify.app/",
    },
    {
      title: "CheckInn Hotel System",
      description: "Comprehensive hotel management system for room bookings and guest management.",
      image: "/checkinn.png",
      category: "ERP Systems",
      date: "January 2024",
      status: "completed",
      link: "https://github.com/kibexd/Checkinn-Hms-",
    },
    {
      title: "Umithio Website",
      description: "Business consultancy website with modern design and lead generation features.",
      image: "/umithio.png?height=300&width=500",
      category: "Web Development",
      date: "December 2023",
      status: "completed",
      link: "https://umithio.netlify.app/", // No link provided in your prompt
    },
    {
      title: "Ivy's Fashion Website",
      description: "E-commerce platform for a fashion brand with product catalog and checkout.",
      image: "/ivy2.jpg?height=300&width=500",
      category: "Web Development",
      date: "October 2023",
      status: "completed",
      link: "https://ivyy.netlify.app/",
    },
    {
      title: "Hotel Management System",
      description: "Visual Basic application for hotel operations management.",
      image: "/htms.png?height=300&width=500",
      category: "ERP Systems",
      date: "August 2023",
      status: "completed",
      link: "https://github.com/kibexd/Hotel-Management-System-Visual-Basic-",
    },
  ]

  const upcomingProjects = [
    {
      title: "Kibe & Associates Website",
      description: "Professional website for a consultancy firm with service listings and contact forms.",
      image: "/kibe&.jpg?height=300&width=500",
      category: "Web Application Development",
      date: "Expected: June 2025",
      status: "upcoming",
      //link: "#",
    },
    {
      title: "Workers Rights Watch",
      description: "Web application for monitoring and reporting workers' rights violations.",
      image: "/wrw.jpg?height=300&width=500",
      category: "Mobile Development",
      date: "Expected: June 2025",
      status: "upcoming",
      //link: "#",
    },
  ]

  const allProjects = [...completedProjects, ...upcomingProjects]

  // Terminal-style counter animation
  const Counter = ({ value, className = "", delay = 0 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (animateCount) {
        let start = 0
        const end = Number.parseInt(value)
        const duration = 2000
        const increment = end / (duration / 30) // Update every 30ms

        setTimeout(() => {
          const timer = setInterval(() => {
            start += increment
            setCount(Math.floor(start))
            if (start >= end) {
              clearInterval(timer)
              setCount(end)
            }
          }, 30)

          return () => clearInterval(timer)
        }, delay)
      }
    }, [animateCount, value, delay])

    return (
      <div className={`terminal-counter ${className}`}>
        <span className="text-5xl font-bold">{count}</span>
        <span className="terminal-cursor">_</span>
      </div>
    )
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              A showcase of my work across web development and systems development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 fade-in" style={{ animationDelay: "0.2s" }}>
            <motion.div
              ref={completedCountRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isCompletedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/50 overflow-hidden rounded-lg border"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 terminal-counter-container">
                    <Counter value={completedProjects.length} />
                  </div>
                  <div className="text-xl font-semibold">Completed Projects</div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Successfully delivered projects with a focus on quality and client satisfaction
                  </p>
                </div>
              </CardContent>
            </motion.div>

            <motion.div
              ref={upcomingCountRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isUpcomingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-muted/50 overflow-hidden rounded-lg border"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 terminal-counter-container">
                    <Counter value={upcomingProjects.length} delay={500} />
                  </div>
                  <div className="text-xl font-semibold">Upcoming Projects</div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Exciting new projects in development, expanding into new technologies
                  </p>
                </div>
              </CardContent>
            </motion.div>
          </div>

          <Tabs defaultValue="all" className="fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="erp">ERP Systems</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover-lift hover-image-container project-card">
                      {project.status === "upcoming" && (
                        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                          Coming Soon
                        </div>
                      )}
                      <div className="aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover hover-image"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                                {project.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              {project.date}
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full apple-button glow-effect"
                            asChild
                          >
                            {project.link && project.link !== "#" ? (
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">View project</span>
                              </Link>
                            ) : (
                              <span className="text-muted-foreground text-xs">No Link</span>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover-lift hover-image-container project-card">
                      <div className="aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover hover-image"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                                {project.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              {project.date}
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full apple-button glow-effect"
                            asChild
                          >
                            {project.link && project.link !== "#" ? (
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">View project</span>
                              </Link>
                            ) : (
                              <span className="text-muted-foreground text-xs">No Link</span>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover-lift hover-image-container project-card">
                      <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                        Coming Soon
                      </div>
                      <div className="aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover hover-image"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                                {project.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              {project.date}
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full apple-button glow-effect"
                            asChild
                          >
                            {project.link && project.link !== "#" ? (
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">View project</span>
                              </Link>
                            ) : (
                              <span className="text-muted-foreground text-xs">No Link</span>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allProjects
                  .filter((p) => p.category === "Web Development")
                  .map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover-lift hover-image-container project-card">
                        {project.status === "upcoming" && (
                          <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                            Coming Soon
                          </div>
                        )}
                        <div className="aspect-video relative">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover hover-image"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                                  {project.category}
                                </span>
                              </div>
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-3">
                                <Calendar className="h-3 w-3 mr-1" />
                                {project.date}
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full apple-button glow-effect"
                              asChild
                            >
                              {project.link && project.link !== "#" ? (
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                  <ArrowUpRight className="h-4 w-4" />
                                  <span className="sr-only">View project</span>
                                </Link>
                              ) : (
                                <span className="text-muted-foreground text-xs">No Link</span>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="erp" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allProjects
                  .filter((p) => p.category === "ERP Systems")
                  .map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover-lift hover-image-container project-card">
                        {project.status === "upcoming" && (
                          <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                            Coming Soon
                          </div>
                        )}
                        <div className="aspect-video relative">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover hover-image"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                                  {project.category}
                                </span>
                              </div>
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-3">
                                <Calendar className="h-3 w-3 mr-1" />
                                {project.date}
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full apple-button glow-effect"
                              asChild
                            >
                              {project.link && project.link !== "#" ? (
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                  <ArrowUpRight className="h-4 w-4" />
                                  <span className="sr-only">View project</span>
                                </Link>
                              ) : (
                                <span className="text-muted-foreground text-xs">No Link</span>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageContainer>
  )
}
