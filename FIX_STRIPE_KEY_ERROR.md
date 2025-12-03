# Fix: Stripe API Key Error

## The Problem

You're getting this error:
```
"You did not provide an API key. You need to provide your API key in the Authorization header..."
```

This means `STRIPE_SECRET_KEY` is not set in your Vercel environment variables, or the deployment didn't pick it up.

## Solution: Set Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click on your project (fzis-website or whatever you named it)

### Step 2: Add Environment Variable

1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Click **Add New**
4. Fill in:
   - **Key:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj`
   - **Environment:** Check all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
5. Click **Save**

### Step 3: Redeploy

**IMPORTANT:** After adding the environment variable, you MUST redeploy:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Make sure "Use existing Build Cache" is **unchecked**
5. Click **Redeploy**

**Option B: Via Git**
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

**Option C: Via CLI**
```bash
vercel --prod
```

## Verify It's Set

After redeploying, check:

1. Go to **Settings** → **Environment Variables**
2. You should see `STRIPE_SECRET_KEY` listed
3. The value should start with `sk_test_` or `sk_live_`

## Also Set Publishable Key

While you're at it, also add:

- **Key:** `STRIPE_PUBLISHABLE_KEY`
- **Value:** `pk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj`
- **Environment:** All three (Production, Preview, Development)

## Common Issues

### "I set it but it still doesn't work"
- **Did you redeploy?** Environment variables only take effect after redeployment
- **Did you check all environments?** Make sure Production, Preview, and Development are all checked
- **Is the key correct?** Make sure there are no extra spaces or quotes

### "How do I know if it's working?"
- Check Vercel function logs:
  1. Go to **Functions** tab
  2. Click on `api/create-payment-intent`
  3. Check the logs - you should NOT see "STRIPE_SECRET_KEY is missing" errors

### "I'm using a different Stripe account"
- Get your keys from: https://dashboard.stripe.com/test/apikeys
- Replace the test keys with your own
- Make sure to use the **Secret Key** (starts with `sk_test_` or `sk_live_`)

## After Fixing

Once you've:
1. ✅ Set `STRIPE_SECRET_KEY` in Vercel
2. ✅ Set `STRIPE_PUBLISHABLE_KEY` in Vercel  
3. ✅ Redeployed your project

The payment forms should work! Test at:
- https://www.fzis.org/donate.html
- https://www.fzis.org/payment.html

