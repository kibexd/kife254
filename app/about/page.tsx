"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Github,
  Linkedin,
  X,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Server,
  Globe,
  Shield,
  Code,
  Database,
  Cpu,
  Car,
  Brain,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { CVPreview } from "@/components/cv-preview"

// Interfaces defined at the top of the file
interface EducationItem {
  school: string
  years: string
  location: string
  degree: string
  description: string
  achievements: string[]
  website?: string
}

interface ExperienceItem {
  position: string
  company: string
  years: string
  location?: string
  website?: string
  description: string[]
  technologies?: string[]
  projects?: { name: string; url: string }[]
}

interface TechnicalSkill {
  category: string
  icon: React.ReactElement
  skills: string[]
}

interface CareerAspiration {
  title: string
  icon: React.ReactElement
}

interface ProjectSource {
  title: string
  projects?: { name: string; url: string }[]
  description?: string
  services?: string[]
}

interface SkillBarProps {
  skill: { name: string; level: number }
  index: number
}

interface TimelineItemProps {
  item: EducationItem | ExperienceItem
  index: number
  type: "education" | "experience"
}

interface SkillCategoryProps {
  category: string
  icon: React.ReactElement
  skills: string[]
  index: number
}

interface ProjectSourceProps {
  source: ProjectSource
  index: number
}

interface CareerAspirationProps {
  aspiration: CareerAspiration
  index: number
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("education")
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const educationItems = [
    {
      school: "KCA University",
      years: "2020 - 2024 (Graduation: November 29th 2024)",
      location: "Nairobi, Kenya",
      degree: "Bachelor of Science in Information Technology (BScIT)",
      description:
        "Studied information technology with a focus on software development, systems design, and IT infrastructure. Participated in various coding competitions and projects.",
      achievements: [
        "Dean's List for academic excellence",
        "Developed a hotel management system as capstone project",
        "Participated in hackathons and coding competitions",
        "Research assistant for faculty-led cybersecurity project",
      ],
      website: "https://www.kcau.ac.ke/",
    },
    {
      school: "Nyangwa High School",
      years: "2016 - 2019",
      location: "Kiritiri Town, Embu County",
      degree: "Secondary Education (KCSE)",
      description:
        "Completed secondary education with a focus on sciences and mathematics, laying the foundation for further technical studies.",
      achievements: [
        "Graduated with honors",
        "Participated in regional science competitions",
        "Led the computer club for 2 years",
        "Developed interest in programming through extracurricular activities",
      ],
    },
    // Commented out for future use
    /*
    {
      school: "Future University",
      years: "2025 - 2027",
      degree: "Master's in Cybersecurity",
      description: "Advanced studies in cybersecurity with focus on ethical hacking and security architecture.",
      achievements: [
        "Research on blockchain security",
        "Published paper on zero-trust architecture",
        "Teaching assistant for undergraduate courses",
        "Internship at major security firm"
      ]
    }
    */
  ]

  const experienceItems: ExperienceItem[] = [
    {
      position: "Software Developer",
      company: "Coretec Solutions Africa",
      years: "July 2024 - Present",
      location: "Muthangari Drive, Westlands",
      website: "https://coretecafrica.com",
      description: [
        "Initially joined as Intern (July 2024 - September 2024), retained as Full-time Developer",
        "Assisted in the development of an Automated Inventory Management System using Microsoft Business Central",
        "Gained hands-on experience with REST APIs development and integration",
        "Deployed Business Central with Docker and created pipelines in Azure DevOps (named 'deployments champion')",
        "Contributed to the initial development of a Church Management System project",
        "Learnt Docker containerization principles and basic implementation",
        "Practiced API testing using Postman",
        "Collaborated with the development team to understand business requirements and solution delivery",
      ],
      technologies: [
        "Microsoft Dynamics Business Central",
        "REST APIs",
        "Docker basics",
        "Postman for API testing",
        "Version Control using Git/GitHub",
      ],
    },
    {
      position: "Freelance Developer",
      company: "Self-employed",
      years: "2021 - Present",
      description: [
        "Developed responsive websites for small businesses and individuals",
        "Created custom management systems using Microsoft Dynamic Business Central",
        "Implemented secure authentication and database solutions",
        "Provided ongoing maintenance and support for client websites",
      ],
      projects: [
        {
          name: "Umithio Consultancy Website",
          url: "https://umithio.netlify.app/",
        },
        {
          name: "Ivy's Website",
          url: "https://ivyy.netlify.app/",
        },
        {
          name: "Decentralized Voting System (Work in Progress)",
          url: "https://decentralizedvotingsystem.netlify.app/",
        },
        {
          name: "Personal Portfolio Website",
          url: "https://kifee.netlify.app/",
        },
      ],
    },
    // Commented out for future use
    /*
    {
      position: "Senior Developer",
      company: "Future Tech Ltd",
      years: "2025 - Future",
      description: [
        "Leading development team for enterprise solutions",
        "Architecting cloud-native applications",
        "Implementing CI/CD pipelines",
        "Mentoring junior developers"
      ],
      technologies: ["Cloud Services", "Kubernetes", "Microservices", "DevOps"]
    }
    */
  ]

