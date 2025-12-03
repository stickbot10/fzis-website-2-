# Fixing 404 Error for API Routes

## The Problem
Vercel is returning 404 for `/api/create-donation-checkout` because the API routes aren't being recognized.

## Solution Applied
1. ✅ Simplified `vercel.json` to let Vercel auto-detect the `api/` folder
2. ✅ Improved error handling in frontend to show better error messages
3. ✅ API files are in the correct location (`api/` folder at root)

## Next Steps

### Option 1: Redeploy (Recommended)
After these changes, you need to redeploy:

1. **If using Git:**
   ```bash
   git add .
   git commit -m "Fix API routes configuration"
   git push
   ```

2. **If using Vercel CLI:**
   ```bash
   vercel --prod
   ```

3. **If using Dashboard:**
   - Go to Vercel Dashboard
   - Click "Redeploy" on your latest deployment
   - Or push new changes to trigger a new deployment

### Option 2: Check Vercel Project Settings

1. Go to Vercel Dashboard → Your Project → Settings
2. Check **Root Directory** - should be `.` (root) or empty
3. Check **Build Command** - should be empty (or `npm install` if needed)
4. Check **Output Directory** - should be empty (Vercel will auto-detect)

### Option 3: Verify API Folder Structure

Make sure your project structure looks like this:
```
fzistemplate/
├── api/
│   ├── create-donation-checkout.js
│   ├── create-enrollment-checkout.js
│   └── verify-session.js
├── public/
│   ├── donate.html
│   ├── payment.html
│   └── ...
├── vercel.json
└── package.json
```

### Option 4: Test API Route Directly

After redeploying, test the API endpoint:
- Visit: `https://www.fzis.org/api/create-donation-checkout`
- You should see: `{"error":"Method not allowed"}` (because it's a GET request, not POST)
- If you see 404, the route still isn't working

## Why This Happens

Vercel automatically detects the `api/` folder and creates serverless functions. However:
- Custom `vercel.json` routing can interfere with auto-detection
- The `builds` section was preventing auto-detection
- Simplified config lets Vercel handle everything automatically

## After Redeploy

Once redeployed, the API routes should work at:
- `https://www.fzis.org/api/create-donation-checkout`
- `https://www.fzis.org/api/create-enrollment-checkout`
- `https://www.fzis.org/api/verify-session`

The 404 error should be resolved!

