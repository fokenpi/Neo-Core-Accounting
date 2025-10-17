const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'procore-api',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

async function publishTransaction(event) {
  if (!producer.isConnected()) await producer.connect();
  await producer.send({
    topic: 'transactions',
    messages: [{ key: event.transactionId, value: Buffer.from(JSON.stringify(event)) }]
  });
}

module.exports = { publishTransaction };
