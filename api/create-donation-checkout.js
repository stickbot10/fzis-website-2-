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
    const { amount, currency = 'aud' } = req.body;
    
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    const origin = req.headers.origin || (req.headers.referer ? req.headers.referer.split('/').slice(0, 3).join('/') : 'https://fzis.org');
    
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
};

