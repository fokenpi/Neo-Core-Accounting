require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');
const transactions = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', auth, transactions);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Pro Core Accounting API' });
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('🚀 API running on port 3000');
});
