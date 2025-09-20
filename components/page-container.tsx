"use client"

import type React from "react"
import { useLayout } from "@/contexts/layout-context"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MarqueeBanner } from "@/components/marquee-banner"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  const { layoutMode, sidebarSide, isIlluminated } = useLayout()
  const pathname = usePathname()

  if (layoutMode === "sidebar") {
    return (
      <div
        className={cn(
          "flex min-h-screen",
          "transition-all duration-300",
          className
        )}
        data-illumination={isIlluminated ? "on" : "off"}
      >
        <MarqueeBanner />
        <Sidebar />
        <div className={cn(
          "flex-1 flex flex-col sidebar-content min-h-screen",
          sidebarSide === "left" ? "ml-64" : "mr-64"
        )}>
          <main className="flex-1 pt-0 min-h-screen">{children}</main>
          <Footer className="w-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        "transition-all duration-300",
        className
      )}
      data-illumination={isIlluminated ? "on" : "off"}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer className="w-full" />
    </div>
  )
}
