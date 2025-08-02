import { NextRequest, NextResponse } from 'next/server'
import { getStorageInfo } from '@/lib/subscribers-blob'

export async function GET(request: NextRequest) {
  try {
    const storageInfo = await getStorageInfo()
    
    return NextResponse.json({
      success: true,
      storageInfo
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get storage info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
