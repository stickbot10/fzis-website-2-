const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('STRIPE_SECRET_KEY environment variable is not set!');
}

const stripe = require('stripe')(stripeSecretKey);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Stripe key is configured
  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is missing from environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error: Stripe secret key is not configured. Please set STRIPE_SECRET_KEY in Vercel environment variables.' 
    });
  }

  try {
    const { amount = '300.00', currency = 'aud' } = req.body;
    const origin = req.headers.origin || (req.headers.referer ? req.headers.referer.split('/').slice(0, 3).join('/') : 'https://fzis.org');

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
};

