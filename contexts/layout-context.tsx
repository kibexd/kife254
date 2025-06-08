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

// Debounce utility function
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  // Initialize layoutMode to a server-safe default. It will be updated client-side.
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null means not determined yet

  useEffect(() => {
    // This effect runs only on the client after initial render
    const initialIsMobile = window.innerWidth < 768;
    setIsMobile(initialIsMobile);

    const savedLayout = localStorage.getItem("layoutMode") as LayoutMode | null;
    let initialLayout: LayoutMode;

    if (initialIsMobile) {
      initialLayout = "standard";
    } else {
      initialLayout = savedLayout || "sidebar"; // Default to sidebar if desktop and no saved preference
    }
    setLayoutMode(initialLayout);

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (isMobile !== currentIsMobile) { // Only update if mobile status actually changes
        setIsMobile(currentIsMobile);
      }
    };

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []); // Run only once on mount

  // Effect to update layoutMode when isMobile changes (after initial setup)
  useEffect(() => {
    // Only proceed if isMobile has been determined
    if (isMobile === null) return;

    let desiredLayout: LayoutMode;
    if (isMobile) {
      desiredLayout = "standard";
    } else {
      const savedLayout = localStorage.getItem("layoutMode") as LayoutMode | null;
      desiredLayout = savedLayout || "sidebar";
    }

    if (layoutMode !== desiredLayout) {
      setLayoutMode(desiredLayout);
    }
  }, [isMobile, layoutMode]); // Depend only on isMobile and layoutMode (for comparison)

  const toggleLayout = () => {
    // Only allow toggling if isMobile has been determined and it's not mobile
    if (isMobile !== null && !isMobile) {
      setLayoutMode((prev) => {
        const newMode = prev === "standard" ? "sidebar" : "standard";
        localStorage.setItem("layoutMode", newMode);
        return newMode;
      });
    }
  };

  return (
    <LayoutContext.Provider value={{ layoutMode, toggleLayout, isTransitioning }}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

