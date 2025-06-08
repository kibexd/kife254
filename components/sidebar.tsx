"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen,
  Heart,
  LayoutGrid,
  Flag,
  Music,
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLayout } from "@/contexts/layout-context"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useRef, useEffect } from "react"
import { CVPreview } from "@/components/cv-preview"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

export function Sidebar() {
  const pathname = usePathname()
  const { toggleLayout, layoutMode } = useLayout()
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/interests", label: "Interests", icon: Heart },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  const tracks = [
    {
      name: "Ambient Lofi",
      artist: "Chill Beats",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      name: "Focus Flow",
      artist: "Ambient Minds",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      name: "Deep Concentration",
      artist: "Meditation Sounds",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Add a loading state indicator if needed
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              // Handle the error - maybe show a message to the user
              setIsPlaying(false)
            })
        }
      }
    }
  }

  const nextTrack = () => {
    const newTrackIndex = (currentTrack + 1) % tracks.length
    setCurrentTrack(newTrackIndex)

    // Reset the audio element to ensure it loads the new track
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0

      // Only try to play if it was already playing
      if (isPlaying) {
        setTimeout(() => {
          if (audioRef.current) {
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Error playing next track:", error)
                setIsPlaying(false)
              })
            }
          }
        }, 100) // Small delay to ensure the src has updated
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  if (layoutMode === "standard") {
    return null // Do not render sidebar in standard layout
  }

  return (
    <div className="h-screen w-64 border-r flex flex-col bg-card fixed left-0 top-0 z-40">
      <div className="p-6 flex flex-col items-center">
        <div
          className="relative w-32 h-32 overflow-hidden rounded-2xl mb-4 profile-image-container"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <AnimatePresence mode="wait">
            {isImageHovered ? (
              <motion.div
                key="alternate-profile"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <img
                  src="/dp1.jpg"
                  alt="Enock Kibe - Coding"
                  className="w-full h-full object-cover profile-image"
                />
              </motion.div>
            ) : (
              <motion.div
                key="main-profile"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <img
                  src="/kife2.png"
                  alt="Enock Kibe"
                  className="w-full h-full object-cover profile-image"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <h2 className="font-semibold text-lg">Enock Kibe</h2>
        <p className="text-xs text-muted-foreground">Full Stack Developer</p>

        <div className="flex gap-3 mt-3">
          <Link href="https://github.com/kibexd" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://x.com/kibe_xd" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://www.linkedin.com/in/enockkibe/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors icon-hover">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleLayout}
            className="h-8 w-8 transition-transform hover:scale-105 active:scale-95 icon-hover"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Switch to standard layout</span>
          </Button>
          <ModeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                  className="h-8 w-8 transition-transform hover:scale-105 active:scale-95 icon-hover"
                >
                  <Music className="h-4 w-4" />
                  <span className="sr-only">Music Player</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Play some beats</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="outline" size="sm" className="mt-4 w-full glow-effect" onClick={() => setShowCVPreview(true)}>
          <Download className="mr-2 h-3 w-3" /> Download CV
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors icon-link",
                    pathname === route.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <div className="kenya-flag-container relative flex items-center gap-1.5 group cursor-pointer">
            <span>254 Kenya</span>
            <Flag className="h-3 w-3 text-primary" />
            <span>2025</span>

            <div className="kenya-flag-colors absolute -inset-2 -z-10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-red-600 to-green-600 animate-gradient-x rounded-md blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Music Player */}
      <AnimatePresence>
        {showMusicPlayer && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -60, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-16 left-0 w-64 bg-card border rounded-t-lg shadow-lg p-3 z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium truncate max-w-[150px]">{tracks[currentTrack].name}</div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowMusicPlayer(false)}>
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-xs text-muted-foreground mb-2 truncate">{tracks[currentTrack].artist}</div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full music-player-button"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full music-player-button"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 music-player-button" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </Button>
                <div className="w-16">
                  <Slider
                    value={[volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer music-player-volume"
                  />
                </div>
              </div>
            </div>

            {/* Audio progress bar */}
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div className="music-player-progress h-full" style={{ width: `${isPlaying ? "50%" : "0%"}` }}></div>
            </div>

            <audio
              ref={audioRef}
              src={tracks[currentTrack].url}
              onEnded={nextTrack}
              preload="auto"
              onError={(e) => {
                console.error("Audio error:", e)
                setIsPlaying(false)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CVPreview open={showCVPreview} onOpenChange={setShowCVPreview} />
    </div>
  )
}
