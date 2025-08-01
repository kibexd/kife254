import { NextResponse } from 'next/server';
import { getSubscriberCount, getRecentSubscribers } from '@/lib/subscribers';

export async function GET() {
  try {
    const total = await getSubscriberCount();
    const recent = await getRecentSubscribers(5);
    
    // Calculate growth metrics
    const today = new Date();
    const thisMonth = recent.filter(sub => {
      const subDate = new Date(sub.subscribedAt);
      return subDate.getMonth() === today.getMonth() && 
             subDate.getFullYear() === today.getFullYear();
    }).length;

    const thisWeek = recent.filter(sub => {
      const subDate = new Date(sub.subscribedAt);
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return subDate >= weekAgo;
    }).length;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        thisMonth,
        thisWeek,
        latest: recent[0] || null
      }
    });
  } catch (error) {
    console.error('Error fetching subscriber stats:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch subscriber statistics'
      },
      { status: 500 }
    );
  }
}
