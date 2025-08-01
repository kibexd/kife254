import { promises as fs } from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

export interface Subscriber {
  email: string
  subscribedAt: string
  ip?: string
  userAgent?: string
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
  await ensureSubscribersFile()
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(data)
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
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
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
  
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(updatedSubscribers, null, 2))
  return true
}

// Delete all subscribers (for testing purposes)
export async function deleteAllSubscribers(): Promise<void> {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2))
}
