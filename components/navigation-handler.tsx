'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLoading } from '@/contexts/loading-context'

const getPageName = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Homepage'
    case '/about':
      return 'About Page'
    case '/projects':
      return 'Projects Page'
    case '/blog':
      return 'Blog Page'
    case '/contact':
      return 'Contact Page'
    case '/interests':
      return 'Interests Page'
    default:
      if (pathname.startsWith('/blog/')) {
        return 'Blog Post'
      }
      return 'Page'
  }
}

export function NavigationHandler() {
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()
  const previousPathname = useRef<string>('')
  const isInitialLoad = useRef(true)
  const loadingTimer = useRef<NodeJS.Timeout | null>(null)

  // Force stop loading on mount
  useEffect(() => {
    stopLoading()
  }, [stopLoading])

  useEffect(() => {
    // Skip the initial load to prevent infinite loop
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      previousPathname.current = pathname
      // Force stop loading after initial load
      setTimeout(() => stopLoading(), 100)
      return
    }

    // Only trigger loading if pathname actually changed
    if (previousPathname.current !== pathname) {
      const pageName = getPageName(pathname)
      
      console.log(`Navigation: ${previousPathname.current} -> ${pathname}`)
      
      // Clear any existing timer
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current)
      }
      
      // Start loading when pathname changes
      startLoading(pageName)
      
      // Stop loading after a shorter duration since page is already loaded
      loadingTimer.current = setTimeout(() => {
        console.log('Stopping loading after timeout')
        stopLoading()
      }, 800) // Reduced from 1200ms to 800ms

      previousPathname.current = pathname

      return () => {
        if (loadingTimer.current) {
          clearTimeout(loadingTimer.current)
        }
      }
    }
  }, [pathname, startLoading, stopLoading])

  // Also stop loading when the document is ready/visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Document became visible, stopping loading')
        stopLoading()
      }
    }

    const handlePageShow = () => {
      console.log('Page show event, stopping loading')
      stopLoading()
    }

    const handleLoad = () => {
      console.log('Window load event, stopping loading')
      stopLoading()
    }

    const handleDOMContentLoaded = () => {
      console.log('DOM content loaded, stopping loading')
      stopLoading()
    }

    // Stop loading immediately if document is already loaded
    if (document.readyState === 'complete') {
      console.log('Document already complete, stopping loading')
      stopLoading()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)
    window.addEventListener('load', handleLoad)
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }
  }, [stopLoading])

  return null
}
