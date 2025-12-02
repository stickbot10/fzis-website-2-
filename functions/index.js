const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Stripe Checkout Session for Donations
exports.createDonationCheckout = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { amount, currency = 'aud' } = req.body;
      
      if (!amount || amount < 1) {
        return res.status(400).json({ error: 'Invalid donation amount' });
      }

      const origin = req.headers.origin || 'https://fzis.org';
      
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
              unit_amount: Math.round(parseFloat(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/thanks.html?type=donation&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate.html`,
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
});

// Stripe Checkout Session for Course Enrollment
exports.createEnrollmentCheckout = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { amount = '300.00', currency = 'aud' } = req.body;
      const origin = req.headers.origin || 'https://fzis.org';

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
              unit_amount: Math.round(parseFloat(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/thanks.html?type=enrollment&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment.html`,
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
});

// Verify payment session
exports.verifySession = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Extract sessionId from URL path (e.g., /verify-session/cs_test_xxx)
      // or from query parameter
      let sessionId = req.query.sessionId;
      
      if (!sessionId) {
        // Try to extract from path: /verify-session/SESSION_ID
        const pathParts = req.path.split('/');
        const sessionIndex = pathParts.indexOf('verify-session');
        if (sessionIndex !== -1 && pathParts[sessionIndex + 1]) {
          sessionId = pathParts[sessionIndex + 1];
        }
      }
      
      if (!sessionId) {
        return res.status(400).json({ error: 'Session ID required' });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
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
});

