"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, X, CheckCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function BlogPage() {
  return (
    <PageContainer hideFooter={false}>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thoughts, insights, and updates on web development, cybersecurity, and more.
            </p>
          </div>

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

function EnhancedNewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      console.log("Subscribing email:", email)
      setIsSubscribed(true)
      // In a real implementation, you would send this to your backend
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="w-full max-w-md bg-card border rounded-lg p-6 shadow-lg"
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
            />
          </div>
          <Button type="submit" className="w-full apple-button glow-effect">
            <Mail className="mr-2 h-4 w-4" /> Subscribe
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
            }}
          >
            Subscribe another email
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
