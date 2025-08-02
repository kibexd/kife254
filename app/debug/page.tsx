"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { Badge } from "@/components/ui/badge"
import { formatKenyanTime } from "@/lib/time-utils"
import { LoginPage } from "@/components/admin-login"
import { LogOut } from "lucide-react"

export default function DebugPage() {
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [envCheck, setEnvCheck] = useState<any>(null)
  const [subscribersData, setSubscribersData] = useState<any>(null)
  const [storageInfo, setStorageInfo] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check environment and system status
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem("debug_authenticated") === "true"
      setIsAuthenticated(isAuth)
      setCheckingAuth(false)
    }
    
    checkAuth()
  }, [])

  // Load data only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      checkEnvironment()
      fetchSubscribers()
      checkStorageInfo()
    }
  }, [isAuthenticated])

  const handleLogin = (success: boolean) => {
    if (success) {
      sessionStorage.setItem("debug_authenticated", "true")
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("debug_authenticated")
    setIsAuthenticated(false)
  }

  // Show login page if not authenticated
  if (checkingAuth) {
    return (
      <PageContainer>
        <section className="container pt-32 pb-20">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">Checking authentication...</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </PageContainer>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} authType="debug" />
  }

  const checkEnvironment = async () => {
    try {
      const res = await fetch("/api/debug/env")
      const data = await res.json()
      setEnvCheck(data)
    } catch (error) {
      setEnvCheck({ error: "Failed to check environment" })
    }
  }

  const checkStorageInfo = async () => {
    try {
      const res = await fetch("/api/debug/storage")
      const data = await res.json()
      setStorageInfo(data)
    } catch (error) {
      setStorageInfo({ error: "Failed to check storage info" })
    }
  }

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers")
      const data = await res.json()
      setSubscribersData(data)
    } catch (error) {
      setSubscribersData({ error: "Failed to fetch subscribers" })
    }
  }

  const forceCleanData = async () => {
    try {
      const res = await fetch("/api/admin/subscribers?deleteAll=true", {
        method: 'DELETE'
      })
      const data = await res.json()
      
      if (res.ok) {
        await fetchSubscribers() // Refresh the data
        await checkStorageInfo() // Refresh storage info
        setResponse({ 
          status: res.status, 
          data: { 
            success: true, 
            message: "All subscriber data cleared from Vercel Blob storage!" 
          } 
        })
      } else {
        setResponse({ status: res.status, data })
      }
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'Failed to clean data' })
    }
  }

  const testSubscription = async () => {
    if (!email) return
    
    setLoading(true)
    setResponse(null)
    
    try {
      const res = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      setResponse({ status: res.status, data })
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header with Logout */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">🔧 Debug Panel</CardTitle>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </CardHeader>
          </Card>
          
          {/* Environment Check */}
          <Card>
            <CardHeader>
              <CardTitle>🔧 Environment Status</CardTitle>
            </CardHeader>
            <CardContent>
              {envCheck ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Badge variant={envCheck.emailConfigured ? "default" : "destructive"}>
                        Email: {envCheck.emailConfigured ? "✅ Configured" : "❌ Missing"}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant={envCheck.blobConfigured ? "default" : "destructive"}>
                        Blob Storage: {envCheck.blobConfigured ? "✅ Configured" : "❌ Missing Token"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Storage Type:</strong> {envCheck.storageType || "unknown"} 
                    {envCheck.migration && (
                      <span className="text-green-600 dark:text-green-400"> (migrated from file storage)</span>
                    )}
                  </div>
                  {envCheck.error && (
                    <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                      {envCheck.error}
                    </div>
                  )}
                </div>
              ) : (
                <div>Loading environment check...</div>
              )}
            </CardContent>
          </Card>

          {/* Storage Information */}
          <Card>
            <CardHeader>
              <CardTitle>💾 Storage Information</CardTitle>
            </CardHeader>
            <CardContent>
              {storageInfo ? (
                <div className="space-y-2">
                  {storageInfo.error ? (
                    <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      {storageInfo.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Badge variant={storageInfo.storageInfo?.canWriteToFileSystem ? "default" : "secondary"}>
                            File System: {storageInfo.storageInfo?.canWriteToFileSystem ? "✅ Writable" : "❌ Read-Only (Expected)"}
                          </Badge>
                        </div>
                        <div>
                          <Badge variant={storageInfo.storageInfo?.available ? "default" : "destructive"}>
                            Cloud Storage: {storageInfo.storageInfo?.available ? "✅ Connected" : "❌ Unavailable"}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Badge variant="default">
                            Storage Mode: {storageInfo.storageInfo?.storageType || "unknown"}
                          </Badge>
                        </div>
                        <div>
                          <Badge variant="outline">
                            Blob Count: {storageInfo.storageInfo?.blobCount || 0}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Data Location:</strong> {storageInfo.storageInfo?.dataLocation || "Unknown"}
                      </div>
                      {!storageInfo.storageInfo?.canWriteToFileSystem && storageInfo.storageInfo?.storageType === 'vercel-blob' && (
                        <div className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800 text-sm">
                          ✅ Production Ready: Using Vercel Blob cloud storage - no file system limitations!
                        </div>
                      )}
                      {storageInfo.storageInfo?.error && (
                        <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 text-sm">
                          ⚠️ Storage Issue: {storageInfo.storageInfo.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>Loading storage information...</div>
              )}
            </CardContent>
          </Card>

          {/* Current Subscribers */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Current Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              {subscribersData ? (
                <div className="space-y-2">
                  {subscribersData.error ? (
                    <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      {subscribersData.error}
                    </div>
                  ) : (
                    <div>
                      <p>Total: {subscribersData.total || 0}</p>
                      {subscribersData.subscribers && subscribersData.subscribers.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {subscribersData.subscribers.slice(0, 3).map((sub: any, i: number) => (
                            <div key={i} className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded border">
                              <span className="font-medium text-slate-900 dark:text-slate-100">{sub.email}</span>
                              <span className="text-slate-600 dark:text-slate-400"> - </span>
                              <span className={`font-medium ${
                                sub.status === 'success' ? 'text-green-600 dark:text-green-400' :
                                sub.status === 'failed' ? 'text-red-600 dark:text-red-400' :
                                'text-yellow-600 dark:text-yellow-400'
                              }`}>
                                {sub.status || 'pending'}
                              </span>
                              <span className="text-slate-600 dark:text-slate-400"> - </span>
                              <span className="text-slate-500 dark:text-slate-500">{formatKenyanTime(sub.subscribedAt)} (EAT)</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>Loading subscribers...</div>
              )}
            </CardContent>
          </Card>

          {/* Newsletter Test */}
          <Card>
            <CardHeader>
              <CardTitle>📧 Newsletter API Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="test@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={testSubscription} disabled={loading || !email}>
                  {loading ? "Testing..." : "Test Subscription"}
                </Button>
                <Button onClick={fetchSubscribers} variant="outline">
                  Refresh Data
                </Button>
                <Button onClick={forceCleanData} variant="destructive">
                  🗑️ Clear All Cloud Data
                </Button>
              </div>
              
              {response && (
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                  <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">API Response:</h4>
                  <pre className="text-sm overflow-auto text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded border">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Production Setup Guide */}
          <Card>
            <CardHeader>
              <CardTitle>� Production Setup & Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">✅ Current System (Vercel Blob Storage):</h4>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800 space-y-2">
                    <p className="text-green-700 dark:text-green-300"><strong>✅ Production Ready:</strong> Using Vercel Blob cloud storage</p>
                    <p className="text-green-700 dark:text-green-300"><strong>✅ No File System Issues:</strong> Data persists across deployments</p>
                    <p className="text-green-700 dark:text-green-300"><strong>✅ Auto-Scaling:</strong> Built on Amazon S3 infrastructure</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">❌ Previous Issues (Now Fixed):</h4>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 space-y-1">
                    <p className="text-red-700 dark:text-red-300 line-through">❌ Read-only file system errors</p>
                    <p className="text-red-700 dark:text-red-300 line-through">❌ Data lost on deployments</p>
                    <p className="text-red-700 dark:text-red-300 line-through">❌ Local file storage limitations</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Setup Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Email Configuration:</strong> EMAIL_USER and EMAIL_APP_PASSWORD environment variables</li>
                    <li><strong>Vercel Blob:</strong> BLOB_READ_WRITE_TOKEN (auto-generated when you create blob store)</li>
                    <li><strong>Gmail App Password:</strong> Use App Password, not regular Gmail password</li>
                    <li><strong>Vercel Dashboard:</strong> Create blob store named "newsletter-subscribers"</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold">Quick Setup Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>Go to Vercel project → Storage → Connect Database → Blob</li>
                    <li>Name: "newsletter-subscribers", select all environments</li>
                    <li>Run: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">vercel env pull</code></li>
                    <li>Deploy: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">vercel --prod</code></li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold">Deployment Checklist:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>✅ EMAIL_USER environment variable set</li>
                    <li>✅ EMAIL_APP_PASSWORD environment variable set</li>
                    <li>✅ BLOB_READ_WRITE_TOKEN environment variable set (auto-created)</li>
                    <li>✅ Vercel Blob store created in dashboard</li>
                    <li>✅ Gmail 2FA enabled and App Password generated</li>
                    <li>✅ API routes using cloud storage (not file system)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageContainer>
  )
}
