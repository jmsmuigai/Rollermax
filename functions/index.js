const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize admin
if (!admin.apps.length) {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON || process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (key) {
    try {
      const parsed = typeof key === 'string' ? JSON.parse(key) : key;
      admin.initializeApp({ credential: admin.credential.cert(parsed) });
    } catch (e) {
      console.error('Failed to parse service account key', e);
      admin.initializeApp();
    }
  } else {
    admin.initializeApp();
  }
}

const db = admin.firestore();
const corsHandler = cors({ origin: true });

// Secure HTTP function: verify Firebase ID token and check admin claim
exports.listUsers = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // Get Firebase ID token from Authorization header
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'unauthorized: missing token' });
    }

    const idToken = authHeader.substring(7);

    try {
      // Verify the token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const adminClaim = decodedToken.admin === true;

      if (!adminClaim) {
        return res.status(403).json({ error: 'forbidden: not admin' });
      }

      // User is admin; fetch users list
      const snap = await db.collection('users').get();
      const users = snap.docs.map(d => {
        const data = d.data();
        return {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          provider: data.provider || null,
          createdAt: data.createdAt || null
        };
      });

      res.json({ ok: true, users, count: users.length });
    } catch (e) {
      console.error('Token verification failed:', e);
      res.status(401).json({ error: 'unauthorized: invalid token' });
    }
  });
});
