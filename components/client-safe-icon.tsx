"use client"

import { useEffect, useState } from "react"

interface HydrationSafeProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * A component that prevents hydration mismatches by only rendering
 * children on the client side. Useful for content that may be modified
 * by browser extensions like Dark Reader.
 */
export function HydrationSafe({ children, fallback }: HydrationSafeProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback || null
  }

  return <>{children}</>
}

/**
 * A wrapper specifically for icons that might be modified by browser extensions
 */
export function ClientSafeIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className} suppressHydrationWarning>
      {children}
    </span>
  )
}
