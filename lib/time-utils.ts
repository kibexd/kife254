// Utility functions for handling Kenyan time (EAT - UTC+3)

export function getKenyanTime(): Date {
  // Create a new date and add 3 hours for Kenyan time (EAT = UTC+3)
  const now = new Date()
  const kenyanTime = new Date(now.getTime() + (3 * 60 * 60 * 1000))
  return kenyanTime
}

export function getKenyanTimeString(): string {
  // Returns ISO string but adjusted for Kenyan time
  return getKenyanTime().toISOString()
}

export function formatKenyanTime(date: string | Date): string {
  // Format date for Kenyan timezone display
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Convert to Kenyan time if it's UTC
  const kenyanTime = new Date(dateObj.getTime() + (3 * 60 * 60 * 1000))
  
  return kenyanTime.toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

export function formatKenyanTimeForEmail(date?: Date): string {
  // Format specifically for email notifications
  const targetDate = date || new Date()
  
  return targetDate.toLocaleString('en-US', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}
