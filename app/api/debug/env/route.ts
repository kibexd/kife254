import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Check environment variables (without exposing sensitive data)
    const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD);
    
    // Check Vercel Blob configuration (new storage system)
    const blobConfigured = !!process.env.BLOB_READ_WRITE_TOKEN;
    
    // Production vs Development
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Platform information (useful for debugging hosting issues)
    const platform = process.platform;
    const nodeVersion = process.version;
    
    return NextResponse.json({
      success: true,
      emailConfigured,
      blobConfigured,
      storageType: 'vercel-blob', // We're now using Vercel Blob instead of file system
      isProduction,
      platform,
      nodeVersion,
      environment: {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD,
        hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        smtpFrom: process.env.SMTP_FROM ? '***configured***' : 'not set'
      },
      migration: {
        from: 'local file storage (data/subscribers.json)',
        to: 'vercel blob cloud storage',
        reason: 'Production read-only file system compatibility'
      }
    });
  } catch (error) {
    console.error('Environment check error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check environment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
