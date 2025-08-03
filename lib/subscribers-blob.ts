import { put, list, del } from '@vercel/blob'
import { getKenyanTimeString, formatKenyanTime } from '@/lib/time-utils'

const SUBSCRIBERS_BLOB_PATHNAME = 'subscribers/data.json'

export interface Subscriber {
  email: string
  subscribedAt: string
  ip?: string
  userAgent?: string
  status: 'pending' | 'success' | 'failed'
  emailSent?: boolean
  notificationSent?: boolean
  errorMessage?: string
}

// Get all subscribers from Vercel Blob
export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    // List all blobs and find our subscribers file
    const { blobs } = await list({ prefix: 'subscribers/' })
    const subscribersBlob = blobs.find(blob => blob.pathname === SUBSCRIBERS_BLOB_PATHNAME)
    
    if (!subscribersBlob) {
      // If no file exists, create an empty one and return empty array
      console.log('📝 No subscribers file found, creating initial empty file')
      await put(SUBSCRIBERS_BLOB_PATHNAME, JSON.stringify([], null, 2), {
        access: 'public',
        allowOverwrite: true,
        contentType: 'application/json'
      })
      return []
    }

    // Fetch the JSON data from the blob URL
    const response = await fetch(subscribersBlob.url)
    if (!response.ok) {
      console.error('❌ Failed to fetch subscribers data:', response.statusText)
      return []
    }

    const data = await response.json()
    const subscribers = Array.isArray(data) ? data : []
    console.log(`✅ Retrieved ${subscribers.length} subscribers from Vercel Blob`)
    return subscribers
  } catch (error) {
    console.error('❌ Error getting subscribers from Vercel Blob:', error)
    return []
  }
}

// Check if email already exists
export async function isEmailSubscribed(email: string): Promise<boolean> {
  const subscribers = await getSubscribers()
  return subscribers.some(subscriber => 
    subscriber.email.toLowerCase() === email.toLowerCase()
  )
}

// Add new subscriber to Vercel Blob
export async function addSubscriber(subscriber: Subscriber): Promise<void> {
  try {
    console.log(`📧 Adding subscriber: ${subscriber.email}`)
    const subscribers = await getSubscribers()
    
    // Double-check to prevent duplicates
    const existingSubscriber = subscribers.find(s => 
      s.email.toLowerCase() === subscriber.email.toLowerCase()
    )
    
    if (existingSubscriber) {
      console.log(`⚠️ Subscriber ${subscriber.email} already exists`)
      throw new Error('Email already subscribed')
    }
    
    // Add new subscriber
    subscribers.push(subscriber)
    console.log(`📝 Adding to list, total will be: ${subscribers.length}`)
    
    // Convert to JSON and store in Vercel Blob
    const jsonData = JSON.stringify(subscribers, null, 2)
    
    const result = await put(SUBSCRIBERS_BLOB_PATHNAME, jsonData, {
      access: 'public',
      allowOverwrite: true, // Allow updating the existing file
      contentType: 'application/json'
    })
    
    console.log('✅ Subscriber added to Vercel Blob successfully:', result.url)
  } catch (error) {
    console.error('❌ Error adding subscriber to Vercel Blob:', error)
    throw error
  }
}

// Get subscriber count
export async function getSubscriberCount(): Promise<number> {
  const subscribers = await getSubscribers()
  return subscribers.length
}

// Get recent subscribers (last N)
export async function getRecentSubscribers(limit: number = 10): Promise<Subscriber[]> {
  const subscribers = await getSubscribers()
  return subscribers
    .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
    .slice(0, limit)
}

// Delete a subscriber by email
export async function deleteSubscriber(email: string): Promise<boolean> {
  try {
    const subscribers = await getSubscribers()
    const initialLength = subscribers.length
    
    const updatedSubscribers = subscribers.filter(subscriber => 
      subscriber.email.toLowerCase() !== email.toLowerCase()
    )
    
    if (updatedSubscribers.length === initialLength) {
      // Email not found
      return false
    }
    
    // Update the blob with the filtered list
    const jsonData = JSON.stringify(updatedSubscribers, null, 2)
    
    await put(SUBSCRIBERS_BLOB_PATHNAME, jsonData, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'application/json'
    })
    
    console.log('✅ Subscriber deleted from Vercel Blob successfully')
    return true
  } catch (error) {
    console.error('❌ Error deleting subscriber from Vercel Blob:', error)
    throw error
  }
}

// Delete all subscribers (for testing purposes)
export async function deleteAllSubscribers(): Promise<void> {
  try {
    // Create empty array and store it
    const jsonData = JSON.stringify([], null, 2)
    
    await put(SUBSCRIBERS_BLOB_PATHNAME, jsonData, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'application/json'
    })
    
    console.log('✅ All subscribers deleted from Vercel Blob successfully')
  } catch (error) {
    console.error('❌ Error deleting all subscribers from Vercel Blob:', error)
    throw error
  }
}

// Update subscriber status and error information
export async function updateSubscriberStatus(
  email: string, 
  status: 'success' | 'failed', 
  emailSent?: boolean,
  notificationSent?: boolean,
  errorMessage?: string
): Promise<void> {
  try {
    const subscribers = await getSubscribers()
    const subscriberIndex = subscribers.findIndex(sub => 
      sub.email.toLowerCase() === email.toLowerCase()
    )
    
    if (subscriberIndex !== -1) {
      subscribers[subscriberIndex] = {
        ...subscribers[subscriberIndex],
        status,
        emailSent: emailSent ?? subscribers[subscriberIndex].emailSent,
        notificationSent: notificationSent ?? subscribers[subscriberIndex].notificationSent,
        errorMessage: errorMessage || subscribers[subscriberIndex].errorMessage
      }
      
      // Update the blob
      const jsonData = JSON.stringify(subscribers, null, 2)
      
      await put(SUBSCRIBERS_BLOB_PATHNAME, jsonData, {
        access: 'public',
        allowOverwrite: true,
        contentType: 'application/json'
      })
      
      console.log('✅ Subscriber status updated in Vercel Blob successfully')
    }
  } catch (error) {
    console.error('❌ Error updating subscriber status in Vercel Blob:', error)
    throw error
  }
}

// Get subscribers by status
export async function getSubscribersByStatus(status?: 'pending' | 'success' | 'failed'): Promise<Subscriber[]> {
  const subscribers = await getSubscribers()
  if (!status) return subscribers
  return subscribers.filter(sub => sub.status === status)
}

// Get storage mode information (now using Vercel Blob)
export async function getStorageInfo() {
  try {
    // Test if we can access Vercel Blob
    const { blobs } = await list({ limit: 1 })
    
    return {
      canWriteToFileSystem: false, // We're not using file system anymore
      usingMemoryMode: false,
      storageType: 'vercel-blob',
      dataLocation: 'Vercel Blob Storage (Cloud)',
      blobCount: blobs.length,
      available: true
    }
  } catch (error) {
    return {
      canWriteToFileSystem: false,
      usingMemoryMode: false,
      storageType: 'vercel-blob',
      dataLocation: 'Vercel Blob Storage (Cloud)',
      blobCount: 0,
      available: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
