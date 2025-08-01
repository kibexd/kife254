# 🚀 Production Deployment Guide

## Environment Variables Required

Add these environment variables to your production hosting platform:

```bash
# Gmail Configuration (REQUIRED)
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password

# Optional but recommended
SMTP_FROM=your-gmail@gmail.com
NEXTAUTH_URL=https://your-domain.com
```

## Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to Google Account Settings → Security → 2-Step Verification
3. Generate an "App Password":
   - Select "Mail" as the app
   - Select "Other" as the device
   - Name it "Newsletter App" 
   - Copy the 16-character password (no spaces)
4. Use this App Password as `EMAIL_APP_PASSWORD`

## Hosting Platform Setup

### Vercel
```bash
# Set environment variables in Vercel dashboard
vercel env add EMAIL_USER
vercel env add EMAIL_APP_PASSWORD
```

### Netlify
```bash
# In Netlify dashboard: Site settings → Environment variables
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-app-password
```

### Other Platforms
- Ensure the platform supports file system writes for `data/subscribers.json`
- If using serverless functions, consider using a database instead of JSON files

## Troubleshooting Common Issues

### 1. "Email service configuration error"
- ❌ Problem: Invalid Gmail credentials
- ✅ Solution: Verify EMAIL_USER and EMAIL_APP_PASSWORD are correct

### 2. "Storage error" 
- ❌ Problem: Cannot write to data/subscribers.json
- ✅ Solution: Check file permissions or switch to database storage

### 3. "Network error"
- ❌ Problem: SMTP connection blocked
- ✅ Solution: Check if hosting platform allows SMTP connections

### 4. Generic "Something went wrong"
- ❌ Problem: Environment variables missing
- ✅ Solution: Visit `/debug` page to check configuration

## Testing Production Deployment

1. Deploy to your hosting platform
2. Visit `https://your-domain.com/debug` to check environment
3. Test newsletter subscription with a real email
4. Check admin panel at `https://your-domain.com/admin/subscribers`

## File Structure Requirements

```
your-app/
├── data/
│   └── subscribers.json    # Must be writable
├── app/
│   ├── api/
│   │   ├── subscribe-newsletter/
│   │   └── admin/subscribers/
│   └── debug/             # For production testing
└── .env.local            # Development only
```

## Security Considerations

- Never commit `.env.local` to version control
- Use App Passwords, not regular Gmail passwords
- Consider rate limiting for production
- Implement proper input validation

## Alternative Storage Options

If file-based storage doesn't work on your hosting platform:

### Database Options
- **Supabase**: Free tier with PostgreSQL
- **PlanetScale**: MySQL with generous free tier  
- **MongoDB Atlas**: Document database
- **Airtable**: Spreadsheet-like database with API

### Implementation Example (Supabase)
```typescript
// Replace file-based storage with Supabase client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function addSubscriber(subscriber: Subscriber) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([subscriber])
  
  if (error) throw error
  return data
}
```

## Monitoring & Analytics

- Set up error monitoring (Sentry, LogRocket)
- Monitor email delivery rates
- Track subscription success/failure rates
- Set up alerts for API failures

---

**Need Help?** 
- Check the `/debug` page for real-time diagnostics
- Review server logs for detailed error messages
- Test locally first to ensure everything works in development
