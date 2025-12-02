const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Stripe Checkout Session for Donations
app.post('/create-donation-checkout', async (req, res) => {
  try {
    const { amount, currency = 'aud' } = req.body;
    
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Donation to Fatima Zahra Islamic School',
              description: 'Your generous donation helps us continue providing quality Islamic education.',
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/thanks.html?type=donation&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/donate.html`,
      metadata: {
        type: 'donation',
        amount: amount.toString(),
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating donation checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Checkout Session for Course Enrollment
app.post('/create-enrollment-checkout', async (req, res) => {
  try {
    const { amount = '300.00', currency = 'aud' } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Fatima Zahra Islamic School - Annual Enrollment',
              description: 'Complete Islamic education package for one year. Includes Quran Recitation, Deniyat Curriculum, Salah Practice, and Learning Materials.',
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/thanks.html?type=enrollment&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/payment.html`,
      metadata: {
        type: 'enrollment',
        amount: amount.toString(),
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating enrollment checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment session
app.get('/verify-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json({ 
      paid: session.payment_status === 'paid',
      amount: session.amount_total / 100,
      currency: session.currency,
      metadata: session.metadata 
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path === '/' ? 'index.html' : req.path));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Make sure to set STRIPE_SECRET_KEY environment variable`);
});

