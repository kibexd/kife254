import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutProvider } from "@/contexts/layout-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Enock Kibe | Full Stack Developer & BC Technical Consultant",
  description:
    "Portfolio of Enock Kibe, a Full Stack Developer specializing in Microsoft Dynamics 365 Business Central, ERP systems, and web development.",
  keywords:
    "Enock Kibe, Web Developer, BC Technical Consultant, Software Developer Kenya, Microsoft Dynamics 365 Developer, ERP Systems Developer, Business Central Developer, Full Stack Developer, Nairobi Developer",
  authors: [{ name: "Enock Kibe" }],
  creator: "Enock Kibe",
  openGraph: {
    type: "website",
    url: "https://enock-kibe.vercel.app/",
    title: "Enock Kibe | Full Stack Developer & BC Technical Consultant",
    description:
      "Portfolio of Enock Kibe, a Full Stack Developer specializing in Microsoft Dynamics 365 Business Central, ERP systems, and web development.",
    siteName: "Enock Kibe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enock Kibe | Full Stack Developer & BC Technical Consultant",
    description:
      "Portfolio of Enock Kibe, a Full Stack Developer specializing in Microsoft Dynamics 365 Business Central, ERP systems, and web development.",
    creator: "@enock_kibe",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