  const technicalSkills = [
    {
      category: "Enterprise Solutions",
      icon: <Server className="h-5 w-5 text-primary" />,
      skills: [
        "Microsoft Dynamics Business Central Development",
        "ERP System Implementation & Customization",
        "Business Process Automation",
        "System Integration & API Development",
      ],
    },
    {
      category: "Infrastructure & Support",
      icon: <Globe className="h-5 w-5 text-primary" />,
      skills: [
        "Network Administration & Troubleshooting",
        "Windows/Linux Server Management",
        "Hardware/Software Installation & Configuration",
        "System Security & Performance Optimization",
      ],
    },
    {
      category: "Basic Networking Knowledge",
      icon: <Shield className="h-5 w-5 text-primary" />,
      skills: [
        "Understanding of basic network concepts: TCP/IP, LAN/WAN",
        "Familiarity with common networking hardware (routers, switches)",
        "Basic Wi-Fi setup and troubleshooting",
        "General understanding of network security principles",
      ],
    },
    {
      category: "Development & Programming",
      icon: <Code className="h-5 w-5 text-primary" />,
      skills: [
        "HTML, CSS, JavaScript",
        "React.js, Next.js",
        "Working Knowledge of Web Development tools and IDE's (Visual Studio Code, Pulsar, Vim)",
        "Version Control using Git/GitHub",
      ],
    },
    {
      category: "Other Skills",
      icon: <Cpu className="h-5 w-5 text-primary" />,
      skills: [
        "IT Technical assistance and problem-solving",
        "Hardware/Software setup and Maintenance",
        "IT documentation development and project support",
        "IT technology trend analysis and recommendation",
        "Operating systems Installation and Deployment",
        "Network and server system management assistance",
        "Proficient in Linux/Windows Operating systems",
        "Working Knowledge of Google workspace, Microsoft 365, Adobe creative suite and Libre suite",
        "Fast typing skills - 40 words per minute",
        "Ability to learn quickly",
        "DIY Creations: Innovatively designed custom setups",
      ],
    },
    {
      category: "Additional Skills",
      icon: <Car className="h-5 w-5 text-primary" />,
      skills: ["Driving Experience: 2 years, 6 months plus of safe driving", "Possess a valid driving license"],
    },
  ]

  const careerAspirations = [
    { title: "IT Administration and Security", icon: <Shield className="h-5 w-5" /> },
    { title: "Cybersecurity", icon: <Shield className="h-5 w-5" /> },
    { title: "Prompt Engineering", icon: <Code className="h-5 w-5" /> },
    { title: "Backend Programming", icon: <Code className="h-5 w-5" /> },
    { title: "AI and Machine Learning", icon: <Brain className="h-5 w-5" /> },
    { title: "Database Development and maintenance", icon: <Database className="h-5 w-5" /> },
  ]

  const projectSources = [
    {
      title: "Academic Projects",
      projects: [
        {
          name: "Theta Hotel Management System",
          url: "https://github.com/kibexd/Hotel-Management-System-Visual-Basic-",
        },
        {
          name: "Check-inn Hotel Management System",
          url: "https://github.com/kibexd/Checkinn-Hms-",
        },
      ],
      description: "Two undergraduate course projects completed and submitted for marking.",
    },
    {
      title: "Professional Client Work",
      projects: [
        {
          name: "Umithio Consultancy Website",
          url: "https://umithio.netlify.app/",
        },
        {
          name: "Ivy's Website",
          url: "https://ivyy.netlify.app/",
        },
        {
          name: "Decentralized Voting System (Work in Progress)",
          url: "https://decentralizedvotingsystem.netlify.app/",
        },
        {
          name: "Personal Portfolio Website",
          url: "https://kifee.netlify.app/",
        },
      ],
    },
    {
      title: "Technical Support & Troubleshooting",
      description: "Provided technical assistance to schoolmates, parents, and friends.",
      services: [
        "Troubleshooting, diagnosing and fixing laptop/computer issues",
        "Debloating Windows installations",
        "Data recovery (retrieving deleted files from drives)",
        "Operating System setup and updates",
      ],
    },
  ]

