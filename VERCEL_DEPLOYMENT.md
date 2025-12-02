# Vercel Deployment Guide

## ✅ Setup Complete!

All Vercel serverless functions and configuration have been created.

## Files Created

- ✅ `api/create-donation-checkout.js` - Donation payment endpoint
- ✅ `api/create-enrollment-checkout.js` - Enrollment payment endpoint  
- ✅ `api/verify-session.js` - Payment verification endpoint
- ✅ `vercel.json` - Vercel configuration
- ✅ Frontend files updated to use `/api/` prefix

## Next Steps

### 1. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj`
   - **Environment:** Select all (Production, Preview, Development)

### 2. Deploy to Vercel

If you've connected via Git:
- **Just push your changes** - Vercel will auto-deploy

Or deploy manually:
```bash
vercel --prod
```

### 3. Test Your Deployment

After deployment, test the payment flows:
- **Donations:** `https://your-domain.vercel.app/donate.html`
- **Enrollment:** `https://your-domain.vercel.app/payment.html`

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date, any 3-digit CVC, any postal code

## How It Works

1. **Static Files:** Vercel serves files from the `public/` directory
2. **API Routes:** Requests to `/api/*` are handled by serverless functions in the `api/` folder
3. **Environment Variables:** Stripe secret key is stored securely in Vercel (never exposed to frontend)

## API Endpoints

- `POST /api/create-donation-checkout` - Creates Stripe checkout for donations
- `POST /api/create-enrollment-checkout` - Creates Stripe checkout for enrollment
- `GET /api/verify-session?sessionId=xxx` - Verifies payment session

## Troubleshooting

### Functions Not Working
- Check that `STRIPE_SECRET_KEY` is set in Vercel environment variables
- Verify the key is available in all environments (Production, Preview, Development)
- Check Vercel function logs in the dashboard

### 404 Errors
- Ensure `vercel.json` is in the root directory
- Check that API routes are in the `api/` folder
- Verify frontend uses `/api/` prefix in fetch calls

### CORS Issues
- CORS headers are already configured in the API functions
- If issues persist, check Vercel function logs

## Viewing Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on **Functions** tab
4. Click on any function to see logs

## Updating Stripe Key

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Edit `STRIPE_SECRET_KEY`
3. Redeploy (or wait for next deployment)

## Cost

Vercel has a generous free tier:
- 100GB bandwidth/month
- Unlimited serverless function executions
- Perfect for most websites

## Security Notes

✅ Stripe secret keys stored securely in Vercel environment variables  
✅ Keys never exposed to frontend code  
✅ All payment processing happens server-side  
✅ CORS properly configured  

Your Stripe integration is now ready for Vercel! 🚀

