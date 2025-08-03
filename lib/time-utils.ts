// Utility functions for handling Kenyan time (EAT - UTC+3)
// Current Kenya Time: August 2, 2025, 23:27:24 EAT

export function getKenyanTime(): Date {
  // Get current time in Kenya timezone (Africa/Nairobi)
  const now = new Date()
  // Convert to Kenya timezone - this will be accurate regardless of server location
  return new Date(now.toLocaleString("en-US", { timeZone: "Africa/Nairobi" }))
}

export function getKenyanTimeString(): string {
  // Returns ISO string in Kenyan time
  const kenyanTime = getKenyanTime()
  return kenyanTime.toISOString()
}

export function formatKenyanTime(date: string | Date): string {
  // Format date for Kenyan timezone display
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Use proper Kenya timezone formatting
  return dateObj.toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24-hour format for consistency
  })
}

export function formatKenyanTimeForEmail(date?: Date): string {
  // Format specifically for email notifications in Kenya time
  const targetDate = date || new Date()
  
  return targetDate.toLocaleString('en-US', {
    timeZone: 'Africa/Nairobi',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' EAT'
}

// Get current Kenya time as readable string
export function getCurrentKenyanTimeString(): string {
  const now = new Date()
  return now.toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' EAT'
}
