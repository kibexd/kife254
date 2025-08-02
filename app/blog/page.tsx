"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, X, CheckCircle, ChevronLeft, ChevronRight, BookOpen, Code, Shield, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BlogPage() {
  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              My thoughts, insights, and updates on web development, cybersecurity, and more.
            </p>
          </div>

          {/* Welcome Carousel */}
          <WelcomeCarousel />

          {/* Coming Soon Banner */}
          <div className="mb-16 fade-in" style={{ animationDelay: "0.1s" }}>
            <Card className="overflow-hidden border-primary/20">
              <div className="relative aspect-[21/9] bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Coming Soon
                  </motion.h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mb-6">
                    I'm working on exciting new content for my blog. Subscribe to my newsletter to be notified when new
                    articles are published.
                  </p>
                  <EnhancedNewsletterSubscription />
                </div>
              </div>
            </Card>
          </div>

          {/* Commented out blog content */}
          {/* 
          <div className="mb-16 fade-in" style={{ animationDelay: "0.2s" }}>
            <Link
              href={featuredPost.externalUrl || "/blog/post"}
              className="block group"
              target={featuredPost.externalUrl ? "_blank" : "_self"}
            >
              <Card className="overflow-hidden blog-card">
                <div className="aspect-[21/9] relative hover-image-container">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover hover-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <span className="inline-block text-xs font-medium bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-full mb-3">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:underline decoration-1 underline-offset-4">
                      {featuredPost.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <Tabs defaultValue="all" className="fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
                <TabsTrigger value="erp">ERP Systems</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, index) => (
                  <Link
                    href={post.externalUrl || "/blog/post"}
                    key={index}
                    className="group"
                    target={post.externalUrl ? "_blank" : "_self"}
                  >
                    <Card className="overflow-hidden blog-card h-full">
                      <div className="aspect-video relative hover-image-container">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover hover-image"
                        />
                      </div>
                      <CardContent className="p-6">
                        <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full mb-3">
                          {post.category}
                        </span>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {["web", "cybersecurity", "erp"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts
                    .filter((p) => {
                      if (category === "web") return p.category === "Web Development"
                      if (category === "cybersecurity") return p.category === "Cybersecurity"
                      if (category === "erp") return p.category === "ERP Systems"
                      return true
                    })
                    .map((post, index) => (
                      <Link
                        href={post.externalUrl || "/blog/post"}
                        key={index}
                        className="group"
                        target={post.externalUrl ? "_blank" : "_self"}
                      >
                        <Card className="overflow-hidden blog-card h-full">
                          <div className="aspect-video relative hover-image-container">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover hover-image"
                            />
                          </div>
                          <CardContent className="p-6">
                            <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full mb-3">
                              {post.category}
                            </span>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" className="apple-button glow-effect">
              <Link href="https://teknakife.netlify.app/" target="_blank">
                Load More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          */}
        </div>
      </section>
    </PageContainer>
  )
}

function WelcomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Welcome to My Blog! 📚",
      description: "Dive into insightful articles about web development, cybersecurity, and ERP systems. Your journey to better tech knowledge starts here.",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Full Stack Expertise 💻",
      description: "Explore cutting-edge web development techniques, best practices, and real-world solutions from my experience as a full-stack developer.",
      gradient: "from-green-500/20 to-blue-500/20"
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Cybersecurity Insights 🔐",
      description: "Stay ahead of digital threats with practical cybersecurity tips, security best practices, and insights into protecting your digital assets.",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Business Central & ERP 🏢",
      description: "Master Microsoft Dynamics 365 Business Central with expert insights, implementation strategies, and business automation solutions.",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-12 fade-in">
      <Card className="overflow-hidden border-primary/20 relative">
        <div className={`relative aspect-[21/9] bg-gradient-to-r ${slides[currentSlide].gradient}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="mb-6">
                {slides[currentSlide].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mb-6">
                {slides[currentSlide].description}
              </p>
              
              {/* Slide indicators */}
              <div className="flex gap-2 mb-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary scale-110' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

function EnhancedNewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    setErrorMessage("")
    
    try {
      const res = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setIsSubscribed(true)
      } else if (data.error === 'already_subscribed') {
        setErrorMessage(data.message)
      } else {
        setErrorMessage("Oops! Something went wrong. Please try again in a moment.")
      }
    } catch (error) {
      setErrorMessage("Hmm, we're having technical difficulties. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="w-full max-w-lg bg-card border rounded-lg p-8 shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Subscribe to Newsletter</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsVisible(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-input-container">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10"
              disabled={isLoading}
            />
          </div>
          
          {errorMessage && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-300">{errorMessage}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full apple-button glow-effect" 
            disabled={isLoading}
          >
            <Mail className="mr-2 h-4 w-4" /> 
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            No spam, just updates on new blog posts and tech insights.
          </p>
        </form>
      ) : (
        <motion.div
          className="text-center py-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <h4 className="text-lg font-medium mb-2">Thanks for subscribing!</h4>
          <p className="text-sm text-muted-foreground">You'll receive updates when new content is published.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setIsSubscribed(false)
              setEmail("")
              setErrorMessage("")
            }}
          >
            Subscribe another email
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}