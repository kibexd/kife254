'use client'

import { useLoading } from '@/contexts/loading-context'
import { PageLoader } from '@/components/page-loader'

export function PageLoaderWrapper() {
  const { isLoading, currentPage, stopLoading } = useLoading()
  
  return (
    <PageLoader 
      isLoading={isLoading}
      pageName={currentPage}
      onComplete={stopLoading}
    />
  )
}
