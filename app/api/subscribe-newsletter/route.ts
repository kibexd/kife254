import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isEmailSubscribed, addSubscriber, updateSubscriberStatus } from '@/lib/subscribers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email is already subscribed
    const alreadySubscribed = await isEmailSubscribed(email);
    if (alreadySubscribed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'already_subscribed',
          message: "Hey there! 👋 Looks like you're already part of my awesome community! I'd love to have you twice, but once is perfect. Keep an eye on your inbox for amazing content coming your way! 🚀"
        },
        { status: 409 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('Missing email configuration:', {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD
      });
      return NextResponse.json(
        { success: false, error: 'Email service temporarily unavailable' },
        { status: 500 }
      );
    }

    console.log('Creating email transporter...');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    console.log('Verifying transporter...');
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return NextResponse.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Get request headers for tracking
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    console.log('Adding subscriber to storage...');
    // Save subscriber to storage FIRST (before emails) with pending status
    await addSubscriber({
      email,
      subscribedAt: new Date().toISOString(),
      ip,
      userAgent,
      status: 'pending'
    });
    console.log('Subscriber added successfully with pending status');

    console.log('Sending notification email...');
    // 1. Send notification to you
    let notificationSent = false
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'kibeenock7390@gmail.com',
        subject: '🎉 New Blog Newsletter Subscriber',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4F46E5; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">🎉 New Newsletter Subscriber</h2>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;"><strong style="color: #334155;">Email:</strong> <span style="color: #0f172a;">${email}</span></p>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">Subscribed: ${new Date().toLocaleString()}</p>
              </div>
              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">Someone just subscribed to your blog newsletter. Time to create amazing content! 🚀</p>
            </div>
          </div>
        `,
      });
      notificationSent = true
      console.log('Notification email sent successfully');
    } catch (notificationError) {
      console.error('Failed to send notification email:', notificationError);
      // Continue with welcome email even if notification fails
    }

    console.log('Sending welcome email...');
    // 2. Send beautiful welcome email to subscriber
    let emailSent = false
    let errorMessage = ''
    
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Welcome to My Tech Journey!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Our Newsletter</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0;">
            
            <!-- Header -->
            <div style="background-color: #4f46e5; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                Welcome to My Journey! 🎉
              </h1>
              <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 16px;">
                Thanks for joining me on this tech adventure
              </p>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 35px;">
                <div style="width: 70px; height: 70px; background-color: #4f46e5; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28px;">✨</span>
                </div>
                <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">
                  You're all set!
                </h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.7; margin: 0;">
                  Hey there! 👋<br><br>
                  I'm genuinely excited to have you join me on this journey! You've just subscribed to my personal space where I share insights from my world of development, cybersecurity, and life lessons learned along the way.
                </p>
              </div>
              
              <!-- What to expect -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 30px; margin: 35px 0; border-left: 4px solid #4f46e5;">
                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: bold;">
                  🎯 What you can expect
                </h3>
                <div style="color: #64748b; font-size: 15px; line-height: 1.7;">
                  <p style="margin: 0 0 12px 0;">💻 <strong style="color: #374151;">Web Development insights</strong> - Modern techniques, frameworks, and best practices</p>
                  <p style="margin: 0 0 12px 0;">🔐 <strong style="color: #374151;">Cybersecurity guidance</strong> - Protecting your digital world with practical tips</p>
                  <p style="margin: 0 0 12px 0;">⚙️ <strong style="color: #374151;">ERP &amp; Business Solutions</strong> - Streamlining business processes effectively</p>
                  <p style="margin: 0;">💡 <strong style="color: #374151;">Industry trends</strong> - What's shaping the future of technology</p>
                </div>
              </div>
              
              <!-- Personal note -->
              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 25px; margin: 35px 0; text-align: center;">
                <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0; font-style: italic;">
                  "I believe in sharing knowledge that makes a real difference. Every piece of content I create is designed to help you grow, solve problems, and stay ahead in this fast-evolving tech landscape."
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 15px 0 0 0; font-weight: bold;">
                  - Enock Kibe
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                  <tr>
                    <td style="background-color: #4f46e5; border-radius: 8px; padding: 14px 30px;">
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/blog" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                        📖 Visit My Blog
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Footer message -->
              <div style="border-top: 1px solid #e2e8f0; padding-top: 25px; text-align: center;">
                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0;">
                  We're working on some exciting content - your first newsletter will arrive soon! 📬<br>
                  <br>
                  <em>P.S. Feel free to reply to this email anytime. I read every message!</em>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1e293b; padding: 25px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0;">
                © 2025 Tech Insights Newsletter. All rights reserved.
              </p>
              <p style="color: #64748b; font-size: 11px; margin: 0;">
                If you didn't subscribe to this newsletter, you can safely ignore this email.
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      });
      emailSent = true
      console.log('Welcome email sent successfully');
    } catch (welcomeEmailError) {
      console.error('Failed to send welcome email:', welcomeEmailError);
      errorMessage = welcomeEmailError instanceof Error ? welcomeEmailError.message : 'Unknown email error'
      // Continue - subscriber is still saved even if welcome email fails
    }
    
    // Update subscriber status based on email results
    try {
      if (emailSent) {
        await updateSubscriberStatus(email, 'success', emailSent, notificationSent)
        console.log(`✅ Subscriber status updated to success for: ${email}`)
      } else {
        await updateSubscriberStatus(email, 'failed', emailSent, notificationSent, errorMessage)
        console.log(`❌ Subscriber status updated to failed for: ${email}`)
      }
    } catch (statusUpdateError) {
      console.error('Failed to update subscriber status:', statusUpdateError)
    }

    return NextResponse.json({ 
      success: true, 
      message: emailSent 
        ? 'Successfully subscribed and welcome email sent!'
        : 'Successfully subscribed! Welcome email will be sent shortly.',
      emailSent,
      notificationSent
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Provide more specific error messages based on the error type
    let errorMessage = 'Failed to process subscription. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email service configuration error. Please contact support.';
        errorCode = 'EMAIL_CONFIG_ERROR';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout. Please check your connection and try again.';
        errorCode = 'TIMEOUT_ERROR';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please try again in a moment.';
        errorCode = 'NETWORK_ERROR';
      } else if (error.message.includes('ENOENT') || error.message.includes('permission')) {
        errorMessage = 'Storage error. Please contact support.';
        errorCode = 'STORAGE_ERROR';
      }
    }
    
    // Log detailed error for debugging (server-side only)
    console.error('Detailed error info:', {
      message: error instanceof Error ? error.message : 'Unknown',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      environment: {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPassword: !!process.env.EMAIL_APP_PASSWORD,
        platform: process.platform,
        nodeVersion: process.version
      }
    });
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        errorCode,
        // Include more debug info in development
        ...(process.env.NODE_ENV === 'development' && {
          debug: {
            originalError: error instanceof Error ? error.message : 'Unknown error',
            hasEmailConfig: !!(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD)
          }
        })
      },
      { status: 500 }
    );
  }
}