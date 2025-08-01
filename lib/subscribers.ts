import { promises as fs } from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

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

// In-memory storage for production fallback
let memoryStorage: Subscriber[] = []
let isMemoryMode = false

// Check if we can write to file system
async function canWriteToFileSystem(): Promise<boolean> {
  try {
    const testFile = path.join(process.cwd(), 'test-write.tmp')
    await fs.writeFile(testFile, 'test')
    await fs.unlink(testFile)
    return true
  } catch {
    return false
  }
}

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Ensure the subscribers file exists
async function ensureSubscribersFile() {
  await ensureDataDirectory()
  try {
    await fs.access(SUBSCRIBERS_FILE)
  } catch {
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2))
  }
}

// Get all subscribers
export async function getSubscribers(): Promise<Subscriber[]> {
  // Check if we should use memory mode
  if (isMemoryMode || !(await canWriteToFileSystem())) {
    isMemoryMode = true
    return memoryStorage
  }

  await ensureSubscribersFile()
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    const fileData = JSON.parse(data)
    // Sync file data to memory in case we need to switch modes
    memoryStorage = fileData
    return fileData
  } catch {
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

// Add new subscriber
export async function addSubscriber(subscriber: Subscriber): Promise<void> {
  const subscribers = await getSubscribers()
  
  // Double-check to prevent duplicates
  const existingSubscriber = subscribers.find(s => 
    s.email.toLowerCase() === subscriber.email.toLowerCase()
  )
  
  if (existingSubscriber) {
    throw new Error('Email already subscribed')
  }
  
  subscribers.push(subscriber)
  
  // Try to write to file, fallback to memory if it fails
  if (isMemoryMode || !(await canWriteToFileSystem())) {
    isMemoryMode = true
    memoryStorage = subscribers
    return
  }
  
  try {
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
  } catch (error) {
    // File system write failed, switch to memory mode
    isMemoryMode = true
    memoryStorage = subscribers
    console.log('Switched to memory storage mode due to file system restrictions')
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
  const subscribers = await getSubscribers()
  const initialLength = subscribers.length
  
  const updatedSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase() !== email.toLowerCase()
  )
  
  if (updatedSubscribers.length === initialLength) {
    // Email not found
    return false
  }
  
  // Try to write to file, fallback to memory if it fails
  if (isMemoryMode || !(await canWriteToFileSystem())) {
    isMemoryMode = true
    memoryStorage = updatedSubscribers
    return true
  }
  
  try {
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(updatedSubscribers, null, 2))
    return true
  } catch (error) {
    // File system write failed, switch to memory mode
    isMemoryMode = true
    memoryStorage = updatedSubscribers
    console.log('Switched to memory storage mode due to file system restrictions')
    return true
  }
}

// Delete all subscribers (for testing purposes)
export async function deleteAllSubscribers(): Promise<void> {
  // Try to write to file, fallback to memory if it fails
  if (isMemoryMode || !(await canWriteToFileSystem())) {
    isMemoryMode = true
    memoryStorage = []
    return
  }
  
  try {
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2))
  } catch (error) {
    // File system write failed, switch to memory mode
    isMemoryMode = true
    memoryStorage = []
    console.log('Switched to memory storage mode due to file system restrictions')
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
    
    // Try to write to file, fallback to memory if it fails
    if (isMemoryMode || !(await canWriteToFileSystem())) {
      isMemoryMode = true
      memoryStorage = subscribers
      return
    }
    
    try {
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
    } catch (error) {
      // File system write failed, switch to memory mode
      isMemoryMode = true
      memoryStorage = subscribers
      console.log('Switched to memory storage mode due to file system restrictions')
    }
  }
}

// Get subscribers by status
export async function getSubscribersByStatus(status?: 'pending' | 'success' | 'failed'): Promise<Subscriber[]> {
  const subscribers = await getSubscribers()
  if (!status) return subscribers
  return subscribers.filter(sub => sub.status === status)
}

// Get storage mode information
export async function getStorageInfo() {
  const canWrite = await canWriteToFileSystem()
  return {
    canWriteToFileSystem: canWrite,
    usingMemoryMode: isMemoryMode,
    storageType: isMemoryMode ? 'memory' : 'file',
    dataLocation: isMemoryMode ? 'In-memory (resets on deploy)' : SUBSCRIBERS_FILE
  }
}
