import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Twitter, Facebook, Linkedin, LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function BlogPostPage() {
  const post = {
    title: "The Future of Web Development in 2025",
    date: "May 5, 2025",
    readTime: "8 min read",
    author: "Enock Kibe",
    authorRole: "Full Stack Developer",
    authorImage: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Web Development",
  }

  const relatedPosts = [
    {
      title: "Getting Started with Microsoft Dynamic Business Central",
      excerpt: "A comprehensive guide to setting up and using Microsoft's ERP solution.",
      date: "April 28, 2025",
      image: "/placeholder.svg?height=300&width=400",
      category: "ERP Systems",
    },
    {
      title: "Building Secure Authentication Systems",
      excerpt: "Best practices for implementing robust and secure user authentication.",
      date: "April 15, 2025",
      image: "/placeholder.svg?height=300&width=400",
      category: "Cybersecurity",
    },
  ]

  return (
    <PageContainer>
      <article className="container pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 fade-in">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>

            <span className="inline-block text-xs font-medium bg-secondary px-2.5 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="aspect-[21/9] relative rounded-lg overflow-hidden mb-10 hover-image-container">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover hover-image"
              />
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="lead">
                The web development landscape is constantly evolving, with new technologies, frameworks, and
                methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are poised to
                reshape how we build and interact with web applications.
              </p>

              <h2>The Rise of AI-Powered Development</h2>
              <p>
                Artificial intelligence is no longer just a buzzword in web development—it's becoming an integral part
                of the development process itself. From AI-assisted coding that can generate entire components based on
                natural language descriptions to intelligent debugging tools that can identify and fix issues before
                they reach production, developers are increasingly leveraging AI to boost productivity and code quality.
              </p>
              <p>
                By 2025, we expect to see AI-powered development tools become mainstream, with capabilities that extend
                beyond simple code completion to include:
              </p>
              <ul>
                <li>Automated testing and quality assurance</li>
                <li>Intelligent performance optimization</li>
                <li>Natural language interfaces for development workflows</li>
                <li>AI-driven design systems that adapt to user preferences</li>
              </ul>

              <h2>WebAssembly Reaches Maturity</h2>
              <p>
                WebAssembly (Wasm) has been gaining traction as a way to run high-performance code in the browser. As we
                move into 2025, WebAssembly is set to reach full maturity, enabling developers to build web applications
                that rival native apps in terms of performance and capabilities.
              </p>
              <p>
                The growing ecosystem around WebAssembly will make it easier to port existing applications to the web
                and to develop new types of applications that weren't previously possible in a browser environment. This
                includes:
              </p>
              <ul>
                <li>Complex data visualization and 3D rendering</li>
                <li>Resource-intensive simulations and calculations</li>
                <li>Advanced audio and video processing</li>
                <li>Games with near-native performance</li>
              </ul>

              <h2>The Serverless Evolution</h2>
              <p>
                Serverless architecture has already transformed how we think about backend development, but by 2025, we
                expect to see a more mature and sophisticated serverless ecosystem. This evolution will address many of
                the current limitations of serverless, such as cold starts, limited execution times, and complex state
                management.
              </p>
              <p>
                The next generation of serverless platforms will offer more flexibility and control while maintaining
                the core benefits of the serverless model: automatic scaling, reduced operational overhead, and
                pay-as-you-go pricing.
              </p>

              <h2>Conclusion</h2>
              <p>
                The future of web development in 2025 looks incredibly promising, with advancements in AI, WebAssembly,
                and serverless architecture leading the way. Developers who stay ahead of these trends will be
                well-positioned to build the next generation of web applications—applications that are faster, more
                intelligent, and more capable than ever before.
              </p>
              <p>
                As these technologies mature and converge, we'll see new possibilities emerge that we can't even imagine
                today. The web platform continues to evolve at a remarkable pace, and the next few years promise to be
                some of the most exciting in its history.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-b py-6 mt-10">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post, index) => (
                <Link href="/blog/post" key={index} className="group">
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
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </PageContainer>
  )
}
