const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your real secret key
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body.items;

  const line_items = items.map(item => ({
    price_data: {
      currency: 'gbp',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // in pence
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    success_url: 'http://localhost:5500/success.html',
    cancel_url: 'http://localhost:5500/cancel.html',
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log('Server running on port 3000'));
