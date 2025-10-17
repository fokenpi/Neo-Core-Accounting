const express = require('express');
const { publishTransaction } = require('../kafka/producer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/', async (req, res) => {
  const { accountId, amount } = req.body;
  if (!accountId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'accountId and positive amount required' });
  }

  const event = {
    transactionId: uuidv4(),
    userId: req.user.uid,
    accountId,
    amount,
    currency: 'USD',
    timestamp: Date.now(),
    eventType: 'TransactionPosted'
  };

  await publishTransaction(event);
  res.status(202).json({ transactionId: event.transactionId });
});

module.exports = router;
