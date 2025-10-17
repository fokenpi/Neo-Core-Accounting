const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('../firebase-service-account.json')),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decoded.uid };
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyFirebaseToken;
