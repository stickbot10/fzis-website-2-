# Stripe Elements Embedded Payment Form Setup

## ✅ Changes Completed

1. **Created new API endpoints:**
   - `api/create-payment-intent.js` - Creates payment intents for embedded payments
   - `api/confirm-payment.js` - Confirms payment status
   - `api/get-publishable-key.js` - Returns Stripe publishable key

2. **Updated frontend pages:**
   - `public/donate.html` - Now shows embedded Stripe card form
   - `public/payment.html` - Now shows embedded Stripe card form

3. **Features:**
   - Payment form appears inline on your website (no redirect)
   - Styled to match your Bootstrap theme
   - Card validation and error handling
   - Email collection
   - Secure payment processing

## Environment Variables Needed

In your Vercel project, you need to set:

1. **STRIPE_SECRET_KEY** (already set)
   - Your Stripe secret key: `sk_test_...` or `sk_live_...`

2. **STRIPE_PUBLISHABLE_KEY** (NEW - needs to be set)
   - Your Stripe publishable key: `pk_test_...` or `pk_live_...`
   - Get it from: https://dashboard.stripe.com/test/apikeys (or live keys for production)

## How to Set STRIPE_PUBLISHABLE_KEY

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add new variable:
   - **Name:** `STRIPE_PUBLISHABLE_KEY`
   - **Value:** `pk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj`
   - **Environment:** Select all (Production, Preview, Development)
4. Click Save
5. **Redeploy** your project for the change to take effect

## How It Works

1. User clicks "Continue to Payment" button
2. Frontend creates a payment intent via `/api/create-payment-intent`
3. Stripe Elements card form appears on the page
4. User enters card details
5. On submit, payment is processed securely
6. User is redirected to thank you page on success

## Styling

The payment form is styled to match your website:
- Uses Bootstrap classes
- Matches your accent color (`var(--accent-color)`)
- Responsive design
- Card form styled with Stripe Elements

## Testing

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)
- Use any postal code

## Important Notes

- The publishable key is safe to expose in frontend code
- The secret key stays secure on the server
- All payment processing happens securely through Stripe
- No card data touches your server

## After Setting Environment Variable

1. Redeploy your Vercel project
2. Test the donation page: `https://www.fzis.org/donate.html`
3. Test the enrollment page: `https://www.fzis.org/payment.html`

The embedded payment forms should now work perfectly! 🎉

