'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  currentPage: string
  startLoading: (pageName: string) => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('')

  // Ensure loading is stopped on initial mount
  React.useEffect(() => {
    setIsLoading(false)
    setCurrentPage('')
  }, [])

  const startLoading = (pageName: string) => {
    setCurrentPage(pageName)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setCurrentPage('')
  }

  return (
    <LoadingContext.Provider value={{ isLoading, currentPage, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
