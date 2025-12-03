# Fix for 404 API Route Error

## Changes Made

1. ✅ **Updated `vercel.json`** - Added proper routing to handle both API routes and static files
2. ✅ **Improved error handling** - Frontend now shows better error messages
3. ✅ **API routes prioritized** - API routes are checked before static file rewrites

## What You Need to Do

### 1. Redeploy to Vercel

The configuration has been fixed. You need to redeploy:

**Option A: Via Git (if connected)**
```bash
git add .
git commit -m "Fix Vercel API routing"
git push
```

**Option B: Via Vercel Dashboard**
- Go to your Vercel project
- Click "Redeploy" on the latest deployment
- Or go to Settings → Git and trigger a redeploy

**Option C: Via CLI**
```bash
cd C:\Users\stick\Desktop\fzistemplate
vercel --prod
```

### 2. Verify Project Settings in Vercel

Go to Vercel Dashboard → Your Project → Settings:

- **Root Directory:** Should be `.` (empty/root) or leave default
- **Build Command:** Leave empty (or `npm install` if needed)
- **Output Directory:** Leave empty (Vercel auto-detects)
- **Install Command:** `npm install` (if not auto-detected)

### 3. Test After Redeploy

After redeploying, test:

1. **Test API endpoint directly:**
   - Visit: `https://www.fzis.org/api/create-donation-checkout`
   - Should see: `{"error":"Method not allowed"}` (because it's GET, not POST)
   - If you see 404, the route still isn't working

2. **Test donation page:**
   - Visit: `https://www.fzis.org/donate.html`
   - Try making a donation
   - Should redirect to Stripe Checkout

## How the Fix Works

The `vercel.json` now:
1. First checks if the route starts with `/api/` → routes to API functions
2. Otherwise → routes to files in `public/` folder

This ensures:
- ✅ API routes work: `/api/create-donation-checkout`
- ✅ Static files work: `/donate.html`, `/index.html`, etc.
- ✅ No conflicts between API and static routes

## If Still Getting 404

If you still get 404 after redeploying:

1. **Check Vercel Functions tab:**
   - Go to Vercel Dashboard → Your Project → Functions
   - You should see: `api/create-donation-checkout`, `api/create-enrollment-checkout`, etc.
   - If they're missing, the `api/` folder isn't being detected

2. **Check file structure:**
   - Make sure `api/` folder is at the root level (same level as `public/`)
   - Files should be: `api/create-donation-checkout.js` (not in a subfolder)

3. **Check environment variable:**
   - Settings → Environment Variables
   - `STRIPE_SECRET_KEY` should be set
   - Available in all environments (Production, Preview, Development)

4. **Check Vercel logs:**
   - Go to Functions tab → Click on a function → View logs
   - Look for any errors

## Expected Behavior After Fix

✅ `/api/create-donation-checkout` → Returns JSON (not 404)  
✅ `/api/create-enrollment-checkout` → Returns JSON (not 404)  
✅ `/donate.html` → Shows donation page  
✅ Clicking "Donate" → Redirects to Stripe Checkout  

The 404 error should be completely resolved after redeploying!

