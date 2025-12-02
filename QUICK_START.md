# Quick Start Guide - Stripe Integration

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Stripe Keys

1. Sign up for a Stripe account at https://stripe.com
2. Get your API keys from https://dashboard.stripe.com/test/apikeys
3. Set your secret key as an environment variable:

**Windows PowerShell:**
```powershell
$env:STRIPE_SECRET_KEY="sk_test_your_key_here"
```

**Windows CMD:**
```cmd
set STRIPE_SECRET_KEY=sk_test_your_key_here
```

**Linux/Mac:**
```bash
export STRIPE_SECRET_KEY=sk_test_your_key_here
```

## Step 3: Start the Server
```bash
npm start
```

The server will run on http://localhost:3000

## Step 4: Test Payments

### Test Donations
- Go to http://localhost:3000/donate.html
- Enter an amount and click "Donate with Stripe"
- Use test card: `4242 4242 4242 4242`
- Use any future expiry date, any CVC, any postal code

### Test Enrollment
- Go to http://localhost:3000/payment.html
- Click "Pay with Stripe"
- Use the same test card details

## Important Notes

- **Never commit your Stripe secret keys to Git**
- Use test keys (`sk_test_...`) for development
- Switch to live keys (`sk_live_...`) only in production
- The server must be running for payments to work

For detailed setup instructions, see `README_STRIPE_SETUP.md`

