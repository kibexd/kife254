"use client"

import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="bg-sky-200 p-2 rounded-md dark:bg-sky-900">
        <span className="font-semibold text-sky-800 dark:text-sky-200">Enock</span>
      </div>

      {/* 
      // CUSTOM LOGO (COMMENTED OUT FOR LOCAL IMPLEMENTATION)
      // To implement this locally:
      // 1. Add your logo image to the public folder
      // 2. Uncomment this code and replace the path
      
      <Image 
        src="/path-to-your-logo.png" 
        alt="Enock Kibe Logo" 
        width={40} 
        height={40} 
        className="rounded-md"
      />
      */}
    </Link>
  )
}
