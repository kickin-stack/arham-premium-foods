const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  { id: 1, name: 'Organic Honey', category: 'Pantry', price: 10.0, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Dry Fruits Mix', category: 'Snacks', price: 15.0, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Herbal Green Tea', category: 'Beverages', price: 8.0, image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Cold-Pressed Mustard Oil', category: 'Pantry', price: 12.0, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Millet Flour', category: 'Staples', price: 7.0, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Organic Turmeric Powder', category: 'Spices', price: 6.0, image: 'https://images.unsplash.com/photo-1615485925934-7f46f50f8a2e?auto=format&fit=crop&w=600&q=80' }
];

const orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body;
  if (!customer || !customer.name || !customer.email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order payload.' });
  }

  const normalized = items
    .map((item) => {
      const product = products.find((p) => p.id === Number(item.productId));
      const qty = Number(item.qty);
      if (!product || !qty || qty < 1) return null;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        lineTotal: Number((product.price * qty).toFixed(2))
      };
    })
    .filter(Boolean);

  if (!normalized.length) {
    return res.status(400).json({ error: 'No valid order items.' });
  }

  const subtotal = normalized.reduce((s, i) => s + i.lineTotal, 0);
  const deliveryFee = 4;
  const total = Number((subtotal + deliveryFee).toFixed(2));

  const order = {
    id: orders.length + 1,
    createdAt: new Date().toISOString(),
    customer,
    items: normalized,
    subtotal: Number(subtotal.toFixed(2)),
    deliveryFee,
    total,
    status: 'placed'
  };

  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Arham Premium Foods server running on http://localhost:${PORT}`);
});
