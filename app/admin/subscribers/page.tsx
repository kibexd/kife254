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
  status?: 'pending' | 'success' | 'failed'
  emailSent?: boolean
  notificationSent?: boolean
  errorMessage?: string
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null)
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false)
  const [showDeleteByStatusDialog, setShowDeleteByStatusDialog] = useState<'success' | 'pending' | 'failed' | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'success' | 'failed'>('all')

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

  // Filter subscribers based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredSubscribers(subscribers)
    } else if (statusFilter === 'pending') {
      setFilteredSubscribers(subscribers.filter(sub => !sub.status || sub.status === 'pending'))
    } else {
      setFilteredSubscribers(subscribers.filter(sub => sub.status === statusFilter))
    }
  }, [subscribers, statusFilter])

  // Get counts for each status
  const getStatusCounts = () => {
    const total = subscribers.length
    const pending = subscribers.filter(sub => !sub.status || sub.status === 'pending').length
    const success = subscribers.filter(sub => sub.status === 'success').length
    const failed = subscribers.filter(sub => sub.status === 'failed').length
    
    return { total, pending, success, failed }
  }

  const statusCounts = getStatusCounts()

  const exportSubscribers = () => {
    const csvContent = [
      "Email,Subscribed At,Status,Email Sent,Notification Sent,Error Message,IP Address,User Agent",
      ...filteredSubscribers.map(sub => 
        `"${sub.email}","${sub.subscribedAt}","${sub.status || 'pending'}","${sub.emailSent ? 'Yes' : 'No'}","${sub.notificationSent ? 'Yes' : 'No'}","${sub.errorMessage || 'N/A'}","${sub.ip || 'N/A'}","${sub.userAgent || 'N/A'}"`
      )
    ].join("\\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${statusFilter}-${new Date().toISOString().split('T')[0]}.csv`
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

  const deleteByStatus = async (status: 'success' | 'pending' | 'failed') => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/subscribers?deleteByStatus=${status}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      
      if (res.ok) {
        // Remove subscribers with the specified status
        if (status === 'pending') {
          setSubscribers(prev => prev.filter(sub => sub.status && sub.status !== 'pending'))
        } else {
          setSubscribers(prev => prev.filter(sub => sub.status !== status))
        }
        setError("")
        setShowDeleteByStatusDialog(null)
      } else {
        setError(data.error || `Failed to delete ${status} subscribers`)
      }
    } catch (err) {
      setError(`Failed to delete ${status} subscribers`)
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
              <Button onClick={exportSubscribers} variant="outline" size="sm" disabled={filteredSubscribers.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV ({statusFilter})
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

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              onClick={() => setStatusFilter('all')} 
              variant={statusFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
            >
              All ({statusCounts.total})
            </Button>
            <Button 
              onClick={() => setStatusFilter('success')} 
              variant={statusFilter === 'success' ? 'default' : 'outline'} 
              size="sm"
              className={statusFilter === 'success' ? 'bg-green-600 hover:bg-green-700' : 'text-green-600 border-green-600 hover:bg-green-50'}
            >
              ✅ Success ({statusCounts.success})
            </Button>
            {statusCounts.success > 0 && (
              <Button 
                onClick={() => setShowDeleteByStatusDialog('success')} 
                variant="destructive" 
                size="sm"
                className="ml-1"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
            <Button 
              onClick={() => setStatusFilter('pending')} 
              variant={statusFilter === 'pending' ? 'default' : 'outline'} 
              size="sm"
              className={statusFilter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : 'text-yellow-600 border-yellow-600 hover:bg-yellow-50'}
            >
              ⏳ Pending ({statusCounts.pending})
            </Button>
            {statusCounts.pending > 0 && (
              <Button 
                onClick={() => setShowDeleteByStatusDialog('pending')} 
                variant="destructive" 
                size="sm"
                className="ml-1"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
            <Button 
              onClick={() => setStatusFilter('failed')} 
              variant={statusFilter === 'failed' ? 'default' : 'outline'} 
              size="sm"
              className={statusFilter === 'failed' ? 'bg-red-600 hover:bg-red-700' : 'text-red-600 border-red-600 hover:bg-red-50'}
            >
              ❌ Failed ({statusCounts.failed})
            </Button>
            {statusCounts.failed > 0 && (
              <Button 
                onClick={() => setShowDeleteByStatusDialog('failed')} 
                variant="destructive" 
                size="sm"
                className="ml-1"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statusCounts.total}</div>
                <p className="text-xs text-muted-foreground">
                  Growing community
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful</CardTitle>
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{statusCounts.success}</div>
                <p className="text-xs text-muted-foreground">
                  Email delivered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
                <p className="text-xs text-muted-foreground">
                  In progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed</CardTitle>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{statusCounts.failed}</div>
                <p className="text-xs text-muted-foreground">
                  Needs attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subscribers List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {statusFilter === 'all' 
                  ? `All Subscribers (${filteredSubscribers.length})`
                  : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Subscribers (${filteredSubscribers.length})`
                }
              </CardTitle>
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
              ) : filteredSubscribers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {statusFilter === 'all' 
                      ? 'No subscribers yet. Share your newsletter to start growing your audience!'
                      : `No ${statusFilter} subscribers found.`
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubscribers
                    .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
                    .map((subscriber, index) => (
                    <div key={subscriber.email} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-medium text-primary">
                            {subscriber.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{subscriber.email}</p>
                            <Badge 
                              variant={
                                subscriber.status === 'success' ? 'default' :
                                subscriber.status === 'failed' ? 'destructive' :
                                'secondary'
                              }
                              className={
                                subscriber.status === 'success' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                subscriber.status === 'failed' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              }
                            >
                              {subscriber.status === 'success' ? '✅ Success' :
                               subscriber.status === 'failed' ? '❌ Failed' :
                               '⏳ Pending'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Joined {formatDate(subscriber.subscribedAt)}
                          </p>
                          {subscriber.status === 'failed' && subscriber.errorMessage && (
                            <p className="text-xs text-red-600 mt-1">
                              Error: {subscriber.errorMessage}
                            </p>
                          )}
                          {subscriber.status === 'success' && (
                            <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                              <span>📧 Welcome: {subscriber.emailSent ? 'Sent' : 'Failed'}</span>
                              <span>🔔 Notification: {subscriber.notificationSent ? 'Sent' : 'Failed'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">#{filteredSubscribers.length - index}</Badge>
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

      {/* Delete By Status Confirmation Dialog */}
      {showDeleteByStatusDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Delete {showDeleteByStatusDialog.charAt(0).toUpperCase() + showDeleteByStatusDialog.slice(1)} Subscribers
                </h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm mb-6">
              Are you sure you want to delete all {
                showDeleteByStatusDialog === 'success' ? statusCounts.success :
                showDeleteByStatusDialog === 'pending' ? statusCounts.pending :
                statusCounts.failed
              } {showDeleteByStatusDialog} subscribers? This will permanently remove their data.
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                onClick={() => setShowDeleteByStatusDialog(null)} 
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => deleteByStatus(showDeleteByStatusDialog)} 
                variant="destructive"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete {showDeleteByStatusDialog.charAt(0).toUpperCase() + showDeleteByStatusDialog.slice(1)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
