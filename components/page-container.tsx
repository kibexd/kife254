"use client"

import type React from "react"
import { useLayout } from "@/contexts/layout-context"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  const { layoutMode } = useLayout()
  const pathname = usePathname()

  if (layoutMode === "sidebar") {
    return (
      <div className={cn(
        "flex min-h-screen",
        "transition-all duration-300",
        className
      )}>
        <Sidebar />
        <div className="flex-1 flex flex-col sidebar-content">
          <main className="flex-1 pt-0">{children}</main>
          <Footer className="w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      "transition-all duration-300",
      className
    )}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer className="w-full" />
    </div>
  )
}
