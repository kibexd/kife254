"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, Sidebar } from "lucide-react"
import { useLayout } from "@/contexts/layout-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LayoutToggle() {
  const { layoutMode, toggleLayout } = useLayout()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleLayout} className="relative">
            {layoutMode === "standard" ? (
              <Sidebar className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <LayoutGrid className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle layout</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {layoutMode === "standard" ? "sidebar" : "standard"} layout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
