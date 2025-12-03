# Fixing 404 Error - Step by Step Guide

## ⚠️ Important: Changes Are Local Only!

**When I make code changes, they are saved to your local files but NOT automatically pushed to GitHub or deployed to Vercel.**

You need to manually commit and push the changes for Vercel to see them.

## Step 1: Commit and Push Changes

Run these commands in your terminal:

```bash
# Check what files changed
git status

# Add the changed files
git add api/hello.js vercel.json

# Commit the changes
git commit -m "Fix API routes: update hello.js to CommonJS and fix vercel.json routing"

# Push to GitHub (this triggers Vercel auto-deploy)
git push
```

**OR** if you prefer to add all changes:
```bash
git add .
git commit -m "Fix API routes configuration"
git push
```

## Step 2: Wait for Vercel to Deploy

After pushing:
1. Go to your Vercel Dashboard
2. You should see a new deployment starting
3. Wait for it to complete (usually 1-2 minutes)

## Step 3: Verify Vercel Project Settings

Go to **Vercel Dashboard → Your Project → Settings → General**:

### Critical Settings:
- **Root Directory:** Must be `.` (a single dot) or **completely empty/blank**
  - ❌ NOT `/` 
  - ❌ NOT `fzistemplate`
  - ✅ Just `.` or leave it blank
  
- **Build Command:** Leave **empty** (or `npm install` if needed)
- **Output Directory:** Leave **empty** (Vercel auto-detects)
- **Install Command:** Can be `npm install` or empty

## Step 4: Check Functions Tab

After deployment, go to **Vercel Dashboard → Your Project → Functions** tab.

You should see:
- ✅ `api/hello`
- ✅ `api/create-donation-checkout`
- ✅ `api/create-enrollment-checkout`
- ✅ `api/verify-session`

**If these are missing**, the `api/` folder isn't being detected. This usually means:
- Root Directory is set incorrectly
- The `api/` folder isn't at the root level
- There's a build issue

## Step 5: Test the API

After deployment completes, test:

1. **Test hello endpoint:**
   ```
   https://www.fzis.org/api/hello
   ```
   Should return: `{"message":"hello from vercel"}`

2. **Test checkout endpoint (GET should fail, but not 404):**
   ```
   https://www.fzis.org/api/create-enrollment-checkout
   ```
   Should return: `{"error":"Method not allowed"}` (not 404!)

3. **Test payment page:**
   - Go to: `https://www.fzis.org/payment.html`
   - Click "Pay with Stripe"
   - Should redirect to Stripe (not show 404 error)

## If Still Getting 404 After All Steps

### Option A: Check Deployment Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the "Build Logs" and "Function Logs" for errors

### Option B: Try Manual Deploy
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

### Option C: Verify File Structure
Make sure your project looks like this at the root:
```
fzistemplate/
├── api/                    ← Must be at root
│   ├── hello.js
│   ├── create-donation-checkout.js
│   ├── create-enrollment-checkout.js
│   └── verify-session.js
├── public/                 ← Must be at root
│   ├── index.html
│   ├── payment.html
│   └── ...
├── vercel.json            ← Must be at root
└── package.json           ← Must be at root
```

### Option D: Check Environment Variables
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure `STRIPE_SECRET_KEY` is set
3. Make sure it's available for **Production** environment

## Current vercel.json Configuration

The current `vercel.json` only rewrites specific file types to avoid interfering with API routes. This should work because:

1. Vercel processes serverless functions (from `api/` folder) **FIRST**
2. Then it processes static files
3. Then it applies rewrites

So API routes should work even with the rewrite, but we made it more specific to be safe.

## Summary

**The most common cause of 404 errors:**
1. ❌ Changes not committed/pushed to GitHub
2. ❌ Root Directory set incorrectly in Vercel
3. ❌ API folder not detected (check Functions tab)

**After fixing these, the API routes should work!**

