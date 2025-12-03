module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return publishable key from environment variable
  // You should set STRIPE_PUBLISHABLE_KEY in Vercel environment variables
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51SZrESH61BLdlliV0qEnUvkXpzcoeCUB6UQ6GYdGjtJSXIUJxI5bMjxw0vofdu5JquIKkqSLNvVMDuV4tyAiSo0G00gq2k44wj';
  
  res.json({ publishableKey });
};

