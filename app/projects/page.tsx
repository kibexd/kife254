"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar, Zap, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Project {
  title: string
  description: string
  image: string
  category: string
  date: string
  status: "completed" | "upcoming"
  link?: string
}

// Category color config — solid tab colours + card glow
const CATEGORY_STYLE: Record<string, {
  tab: string       // solid bg + text for the folder tab
  dot: string       // pulse dot colour
  glow: string      // card hover shadow
  border: string    // card hover border tint
}> = {
  "Web Development":            { tab: "bg-blue-500 text-white",    dot: "bg-blue-300",    glow: "hover:shadow-blue-500/25",    border: "hover:border-blue-500/40"    },
  "ERP Systems":                { tab: "bg-emerald-600 text-white", dot: "bg-emerald-300", glow: "hover:shadow-emerald-500/25", border: "hover:border-emerald-500/40" },
  "Mobile Development":         { tab: "bg-purple-600 text-white",  dot: "bg-purple-300",  glow: "hover:shadow-purple-500/25",  border: "hover:border-purple-500/40"  },
  "Web Application Development":{ tab: "bg-amber-500 text-white",   dot: "bg-amber-300",   glow: "hover:shadow-amber-500/25",   border: "hover:border-amber-500/40"   },
  "Blockchain":                 { tab: "bg-orange-500 text-white",  dot: "bg-orange-300",  glow: "hover:shadow-orange-500/25",  border: "hover:border-orange-500/40"  },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const style = CATEGORY_STYLE[project.category] ?? {
    tab: "bg-zinc-600 text-white", dot: "bg-zinc-300", glow: "hover:shadow-zinc-500/25", border: "hover:border-zinc-500/40",
  }

  const inner = (
    // Outer wrapper adds top padding to make room for the folder-tab
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative pt-4"
    >
      {/* ── Folder-tab badge ── */}
      {/* Sits above the card like a physical folder tab, solid + clearly readable */}
      <div className={`absolute top-0 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-t-lg text-[11px] font-bold shadow-lg select-none ${style.tab}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
        {project.category}
      </div>

      {/* ── Card body ── */}
      <div className={`relative flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-card transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-2xl ${style.glow} ${style.border}`}>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* subtle bottom gradient so content area blends nicely */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />

          {/* Coming Soon — top right of image */}
          {project.status === "upcoming" && (
            <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full shadow-md animate-pulse">
              <Clock className="h-3 w-3" /> Coming Soon
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5 gap-3">
          <div>
            <h3 className="font-bold text-base leading-snug mb-1 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Calendar className="h-3 w-3" />
              {project.date}
            </div>
            {project.link && project.link !== "#" ? (
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="text-xs text-muted-foreground/50 italic">No link yet</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return project.link && project.link !== "#" ? (
    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  )
}

// Animated counter
function Counter({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const inc = value / (2000 / 30)
    const t = setTimeout(() => {
      const id = setInterval(() => {
        start += inc
        if (start >= value) { setCount(value); clearInterval(id) }
        else setCount(Math.floor(start))
      }, 30)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t)
  }, [inView, value, delay])

  return <span ref={ref}>{count}</span>
}

export default function ProjectsPage() {
  const [dateFilter, setDateFilter] = useState<"all" | "recent" | "older">("all")

  const completedProjects: Project[] = [
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
      link: "https://umithio.netlify.app/",
    },
    // {
    //   title: "Ivy's Fashion Website",
    //   description: "E-commerce platform for a fashion brand with product catalog and checkout.",
    //   image: "/ivy2.jpg?height=300&width=500",
    //   category: "Web Development",
    //   date: "October 2023",
    //   status: "completed",
    //   link: "https://ivyy.netlify.app/",
    // },
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

  const upcomingProjects: Project[] = [
    {
      title: "Kibe & Associates Website",
      description: "Professional website for a consultancy firm with service listings and contact forms.",
      image: "/kibe&.jpg?height=300&width=500",
      category: "Web Application Development",
      date: "Expected: June 2025",
      status: "upcoming",
    },
    {
      title: "Workers Rights Watch",
      description: "Web application for monitoring and reporting workers' rights violations.",
      image: "/wrw1.jpg?height=300&width=500",
      category: "Web Development",
      date: "Expected: June 2025",
      status: "upcoming",
      link: "https://workers-rights-watch-test.vercel.app",
    },
  ]

  const allProjects = [...completedProjects, ...upcomingProjects]

  const filterByDate = (projects: Project[]) => {
    if (dateFilter === "all") return projects
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - 6)
    return projects.filter((p) => {
      const d = new Date(p.date)
      return dateFilter === "recent" ? d >= cutoff : d < cutoff
    })
  }

  const Grid = ({ projects }: { projects: Project[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
      {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
    </div>
  )

  return (
    <PageContainer>
      <section className="container pt-28 pb-20 grainy-background">
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-14 fade-in">
            <div className="inline-flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/20">
              <Zap className="h-3 w-3" /> Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 leading-none">
              Projects
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
              A showcase of my work across web development and systems development.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 fade-in" style={{ animationDelay: "0.15s" }}>
            {/* Completed */}
            <div className="relative rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 overflow-hidden">
              <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-6xl font-black tabular-nums text-emerald-400">
                <Counter value={completedProjects.length} />
              </div>
              <p className="text-lg font-semibold mt-1">Completed Projects</p>
              <p className="text-muted-foreground text-sm mt-1">
                Delivered with a focus on quality and client satisfaction
              </p>
            </div>
            {/* Upcoming */}
            <div className="relative rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-transparent p-8 overflow-hidden">
              <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <div className="text-6xl font-black tabular-nums text-amber-400">
                <Counter value={upcomingProjects.length} delay={300} />
              </div>
              <p className="text-lg font-semibold mt-1">Upcoming Projects</p>
              <p className="text-muted-foreground text-sm mt-1">
                Exciting projects in development, expanding into new tech
              </p>
            </div>
          </div>

          {/* ── Tabs + filter ── */}
          <Tabs defaultValue="all" className="fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
              <TabsList className="rounded-xl">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="erp">ERP</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                {(["recent", "older"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={dateFilter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateFilter(dateFilter === f ? "all" : f)}
                    className="rounded-full text-xs apple-button"
                  >
                    {f === "recent" ? "Recent" : "Older"}
                  </Button>
                ))}
                {dateFilter !== "all" && (
                  <Button variant="ghost" size="sm" onClick={() => setDateFilter("all")} className="rounded-full text-xs">
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="all"       className="mt-0"><Grid projects={filterByDate(allProjects)} /></TabsContent>
            <TabsContent value="completed" className="mt-0"><Grid projects={completedProjects} /></TabsContent>
            <TabsContent value="upcoming"  className="mt-0"><Grid projects={upcomingProjects} /></TabsContent>
            <TabsContent value="web"       className="mt-0"><Grid projects={allProjects.filter(p => p.category === "Web Development")} /></TabsContent>
            <TabsContent value="erp"       className="mt-0"><Grid projects={allProjects.filter(p => p.category === "ERP Systems")} /></TabsContent>
          </Tabs>

        </div>
      </section>
    </PageContainer>
  )
}
