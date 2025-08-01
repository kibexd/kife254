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
            message: "All data forcefully cleaned! (Note: In production, this only clears memory storage and will reset on next deploy)" 
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
                      <Badge variant={envCheck.dataDirectory ? "default" : "destructive"}>
                        Data Dir: {envCheck.dataDirectory ? "✅ Exists" : "❌ Missing"}
                      </Badge>
                    </div>
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
                            File System: {storageInfo.storageInfo?.canWriteToFileSystem ? "✅ Writable" : "❌ Read-Only"}
                          </Badge>
                        </div>
                        <div>
                          <Badge variant={storageInfo.storageInfo?.usingMemoryMode ? "secondary" : "default"}>
                            Storage Mode: {storageInfo.storageInfo?.storageType || "Unknown"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Data Location:</strong> {storageInfo.storageInfo?.dataLocation || "Unknown"}
                      </div>
                      {storageInfo.storageInfo?.usingMemoryMode && (
                        <div className="text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800 text-sm">
                          ⚠️ Using memory storage - data will be lost on deployment restart
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
                  🗑️ Force Clean All Data
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

          {/* Production Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle>🚨 Production Troubleshooting Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Common Production Issues:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Environment Variables:</strong> Make sure EMAIL_USER and EMAIL_APP_PASSWORD are set in production</li>
                    <li><strong>Gmail App Password:</strong> Use App Password, not regular Gmail password</li>
                    <li><strong>File Permissions:</strong> Ensure the app can write to data/subscribers.json</li>
                    <li><strong>Memory/Storage:</strong> Check if the hosting platform has file write restrictions</li>
                    <li><strong>CORS Issues:</strong> Verify API routes are accessible from your domain</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Deployment Checklist:</h4>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>✅ EMAIL_USER environment variable set</li>
                    <li>✅ EMAIL_APP_PASSWORD environment variable set</li>
                    <li>✅ data/ directory exists and is writable</li>
                    <li>✅ Gmail 2FA enabled and App Password generated</li>
                    <li>✅ API routes deployed and accessible</li>
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
