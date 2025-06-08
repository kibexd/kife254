"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type LayoutMode = "standard" | "sidebar"

interface LayoutContextType {
  layoutMode: LayoutMode
  toggleLayout: () => void
  isTransitioning: boolean
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const savedLayout = localStorage.getItem("layoutMode") as LayoutMode | null
    if (isMobile) {
      setLayoutMode("standard")
    } else if (savedLayout) {
      setLayoutMode(savedLayout)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("layoutMode", layoutMode)
    }
  }, [layoutMode, isMobile])

  const toggleLayout = () => {
    if (!isMobile) {
      setLayoutMode((prev) => (prev === "standard" ? "sidebar" : "standard"))
    }
  }

  return (
    <LayoutContext.Provider value={{ layoutMode, toggleLayout, isTransitioning }}>{children}</LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
