"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Ensure we only render theme-dependent components after hydration
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Set default theme to dark if system preference is not available
  React.useEffect(() => {
    if (mounted) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const currentTheme = localStorage.getItem("theme")

      if (!currentTheme) {
        // If no theme is set, use system preference or default to dark
        const newTheme = systemPrefersDark ? "system" : "dark"
        localStorage.setItem("theme", newTheme)
      }
    }
  }, [mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
