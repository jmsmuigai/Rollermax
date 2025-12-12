const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize admin with service account JSON from env (set by CI or hosting)
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

// Simple HTTP function that returns the list of users from Firestore 'users' collection.
// Protect with header 'x-admin-key' equal to ADMIN_API_KEY env var.
exports.listUsers = functions.https.onRequest(async (req, res) => {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.get('x-admin-key');
  if (!adminKey || provided !== adminKey) {
    return res.status(403).json({ error: 'forbidden' });
  }

  try {
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
    res.json({ ok: true, users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal' });
  }
});
