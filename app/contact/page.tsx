"use client"

import type React from "react"

import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Phone, Twitter, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setFormState("sending")

    // Simulate sending email for preview
    setTimeout(() => {
      console.log("Email sent to kibeenock7390@gmail.com", formData)
      setFormState("sent")

      // Reset form after a delay
      setTimeout(() => {
        setFormState("idle")
        setFormData({
          name: "",
          email: "",
          message: "",
        })
      }, 5000)
    }, 2000)

    /* 
    // ACTUAL EMAIL FUNCTIONALITY (COMMENTED OUT FOR LOCAL IMPLEMENTATION)
    // To implement this locally:
    // 1. Install nodemailer: npm install nodemailer
    // 2. Create a server action in app/actions/send-email.ts
    // 3. Uncomment and use this code:

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: "kibeenock2024@yahoo.com"
        }),
      });

      if (response.ok) {
        setFormState("sent");
        // Reset form after success
        setTimeout(() => {
          setFormState("idle");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }, 5000);
      } else {
        // Handle error
        console.error("Failed to send email");
        setFormState("idle");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setFormState("idle");
    }
    */
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Have a question or want to work together? Feel free to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 icon-hover" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a
                        href="mailto:kibeenock7390@gmail.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        kibeenock7390@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5 icon-hover" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a
                        href="tel:+254736663656"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +254 736 663 656
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 icon-hover" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-medium mb-3">Connect with me</h3>
                  <div className="flex gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 contact-form-container">
              <form
                onSubmit={handleSubmit}
                className={cn(
                  "contact-form space-y-6",
                  formState === "sending" && "sending",
                  formState === "sent" && "sent",
                )}
              >
                <div className="form-input-container">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input h-12 pl-3 pt-4 pb-2"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name" className="form-input-label">
                    Your name
                  </label>
                </div>

                <div className="form-input-container">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input h-12 pl-3 pt-4 pb-2"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="form-input-label">
                    Your email
                  </label>
                </div>

                <div className="form-input-container">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input pt-6 pl-3"
                    placeholder=" "
                    rows={6}
                    required
                  />
                  <label htmlFor="message" className="form-input-label">
                    Your message
                  </label>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full sm:w-auto send-button apple-button glow-effect",
                    formState === "sending" && "sending",
                  )}
                  disabled={formState !== "idle"}
                >
                  {formState === "idle" && (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 send-icon" />
                    </>
                  )}
                  {formState === "sending" && (
                    <>
                      Sending...
                      <Send className="ml-2 h-4 w-4 send-icon" />
                    </>
                  )}
                </Button>
              </form>

              <div className={cn("success-message", formState === "sent" && "visible")}>
                <div className="text-center p-8 bg-card rounded-lg border shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormState("idle")} className="apple-button glow-effect">
                    Send Another Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
