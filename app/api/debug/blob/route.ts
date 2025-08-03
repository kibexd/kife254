import { NextRequest, NextResponse } from 'next/server'
import { getSubscribers, addSubscriber, getStorageInfo } from '@/lib/subscribers-blob'
import { getKenyanTimeString } from '@/lib/time-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'test-add') {
      // Test adding a subscriber
      const testEmail = `test-${Date.now()}@example.com`
      
      console.log('🧪 Testing blob storage - adding subscriber:', testEmail)
      
      await addSubscriber({
        email: testEmail,
        subscribedAt: getKenyanTimeString(),
        ip: 'test-ip',
        userAgent: 'test-agent',
        status: 'pending'
      })

      const subscribers = await getSubscribers()
      
      return NextResponse.json({
        success: true,
        message: 'Test subscriber added successfully',
        testEmail,
        totalCount: subscribers.length,
        allSubscribers: subscribers.map(s => ({ email: s.email, subscribedAt: s.subscribedAt }))
      })
    }

    if (action === 'storage-info') {
      const storageInfo = await getStorageInfo()
      const subscribers = await getSubscribers()
      
      return NextResponse.json({
        success: true,
        storageInfo,
        subscriberCount: subscribers.length,
        firstFiveSubscribers: subscribers.slice(0, 5).map(s => ({ 
          email: s.email, 
          subscribedAt: s.subscribedAt,
          status: s.status 
        }))
      })
    }

    // Default: just get current data
    const subscribers = await getSubscribers()
    const storageInfo = await getStorageInfo()
    
    return NextResponse.json({
      success: true,
      subscriberCount: subscribers.length,
      subscribers: subscribers.map(s => ({ 
        email: s.email, 
        subscribedAt: s.subscribedAt, 
        status: s.status 
      })),
      storageInfo
    })
  } catch (error) {
    console.error('Debug blob storage error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to test blob storage',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    console.log('🧪 Debug API - manually adding subscriber:', email)
    
    await addSubscriber({
      email,
      subscribedAt: getKenyanTimeString(),
      ip: 'debug-api',
      userAgent: 'debug-api',
      status: 'success'
    })

    const subscribers = await getSubscribers()
    
    return NextResponse.json({
      success: true,
      message: 'Subscriber added via debug API',
      email,
      totalCount: subscribers.length
    })
  } catch (error) {
    console.error('Debug API add subscriber error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add subscriber'
      },
      { status: 500 }
    )
  }
}
