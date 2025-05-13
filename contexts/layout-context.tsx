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

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem("layoutMode") as LayoutMode | null
    if (savedLayout) {
      setLayoutMode(savedLayout)
    }
  }, [])

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("layoutMode", layoutMode)
  }, [layoutMode])

  const toggleLayout = () => {
    // Simple toggle without animation to avoid issues
    setLayoutMode((prev) => (prev === "standard" ? "sidebar" : "standard"))
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
