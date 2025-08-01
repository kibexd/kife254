"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { Badge } from "@/components/ui/badge"

export default function DebugPage() {
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [envCheck, setEnvCheck] = useState<any>(null)
  const [subscribersData, setSubscribersData] = useState<any>(null)

  // Check environment and system status
  useEffect(() => {
    checkEnvironment()
    fetchSubscribers()
  }, [])

  const checkEnvironment = async () => {
    try {
      const res = await fetch("/api/debug/env")
      const data = await res.json()
      setEnvCheck(data)
    } catch (error) {
      setEnvCheck({ error: "Failed to check environment" })
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
        setResponse({ status: res.status, data: { success: true, message: "All data forcefully cleaned!" } })
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
                              <span className="text-slate-500 dark:text-slate-500">{new Date(sub.subscribedAt).toLocaleString()}</span>
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
