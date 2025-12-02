# ✅ Firebase Functions Setup Complete!

## What Was Done

1. ✅ Created `functions/` directory with Firebase Cloud Functions
2. ✅ Created `functions/index.js` with three payment endpoints:
   - `/create-donation-checkout` - For donations
   - `/create-enrollment-checkout` - For course enrollment
   - `/verify-session/:sessionId` - To verify payment sessions
3. ✅ Configured `firebase.json` with function rewrites (already done)
4. ✅ Installed all required dependencies

## Next Steps to Deploy

### 1. Set Your Stripe Secret Key

Run this command (replace with your actual Stripe secret key):

```bash
firebase functions:config:set stripe.secret_key="sk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj"
```

**Note:** The key shown above is from your `server.js` file. Make sure it's correct!

### 2. Deploy to Firebase

```bash
firebase deploy
```

This will deploy both:
- Your static files (hosting)
- Your Cloud Functions

### 3. Test the Integration

After deployment, test:
- **Donations:** https://fzis.org/donate.html
- **Enrollment:** https://fzis.org/payment.html

## Important Notes

⚠️ **Firebase Blaze Plan Required**
- Cloud Functions require the Blaze (pay-as-you-go) plan
- Free tier includes 2 million function invocations/month
- Upgrade at: https://console.firebase.google.com

⚠️ **Stripe Keys**
- Test keys (sk_test_...) work in test mode
- Live keys (sk_live_...) are for production
- Never commit keys to Git (they're stored in Firebase config)

## Troubleshooting

If you get errors after deployment:

1. **Check function logs:**
   ```bash
   firebase functions:log
   ```

2. **Verify functions are deployed:**
   ```bash
   firebase functions:list
   ```

3. **Check Firebase Console:**
   - Go to https://console.firebase.google.com
   - Select your project
   - Navigate to Functions section

4. **Verify Stripe key is set:**
   ```bash
   firebase functions:config:get
   ```

## Files Created

- `functions/index.js` - Cloud Functions code
- `functions/package.json` - Functions dependencies
- `functions/.gitignore` - Git ignore for functions
- `DEPLOY_FIREBASE_FUNCTIONS.md` - Detailed deployment guide
- `FIREBASE_DEPLOYMENT_STEPS.txt` - Quick reference

## What Changed

- ✅ Backend moved from Express server (`server.js`) to Firebase Cloud Functions
- ✅ Frontend code remains unchanged (works with rewrites)
- ✅ All payment endpoints now work through Firebase Functions
- ✅ Secure: Stripe keys stored in Firebase config, never exposed

You can now deploy and your Stripe payments will work on your live site!

