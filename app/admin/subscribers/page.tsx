"use client"

import { PageContainer } from "@/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, Calendar, Download, RefreshCw, LogOut, Trash2, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { LoginPage } from "@/components/admin-login"

interface Subscriber {
  email: string
  subscribedAt: string
  ip?: string
  userAgent?: string
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null)
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem("admin_authenticated") === "true"
      setIsAuthenticated(isAuth)
      setCheckingAuth(false)
    }
    
    checkAuth()
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    setIsAuthenticated(false)
  }

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
    if (success) {
      fetchSubscribers()
    }
  }

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/subscribers")
      const data = await res.json()
      
      if (res.ok) {
        setSubscribers(data.subscribers)
        setError("")
      } else {
        setError(data.error || "Failed to fetch subscribers")
      }
    } catch (err) {
      setError("Failed to fetch subscribers")
    } finally {
      setLoading(false)
    }
  }

  const exportSubscribers = () => {
    const csvContent = [
      "Email,Subscribed At,IP Address,User Agent",
      ...subscribers.map(sub => 
        `"${sub.email}","${sub.subscribedAt}","${sub.ip || 'N/A'}","${sub.userAgent || 'N/A'}"`
      )
    ].join("\\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const deleteSubscriber = async (email: string) => {
    setDeletingEmail(email)
    try {
      const res = await fetch(`/api/admin/subscribers?email=${encodeURIComponent(email)}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      
      if (res.ok) {
        setSubscribers(prev => prev.filter(sub => sub.email !== email))
        setError("")
      } else {
        setError(data.error || "Failed to delete subscriber")
      }
    } catch (err) {
      setError("Failed to delete subscriber")
    } finally {
      setDeletingEmail(null)
    }
  }

  const deleteAllSubscribers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/subscribers?deleteAll=true`, {
        method: 'DELETE'
      })
      const data = await res.json()
      
      if (res.ok) {
        setSubscribers([])
        setError("")
        setShowDeleteAllDialog(false)
      } else {
        setError(data.error || "Failed to delete all subscribers")
      }
    } catch (err) {
      setError("Failed to delete all subscribers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers()
    }
  }, [isAuthenticated])

  // Show loading during auth check
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <PageContainer>
      <section className="container pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Newsletter Subscribers</h1>
              <p className="text-muted-foreground">
                Manage and view your newsletter subscriber list
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button onClick={fetchSubscribers} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={exportSubscribers} variant="outline" size="sm" disabled={subscribers.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button 
                onClick={() => setShowDeleteAllDialog(true)} 
                variant="destructive" 
                size="sm"
                disabled={subscribers.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Growing community
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscribers.filter(sub => 
                    new Date(sub.subscribedAt).getMonth() === new Date().getMonth() &&
                    new Date(sub.subscribedAt).getFullYear() === new Date().getFullYear()
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  New subscribers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Subscriber</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">
                  {subscribers.length > 0 
                    ? subscribers.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())[0]?.email.split('@')[0] + '...'
                    : 'No subscribers yet'
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  {subscribers.length > 0 
                    ? formatDate(subscribers.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())[0]?.subscribedAt)
                    : 'Waiting for first subscriber'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subscribers List */}
          <Card>
            <CardHeader>
              <CardTitle>All Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading subscribers...</span>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">
                  <p>{error}</p>
                  <Button onClick={fetchSubscribers} variant="outline" size="sm" className="mt-4">
                    Try Again
                  </Button>
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No subscribers yet. Share your newsletter to start growing your audience!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscribers
                    .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
                    .map((subscriber, index) => (
                    <div key={subscriber.email} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-medium text-primary">
                            {subscriber.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {formatDate(subscriber.subscribedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">#{subscribers.length - index}</Badge>
                        {new Date(subscriber.subscribedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000 && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                        )}
                        <Button
                          onClick={() => deleteSubscriber(subscriber.email)}
                          variant="ghost"
                          size="sm"
                          disabled={deletingEmail === subscriber.email}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deletingEmail === subscriber.email ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Delete All Confirmation Dialog */}
      {showDeleteAllDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete All Subscribers</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm mb-6">
              Are you sure you want to delete all {subscribers.length} subscribers? This will permanently remove all subscriber data.
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                onClick={() => setShowDeleteAllDialog(false)} 
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                onClick={deleteAllSubscribers} 
                variant="destructive"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete All
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
