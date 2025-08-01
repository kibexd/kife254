import { NextResponse } from 'next/server';
import { getSubscribers, getSubscriberCount, getRecentSubscribers, deleteSubscriber, deleteAllSubscribers, getSubscribersByStatus } from '@/lib/subscribers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const recent = searchParams.get('recent');

    if (recent === 'true') {
      const limitNum = limit ? parseInt(limit) : 10;
      const subscribers = await getRecentSubscribers(limitNum);
      const total = await getSubscriberCount();
      
      return NextResponse.json({
        success: true,
        subscribers,
        total,
        showing: subscribers.length
      });
    } else {
      const subscribers = await getSubscribers();
      const total = subscribers.length;
      
      return NextResponse.json({
        success: true,
        subscribers,
        total
      });
    }
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch subscribers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const deleteAll = searchParams.get('deleteAll');
    const deleteByStatus = searchParams.get('deleteByStatus');

    if (deleteAll === 'true') {
      // Delete all subscribers
      await deleteAllSubscribers();
      return NextResponse.json({
        success: true,
        message: 'All subscribers deleted successfully'
      });
    } else if (deleteByStatus) {
      // Delete subscribers by status
      const validStatuses = ['pending', 'success', 'failed'];
      if (!validStatuses.includes(deleteByStatus)) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid status. Must be pending, success, or failed'
          },
          { status: 400 }
        );
      }

      // Get subscribers with the specified status
      let subscribersToDelete;
      if (deleteByStatus === 'pending') {
        subscribersToDelete = await getSubscribers().then(subs => 
          subs.filter(sub => !sub.status || sub.status === 'pending')
        );
      } else {
        subscribersToDelete = await getSubscribersByStatus(deleteByStatus as 'success' | 'failed');
      }
      
      // Delete each subscriber
      let deletedCount = 0;
      for (const subscriber of subscribersToDelete) {
        const deleted = await deleteSubscriber(subscriber.email);
        if (deleted) deletedCount++;
      }

      return NextResponse.json({
        success: true,
        message: `${deletedCount} ${deleteByStatus} subscribers deleted successfully`
      });
    } else if (email) {
      // Delete specific subscriber
      const deleted = await deleteSubscriber(email);
      
      if (deleted) {
        return NextResponse.json({
          success: true,
          message: 'Subscriber deleted successfully'
        });
      } else {
        return NextResponse.json(
          { 
            success: false,
            error: 'Subscriber not found'
          },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email parameter is required'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete subscriber',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
