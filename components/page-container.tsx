"use client"

import type React from "react"
import { useLayout } from "@/contexts/layout-context"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"

interface PageContainerProps {
  children: React.ReactNode
  hideFooter?: boolean
}

export function PageContainer({ children, hideFooter = false }: PageContainerProps) {
  const { layoutMode } = useLayout()
  const pathname = usePathname()

  // Only render footer if not explicitly hidden
  const shouldRenderFooter = !hideFooter

  if (layoutMode === "sidebar") {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col sidebar-content">
          <main className="flex-1 pt-0 px-6">{children}</main>
          {shouldRenderFooter && (
            <div className="px-6">
              <Footer />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {shouldRenderFooter && <Footer />}
    </div>
  )
}
