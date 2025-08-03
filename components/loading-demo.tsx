'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PageLoader } from '@/components/page-loader'

export function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('Homepage')

  const triggerLoading = (pageName: string) => {
    setCurrentPage(pageName)
    setIsLoading(true)
  }

  const handleComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={() => triggerLoading('Homepage')}
          variant="outline"
          className="cyber-glitch-hover bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/50 hover:border-blue-400 transition-all duration-300"
        >
          🏠 Demo Homepage Loading
        </Button>
        <Button 
          onClick={() => triggerLoading('About Page')}
          variant="outline"
          className="cyber-glitch-hover bg-gradient-to-r from-purple-500/10 to-orange-500/10 border-purple-400/50 hover:border-purple-400 transition-all duration-300"
        >
          👋 Demo About Loading
        </Button>
        <Button 
          onClick={() => triggerLoading('Projects Page')}
          variant="outline"
          className="cyber-glitch-hover bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/50 hover:border-orange-400 transition-all duration-300"
        >
          🚀 Demo Projects Loading
        </Button>
        <Button 
          onClick={() => triggerLoading('Contact Page')}
          variant="outline"
          className="cyber-glitch-hover bg-gradient-to-r from-red-500/10 to-blue-500/10 border-red-400/50 hover:border-red-400 transition-all duration-300"
        >
          📧 Demo Contact Loading
        </Button>
      </div>
      
      <PageLoader 
        isLoading={isLoading}
        pageName={currentPage}
        onComplete={handleComplete}
      />
    </div>
  )
}
