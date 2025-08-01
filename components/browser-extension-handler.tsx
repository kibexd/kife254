"use client"

import { useEffect } from "react"

/**
 * Component to handle browser extension compatibility and hydration issues
 */
export function BrowserExtensionHandler() {
  useEffect(() => {
    // Handle Dark Reader and other browser extensions that modify DOM
    const handleExtensionModifications = () => {
      // Override console.error temporarily to filter out known hydration warnings
      // caused by browser extensions during development
      if (process.env.NODE_ENV === "development") {
        const originalError = console.error
        console.error = (...args) => {
          // Filter out specific hydration warnings caused by Dark Reader
          const message = args[0]
          if (
            typeof message === "string" &&
            (message.includes("data-darkreader-inline") ||
             message.includes("A tree hydrated but some attributes of the server rendered HTML didn't match") ||
             message.includes("--darkreader-inline"))
          ) {
            // Optionally log a more user-friendly message
            console.warn("Browser extension detected - some styling differences are expected")
            return
          }
          // Call original console.error for other messages
          originalError.apply(console, args)
        }

        // Restore original console.error after a delay
        setTimeout(() => {
          console.error = originalError
        }, 5000)
      }
    }

    // Run the handler
    handleExtensionModifications()

    // Clean up any extension-added attributes that might cause issues
    const cleanupExtensionAttributes = () => {
      const elements = document.querySelectorAll("[data-darkreader-inline-stroke], [data-darkreader-inline-fill], [data-darkreader-inline-color]")
      elements.forEach((element) => {
        // Don't remove the attributes, just ensure they don't cause layout issues
        const computedStyle = window.getComputedStyle(element)
        if (computedStyle.position === "static") {
          // Add a class to mark as extension-modified for CSS targeting
          element.classList.add("extension-modified")
        }
      })
    }

    // Run cleanup periodically to handle dynamically added content
    const cleanupInterval = setInterval(cleanupExtensionAttributes, 1000)

    return () => {
      clearInterval(cleanupInterval)
    }
  }, [])

  return null
}
