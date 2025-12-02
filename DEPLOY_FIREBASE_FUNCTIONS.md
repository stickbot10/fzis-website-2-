# Deploying Stripe Payments with Firebase Functions

## Step 1: Install Firebase Functions Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
cd ..
```

## Step 2: Set Your Stripe Secret Key

You need to configure your Stripe secret key as a Firebase Functions config variable:

```bash
firebase functions:config:set stripe.secret_key="sk_test_YOUR_STRIPE_SECRET_KEY"
```

**Important:** 
- For testing, use a test key (starts with `sk_test_`)
- For production, use a live key (starts with `sk_live_`)
- Never commit your secret keys to Git

## Step 3: Deploy Functions and Hosting

Deploy everything at once:

```bash
firebase deploy
```

Or deploy just the functions first:

```bash
firebase deploy --only functions
```

Then deploy hosting:

```bash
firebase deploy --only hosting
```

## Step 4: Verify Deployment

After deployment, test your payment flows:

1. **Test Donations:** Visit `https://fzis.org/donate.html`
2. **Test Enrollment:** Visit `https://fzis.org/payment.html`

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date, any 3-digit CVC, any postal code

## Troubleshooting

### Functions Not Deploying
- Make sure you're logged in: `firebase login`
- Check that you have the Firebase Blaze plan (required for Cloud Functions)
- Verify your project ID: `firebase projects:list`

### Payment Endpoints Return 404
- Check that functions are deployed: `firebase functions:list`
- Verify the rewrites in `firebase.json` match the function names
- Check Firebase Console > Functions to see if functions are active

### Stripe Errors
- Verify your Stripe secret key is set correctly: `firebase functions:config:get`
- Check Stripe Dashboard for API errors
- Review function logs: `firebase functions:log`

## Viewing Logs

To see function execution logs:

```bash
firebase functions:log
```

Or view in Firebase Console: https://console.firebase.google.com

## Updating Stripe Key

If you need to update your Stripe secret key:

```bash
firebase functions:config:set stripe.secret_key="sk_test_NEW_KEY"
```

Then redeploy:

```bash
firebase deploy --only functions
```

## Cost Considerations

Firebase Cloud Functions have a free tier, but for production use:
- First 2 million invocations/month: Free
- After that: $0.40 per million invocations
- Make sure you're on the Blaze (pay-as-you-go) plan

## Security Notes

- ✅ Stripe secret keys are stored securely in Firebase Functions config
- ✅ Keys are never exposed to the frontend
- ✅ All payment processing happens server-side
- ✅ CORS is properly configured

