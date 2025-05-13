"use client"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X, Calendar, MapPin, Briefcase, GraduationCap, Star } from "lucide-react"
import Image from "next/image"

interface CVPreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CVPreview({ open, onOpenChange }: CVPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm border-b">
          <DialogTitle className="text-xl">Enock Kibe - CV Preview</DialogTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" /> Close
            </Button>
            <Button size="sm" className="flex items-center gap-2" asChild>
              <a
                href="https://rxresu.me/kibexd/enock-kife-it-professional-cybersecurity-focus-safaricom-internship-applicant"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                <Image src="/dp.png?height=300&width=300" alt="Enock Kibe" fill className="object-cover" />
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Enock Kibe</h1>
              <h2 className="text-xl text-muted-foreground mb-4">Full Stack Developer</h2>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Available Immediately</span>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground">
                Passionate Full Stack Developer with expertise in Business Central 365, front-end web development, and
                ERP systems. Dedicated to creating efficient, user-friendly digital solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-primary" /> Technical Skills
                </h3>
                <div className="space-y-2">
                  {[
                    "Microsoft Dynamics Business Central",
                    "HTML, CSS, JavaScript",
                    "React.js, Next.js",
                    "REST APIs",
                    "SQL, Database Design",
                    "Docker basics",
                    "Git/GitHub",
                    "Windows/Linux Server Management",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-primary" /> Languages
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>English</span>
                    <span>Fluent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Swahili</span>
                    <span>Native</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-primary" /> Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <p>kibeenock7390@gmail.com</p>
                  <p>+254 736 663 656</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" /> Work Experience
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">Software Developer at Coretec Solutions Africa</h4>
                      <span className="text-sm text-muted-foreground">July 2024 - Present</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Muthangari Drive, Westlands</p>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Initially joined as Intern (July 2024 - September 2024), retained as Full-time Developer</li>
                      <li>
                        Assisted in the development of an Automated Inventory Management System using Microsoft Business
                        Central
                      </li>
                      <li>Gained hands-on experience with REST APIs development and integration</li>
                      <li>Contributed to the initial development of a Church Management System project</li>
                      <li>Learnt Docker containerization principles and basic implementation</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">Freelance Developer</h4>
                      <span className="text-sm text-muted-foreground">2021 - Present</span>
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Developed responsive websites for small businesses</li>
                      <li>Created custom management systems</li>
                      <li>Implemented secure authentication solutions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" /> Education
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">Bachelor of Science in Information Technology (BScIT)</h4>
                      <span className="text-sm text-muted-foreground">2020 - 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">KCA University, Nairobi</p>
                    <p className="text-sm text-muted-foreground">Graduation: November 29th 2024</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">Secondary Education (KCSE)</h4>
                      <span className="text-sm text-muted-foreground">2016 - 2019</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Nyangwa High School, Kiritiri Town, Embu County
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                  <Star className="h-5 w-5 mr-2 text-primary" /> Projects
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Umithio Consultancy Website</h4>
                    <p className="text-sm text-muted-foreground">
                      Business consultancy website with modern design and lead generation features.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Decentralized Voting System</h4>
                    <p className="text-sm text-muted-foreground">Secure and transparent voting system for elections.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm border-t">
          <DialogDescription>Download the full CV for complete details</DialogDescription>
          <Button size="sm" className="flex items-center gap-2" asChild>
            <a
              href="https://rxresu.me/kibexd/enock-kife-it-professional-cybersecurity-focus-safaricom-internship-applicant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
