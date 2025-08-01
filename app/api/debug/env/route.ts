import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Check environment variables (without exposing sensitive data)
    const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD);
    
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    const dataDirectory = existsSync(dataDir);
    
    // Check if subscribers.json file exists
    const subscribersFile = path.join(dataDir, 'subscribers.json');
    const subscribersFileExists = existsSync(subscribersFile);
    
    // Production vs Development
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Platform information (useful for debugging hosting issues)
    const platform = process.platform;
    const nodeVersion = process.version;
    
    return NextResponse.json({
      success: true,
      emailConfigured,
      dataDirectory,
      subscribersFileExists,
      isProduction,
      platform,
      nodeVersion,
      environment: {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        smtpFrom: process.env.SMTP_FROM ? '***configured***' : 'not set'
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
