# Stripe Payment Integration Setup

This project has been configured to use Stripe for processing donations and course enrollment payments.

## Setup Instructions

### 1. Create a Stripe Account
- Go to [https://stripe.com](https://stripe.com) and create an account
- Complete the account setup process

### 2. Get Your Stripe API Keys
- Log in to your Stripe Dashboard
- Navigate to **Developers** > **API keys**
- Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)
- Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)

### 3. Configure Environment Variables

#### Option A: Using .env file (Recommended)
1. Copy `.env.example` to `.env`
2. Add your Stripe keys:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   PORT=3000
   ```

#### Option B: Set Environment Variables Directly
- **Windows (PowerShell):**
  ```powershell
  $env:STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
  ```

- **Windows (CMD):**
  ```cmd
  set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
  ```

- **Linux/Mac:**
  ```bash
  export STRIPE_SECRET_KEY=sk_test_your_secret_key_here
  ```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your environment variables).

## Testing

### Test Mode
- Use test API keys (starting with `sk_test_` and `pk_test_`)
- Use Stripe test card numbers:
  - **Success:** `4242 4242 4242 4242`
  - **Decline:** `4000 0000 0000 0002`
  - Use any future expiry date, any 3-digit CVC, and any postal code

### Production Mode
- Switch to live API keys (starting with `sk_live_` and `pk_live_`)
- Update the keys in your environment variables
- Restart the server

## Payment Flows

### Donations (`/donate.html`)
- Users can enter any donation amount (minimum $1 AUD)
- Payment is processed through Stripe Checkout
- Redirects to thank you page on success

### Course Enrollment (`/payment.html`)
- Fixed amount: $300.00 AUD per year
- Payment is processed through Stripe Checkout
- Redirects to thank you page on success

## Deployment

### Deploying the Backend Server

You'll need to deploy the `server.js` file to a hosting service that supports Node.js. Options include:

1. **Heroku**
   - Add your Stripe secret key as a config variable
   - Deploy using Git

2. **Vercel**
   - Create a `vercel.json` configuration
   - Add environment variables in Vercel dashboard

3. **AWS/Google Cloud/Azure**
   - Deploy as a Node.js application
   - Set environment variables in your hosting platform

4. **Firebase Functions** (if using Firebase)
   - Convert the server endpoints to Firebase Cloud Functions
   - Set environment variables in Firebase Console

### Important Notes

- **Never commit your Stripe secret keys to version control**
- Always use environment variables for sensitive keys
- Test thoroughly in test mode before switching to live mode
- The frontend files in `public/` can be deployed to any static hosting (Firebase Hosting, Netlify, etc.)
- The backend server (`server.js`) must be deployed separately to a Node.js hosting service

## Troubleshooting

### Payment Not Processing
- Verify your Stripe secret key is correct
- Check that the server is running and accessible
- Check browser console for JavaScript errors
- Verify CORS settings if accessing from a different domain

### Checkout Not Redirecting
- Ensure the `success_url` and `cancel_url` in `server.js` match your domain
- Check that the server endpoints are accessible

## Support

For Stripe-specific issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Support](https://support.stripe.com)

