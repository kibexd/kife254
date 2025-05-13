"use client"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Camera,
  Film,
  BookOpen,
  Play,
  ExternalLink,
  ShoppingCart,
  Code,
  Heart,
  BookIcon as Bible,
  Coffee,
  Brain,
  ShieldAlert,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ImageGallery } from "@/components/image-gallery"
import { VideoPlayer } from "@/components/video-player"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InterestsPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const photos = [
    {
      title: "Urban Utility and Nature",
      description:
        "A wooden electric pole intertwined with lush greenery, blending urban infrastructure with natural surroundings.",
      image: "/pole.jpg?height=400&width=600",
      category: "Landscape",
      gallery: [
        "/pole.jpg?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      title: "Skateboarding in the Suburbs",
      description:
        "A young skateboarder performing a trick on a quiet, sunlit suburban road, capturing the spirit of freedom and motion.",
      image: "/sb.jpg?height=400&width=600",
      category: "Wildlife",
      gallery: [
        "/sb.JPG?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      title: "Evening Drive",
      description:
        "A car cruising down a tranquil, tree-lined road under the bright evening sun, reflecting a peaceful journey.",
      image: "/ed.JPG?height=400&width=600",
      category: "Nature",
      gallery: [
        "/ed.jpg?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
        // "/placeholder.svg?height=800&width=1200",
      ],
    },
    // {
    //   title: "Street Photography",
    //   description:
    //     "Urban life in downtown Nairobi. This candid shot captures the energy and vibrancy of city life in Kenya's capital.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   category: "Street",
    //   gallery: [
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //   ],
    // },
    // {
    //   title: "Mountain Hike",
    //   description:
    //     "View from Mt. Kenya during a hiking expedition. The challenging climb was rewarded with this breathtaking panorama of the surrounding landscape.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   category: "Adventure",
    //   gallery: [
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //   ],
    // },
    // {
    //   title: "Cultural Festival",
    //   description:
    //     "Traditional dancers at a local cultural festival. The colorful costumes and energetic performances showcase Kenya's rich cultural heritage.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   category: "Culture",
    //   gallery: [
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //     "/placeholder.svg?height=800&width=1200",
    //   ],
    // },
  ]

  const videos = [
    {
      title: "Coding Time-lapse",
      description:
        "A day of coding compressed into 2 minutes. Watch as a complete web application takes shape from the first line of code to the final deployment.",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
      duration: "2:15",
      category: "Tech",
    },
    {
      title: "Kenya Travel Vlog",
      description:
        "Exploring the beautiful landscapes of Kenya. Join me on a journey through national parks, beaches, and vibrant cities in this travel documentary.",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
      duration: "8:42",
      category: "Travel",
    },
    {
      title: "Web Development Tutorial",
      description:
        "Building a responsive website from scratch. This step-by-step tutorial covers HTML, CSS, and JavaScript fundamentals for beginners.",
      thumbnail: "/placeholder.svg?height=400&width=600",
      videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
      duration: "15:30",
      category: "Education",
    },
  ]

  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "/placeholder.svg?height=400&width=300",
      description: "A handbook of agile software craftsmanship.",
      category: "Programming",
      buyLink: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
      readMoreLink: "https://www.goodreads.com/book/show/3735293-clean-code",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/placeholder.svg?height=400&width=300",
      description: "An easy & proven way to build good habits & break bad ones.",
      category: "Self-Improvement",
      buyLink: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
      readMoreLink: "https://www.goodreads.com/book/show/40121378-atomic-habits",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      cover: "/placeholder.svg?height=400&width=300",
      description: "Your journey to mastery in software development.",
      category: "Programming",
      buyLink: "https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X",
      readMoreLink: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer",
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      cover: "/placeholder.svg?height=400&width=300",
      description: "A deep dive into the two systems that drive the way we think.",
      category: "Psychology",
      buyLink: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
      readMoreLink: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
    },
  ]

  const articles = [
    {
      title: "Understanding Business Central Development",
      excerpt: "A comprehensive guide to developing extensions for Microsoft Dynamics 365 Business Central.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Business Central",
      tags: ["BC", "ERP", "Development"],
      date: "March 15, 2025",
      readTime: "12 min read",
    },
    {
      title: "Python for Data Analysis: A Beginner's Guide",
      excerpt: "Learn how to use Python libraries like Pandas and NumPy for effective data analysis and visualization.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Python",
      tags: ["Python", "Data Science", "Programming"],
      date: "February 28, 2025",
      readTime: "10 min read",
    },
    {
      title: "Software Design Patterns Explained",
      excerpt: "An overview of essential design patterns that every developer should know to write maintainable code.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Software Fundamentals",
      tags: ["Design Patterns", "Architecture", "Best Practices"],
      date: "February 10, 2025",
      readTime: "15 min read",
    },
    {
      title: "Mindfulness and Productivity in Software Development",
      excerpt: "How practicing mindfulness can improve focus, reduce stress, and boost productivity for developers.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Health & Wellbeing",
      tags: ["Mindfulness", "Productivity", "Mental Health"],
      date: "January 25, 2025",
      readTime: "8 min read",
    },
    {
      title: "Financial Planning for Tech Professionals",
      excerpt:
        "Strategic approaches to managing finances, investments, and planning for the future in the tech industry.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Wealth",
      tags: ["Finance", "Investment", "Planning"],
      date: "January 15, 2025",
      readTime: "11 min read",
    },
    {
      title: "Finding Purpose Through Faith in a Digital World",
      excerpt: "Reflections on maintaining spiritual grounding while navigating the fast-paced tech industry.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Biblical",
      tags: ["Faith", "Purpose", "Balance"],
      date: "January 5, 2025",
      readTime: "9 min read",
    },
    {
      title: "Introduction to Machine Learning with TensorFlow",
      excerpt: "A beginner-friendly guide to understanding and implementing machine learning models using TensorFlow.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Machine Learning",
      tags: ["AI", "TensorFlow", "Data Science"],
      date: "April 5, 2025",
      readTime: "14 min read",
    },
    {
      title: "Practical Cybersecurity Tips for Developers",
      excerpt:
        "Essential security practices every developer should implement to protect their applications from common threats.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Cybersecurity",
      tags: ["Security", "Hacking", "Protection"],
      date: "March 28, 2025",
      readTime: "11 min read",
    },
    {
      title: "Linux Command Line Mastery",
      excerpt: "Become proficient with the Linux terminal by learning essential commands and productivity shortcuts.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Linux",
      tags: ["Command Line", "Shell", "Ubuntu"],
      date: "March 20, 2025",
      readTime: "13 min read",
    },
  ]

  const verses = [
    {
      verse:
        "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11",
      reflection: "This verse reminds me that even in uncertainty, there is a divine plan for my life and career.",
    },
    {
      verse: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      reference: "Colossians 3:23",
      reflection: "A guiding principle for my professional ethics and approach to every project I undertake.",
    },
    {
      verse: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.",
      reference: "Proverbs 9:10",
      reflection: "This verse grounds my pursuit of knowledge and reminds me that true wisdom comes from God.",
    },
    {
      verse:
        "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5-6",
      reflection: "When facing difficult decisions in life or work, this verse reminds me to seek divine guidance.",
    },
  ]

  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const filterArticles = (category) => {
    if (category === "all") return articles
    return articles.filter((article) => article.category === category)
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Interests</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              A collection of things I enjoy outside of coding - photography, videos, books, and articles that inspire
              me.
            </p>
          </div>

          <Tabs defaultValue="photos" className="fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="photos">
                  <Camera className="h-4 w-4 mr-2" />
                  Photos
                </TabsTrigger>
                {/* <TabsTrigger value="videos">
                  <Film className="h-4 w-4 mr-2" />
                  Videos
                </TabsTrigger> */}
                {/* <TabsTrigger value="books">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Books
                </TabsTrigger> */}
                {/* <TabsTrigger value="articles">
                  <Code className="h-4 w-4 mr-2" />
                  Articles
                </TabsTrigger> */}
                <TabsTrigger value="verses">
                  <Bible className="h-4 w-4 mr-2" />
                  Verses
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="photos" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="group interest-item cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover hover-image"
                      />
                      <div className="absolute inset-0 interest-overlay flex flex-col justify-end p-4">
                        <span className="inline-block text-xs font-medium bg-black/60 text-white backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 w-fit">
                          {photo.category}
                        </span>
                        <h3 className="font-medium text-white">{photo.title}</h3>
                        <p className="text-xs text-white/80 mt-1">Click to view gallery</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <div key={index} className="group interest-item">
                    {selectedVideo === video ? (
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <VideoPlayer src={video.videoSrc} poster={video.thumbnail} />
                      </div>
                    ) : (
                      <div
                        className="aspect-video relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover hover-image"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-14 w-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                            <Play className="h-6 w-6 ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 interest-overlay flex flex-col justify-end p-4">
                          <span className="inline-block text-xs font-medium bg-black/60 text-white backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 w-fit">
                            {video.category}
                          </span>
                          <h3 className="font-medium text-white">{video.title}</h3>
                          <p className="text-xs text-white/80 mt-1">Click to play</p>
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="books" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <div key={index} className="group book-card">
                    <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-md hover-image-container">
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover hover-image"
                      />
                      <div className="absolute inset-0 interest-overlay flex flex-col justify-end p-4">
                        <span className="inline-block text-xs font-medium bg-black/60 text-white backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 w-fit">
                          {book.category}
                        </span>
                        <h3 className="font-medium text-white">{book.title}</h3>
                        <p className="text-xs text-white/80 mt-1">by {book.author}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                      <div className="mt-3 book-links flex gap-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={book.readMoreLink} target="_blank" className="flex items-center justify-center">
                            <ExternalLink className="mr-1 h-3 w-3" /> Read More
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={book.buyLink} target="_blank" className="flex items-center justify-center">
                            <ShoppingCart className="mr-1 h-3 w-3" /> Buy
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-0">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === "Business Central" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Business Central")}
                    className="rounded-full"
                  >
                    <Code className="mr-1 h-3 w-3" /> Business Central
                  </Button>
                  <Button
                    variant={selectedCategory === "Python" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Python")}
                    className="rounded-full"
                  >
                    <Code className="mr-1 h-3 w-3" /> Python
                  </Button>
                  <Button
                    variant={selectedCategory === "Software Fundamentals" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Software Fundamentals")}
                    className="rounded-full"
                  >
                    <Brain className="mr-1 h-3 w-3" /> Software Fundamentals
                  </Button>
                  <Button
                    variant={selectedCategory === "Machine Learning" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Machine Learning")}
                    className="rounded-full"
                  >
                    <Brain className="mr-1 h-3 w-3" /> Machine Learning
                  </Button>
                  <Button
                    variant={selectedCategory === "Cybersecurity" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Cybersecurity")}
                    className="rounded-full"
                  >
                    <ShieldAlert className="mr-1 h-3 w-3" /> Cybersecurity
                  </Button>
                  <Button
                    variant={selectedCategory === "Linux" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Linux")}
                    className="rounded-full"
                  >
                    <Terminal className="mr-1 h-3 w-3" /> Linux
                  </Button>
                  <Button
                    variant={selectedCategory === "Health & Wellbeing" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Health & Wellbeing")}
                    className="rounded-full"
                  >
                    <Heart className="mr-1 h-3 w-3" /> Health & Wellbeing
                  </Button>
                  <Button
                    variant={selectedCategory === "Wealth" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Wealth")}
                    className="rounded-full"
                  >
                    <Coffee className="mr-1 h-3 w-3" /> Wealth
                  </Button>
                  <Button
                    variant={selectedCategory === "Biblical" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Biblical")}
                    className="rounded-full"
                  >
                    <Bible className="mr-1 h-3 w-3" /> Biblical
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterArticles(selectedCategory).map((article, index) => (
                  <Card key={index} className="overflow-hidden hover-lift">
                    <div className="aspect-video relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verses" className="mt-0">
              <div className="space-y-6">
                {verses.map((verse, index) => (
                  <Card key={index} className="overflow-hidden hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Bible className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{verse.reference}</h3>
                      </div>
                      <blockquote className="border-l-4 border-primary/30 pl-4 italic mb-4">"{verse.verse}"</blockquote>
                      <p className="text-muted-foreground">{verse.reflection}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-muted-foreground mb-4">
              These are just a few of my interests. I'm always exploring new hobbies and passions.
            </p>
            <Button asChild variant="outline" className="apple-button">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {selectedImage && (
        <ImageGallery
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          images={selectedImage.gallery.map((img, i) => ({
            src: img,
            alt: `${selectedImage.title} - Image ${i + 1}`,
          }))}
          title={selectedImage.title}
          description={selectedImage.description}
          category={selectedImage.category}
        />
      )}
    </PageContainer>
  )
}