  const SkillBar = ({ skill, index }: SkillBarProps) => {
    const barRef = useRef(null)
    const isInView = useInView(barRef, { once: false })

    return (
      <motion.div
        ref={barRef}
        className="fancy-skill-bar p-4 rounded-lg border bg-card"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="skill-icon-container w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{skill.name}</span>
          </div>
          <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
            {skill.level}%
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
          <div className="skill-dots absolute top-0 left-0 h-full w-full flex items-center">
            {[...Array(10)].map((_, i: number) => (
              <div
                key={i}
                className={`skill-dot h-1.5 w-1.5 rounded-full bg-white/50 absolute`}
                style={{ left: `${(i + 0.5) * 10}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {skill.name === "HTML, CSS, JavaScript" &&
            "Proficient in building responsive and interactive web interfaces."}
          {skill.name === "React.js, Next.js" &&
            "Experience with modern frontend frameworks and server-side rendering."}
          {skill.name === "Microsoft Dynamic Business Central" &&
            "Specialized in ERP solutions for business management."}
          {skill.name === "SQL, Database Design" &&
            "Skilled in designing efficient database schemas and writing complex queries."}
          {skill.name === "Visual Basic" && "Used for developing desktop applications and automation tools."}
          {skill.name === "Cybersecurity Fundamentals" &&
            "Knowledge of security best practices and vulnerability assessment."}
          {skill.name === "Problem Solving" &&
            "Analytical approach to identifying and resolving complex technical challenges."}
          {skill.name === "Project Management" &&
            "Experience in planning, executing, and delivering projects on schedule."}
          {skill.name === "Communication" && "Clear and effective communication with clients and team members."}
          {skill.name === "Time Management" &&
            "Efficient prioritization of tasks to meet deadlines and manage workload."}
          {skill.name === "Attention to Detail" && "Meticulous focus on quality and precision in all aspects of work."}
          {skill.name === "Continuous Learning" &&
            "Commitment to staying updated with the latest technologies and best practices."}
        </div>
      </motion.div>
    )
  }

  const TimelineItem = ({ item, index, type }: TimelineItemProps) => {
    const itemRef = useRef(null)
    const isInView = useInView(itemRef, { once: false })

    const Icon = type === "education" ? GraduationCap : Briefcase

    return (
      <motion.div
        ref={itemRef}
        className="timeline-item relative pl-10 pb-10 last:pb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div className="timeline-dot absolute left-0 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10">
          <Icon className="h-3 w-3 text-primary-foreground" />
        </div>

        {index !== (type === "education" ? educationItems.length - 1 : experienceItems.length - 1) && (
          <div className="timeline-line absolute left-3 top-6 w-0.5 h-full bg-muted">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </div>
        )}

        <div className="timeline-content bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-lg">
                {type === "education"
                  ? (item as EducationItem).school
                  : `${(item as ExperienceItem).position} at ${(item as ExperienceItem).company}`}
              </h3>
              <p className="text-sm text-primary font-medium">{item.years}</p>
              {item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline flex items-center gap-1 mt-1"
                >
                  <Globe className="h-3 w-3" /> {item.website}
                </a>
              )}
            </div>
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {type === "education" ? (item as EducationItem).degree : (item as ExperienceItem).position}
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            {typeof item.description === "string" ? item.description : item.description[0]}
          </p>

          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <Award className="h-4 w-4 mr-2 text-primary" />
              {type === "education" ? "Key Achievements" : "Responsibilities & Projects"}
            </h4>
            <ul className="space-y-2">
              {(() => {
                const detailsToMap: string[] = (() => {
                  if (type === "education") {
                    return (item as EducationItem).achievements;
                  } else {
                    const expItem = item as ExperienceItem;
                    if (Array.isArray(expItem.projects)) {
                      const projectsArray = expItem.projects;
                      return projectsArray.map(p => p.name);
                    } else if (Array.isArray(expItem.technologies)) {
                      return expItem.technologies;
                    } else if (Array.isArray(expItem.description)) {
                      return expItem.description.slice(1);
                    } else {
                      return []; // Fallback to empty array
                    }
                  }
                })();
                return detailsToMap.map((detail: string, i: number) => (
                  <motion.li
                    key={i}
                    className="fancy-list-item flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="relative">
                      <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-primary rounded-full animate-ping opacity-75"></div>
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-sm">{detail}</span>
                  </motion.li>
                ));
              })()}
            </ul>
          </div>
        </div>
      </motion.div>
    )
  }

  const SkillCategory = ({ category, icon, skills, index }: SkillCategoryProps) => {
    const categoryRef = useRef(null)
    const isInView = useInView(categoryRef, { once: false })

    return (
      <motion.div
        ref={categoryRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
          <h3 className="font-semibold text-lg">{category}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
          {skills.map((skill: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  const ProjectSource = ({ source, index }: ProjectSourceProps) => {
    const sourceRef = useRef(null)
    const isInView = useInView(sourceRef, { once: false })

    return (
      <motion.div
        ref={sourceRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-6"
      >
        <h3 className="font-semibold text-lg mb-2">{source.title}</h3>
        {source.projects && (
          <ul className="space-y-2 mb-2">
            {source.projects.map((project: { name: string; url: string }, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.name}
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
        {source.description && <p className="text-sm text-muted-foreground mb-2">{source.description}</p>}
        {source.services && (
          <ul className="space-y-1 pl-5">
            {source.services.map((service: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="list-disc text-sm text-muted-foreground"
              >
                {service}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    )
  }

  const CareerAspiration = ({ aspiration, index }: CareerAspirationProps) => {
    const aspirationRef = useRef(null)
    const isInView = useInView(aspirationRef, { once: false })

    return (
      <motion.div
        ref={aspirationRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-card rounded-lg border p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">{aspiration.icon}</div>
          <h3 className="font-medium">{aspiration.title}</h3>
        </div>
      </motion.div>
    )
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Full Stack Developer & Cybersecurity Enthusiast</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 fade-in" style={{ animationDelay: "0.2s" }}>
            <div
              className="relative w-full max-w-md h-[400px] mx-auto profile-image-container rounded-3xl overflow-hidden border"
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
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <img
                      src="/dp3.jpg"
                      alt="Enock Kibe - Coding"
                      className="w-full h-full object-cover profile-image"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="main-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 2, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <img
                      src="/kife.jpg"
                      alt="Enock Kibe"
                      className="w-full h-full object-cover profile-image"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold">Kife Mwenyewe</h2>

              <p className="text-muted-foreground">
                As a budding web developer, I've honed my skills in HTML, CSS, and JavaScript, showcasing my passion for
                creating engaging and functional web experiences. In addition to my coding-based education, I've taken
                the initiative to learn and grow continuously.
              </p>

              <p className="text-muted-foreground">
                Beyond web development, I'm currently exploring the world of cybersecurity, combining technical
                knowledge with ethical hacking. I'm dedicated to my craft and aim to create secure, efficient, and
                user-friendly digital experiences.
              </p>

              <div className="pt-4 flex gap-4">
                <Button asChild className="apple-button glow-effect">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" className="apple-button glow-effect" asChild>
                  <a
                    href="https://rxresu.me/kibexd/enock-kife-it-professional-cybersecurity-focus-safaricom-internship-applicant"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 pt-2">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="education"
            className="fade-in"
            style={{ animationDelay: "0.3s" }}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Project Sources</TabsTrigger>
                <TabsTrigger value="aspirations">Career Aspirations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="education" className="mt-0">
              <div className="timeline-container py-4" ref={ref}>
                {educationItems.map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} type="education" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-0">
              <div className="timeline-container py-4" ref={ref}>
                {experienceItems.map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} type="experience" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  {technicalSkills.map((category, index) => (
                    <SkillCategory
                      key={index}
                      category={category.category}
                      icon={category.icon}
                      skills={category.skills}
                      index={index}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  {projectSources.map((source, index) => (
                    <ProjectSource key={index} source={source} index={index} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aspirations" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Rocket className="h-5 w-5 mr-2 text-primary" /> Career Aspirations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {careerAspirations.map((aspiration, index) => (
                      <CareerAspiration key={index} aspiration={aspiration} index={index} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CVPreview open={showCVPreview} onOpenChange={setShowCVPreview} />
    </PageContainer>
  )
}
