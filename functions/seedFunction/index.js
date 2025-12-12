const admin = require('firebase-admin')
const functions = require('firebase-functions')

// Initialize admin with default credentials on Cloud Functions environment
admin.initializeApp()
const db = admin.firestore()

// Simple seeder to add demo users and shipments
exports.seedDemoData = functions.https.onRequest(async (req, res) => {
  // Basic guard: require a POST and a secret in header
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const secret = req.get('x-seed-secret') || ''
  // Provide your own secret via functions config or env var in deployment
  const expected = process.env.SEED_SECRET || functions.config().seed?.secret || 'change-me-locally'
  if (!secret || secret !== expected) {
    return res.status(403).send('Forbidden')
  }

  try {
    const users = []
    for (let i = 1; i <= 10; i++) {
      users.push({
        uid: `demo-user-${i}`,
        name: `Demo User ${i}`,
        email: `demo${i}@example.com`,
        phone: `+2547000000${i}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }

    const batch = db.batch()
    users.forEach(u => batch.set(db.collection('users').doc(u.uid), u))

    for (let i = 1; i <= 10; i++) {
      const tracking = `RMX${100000 + i}`
      const route = [
        { lat: -1.286389, lng: 36.827223 },
        { lat: -1.033333, lng: 37.069111 },
        { lat: -0.456000, lng: 39.648000 },
      ]
      const doc = {
        trackingNumber: tracking,
        sender: `Demo Sender ${i}`,
        recipient: `Demo Recipient ${i}`,
        status: i % 3 === 0 ? 'Delivered' : 'In Transit',
        currentLocation: i % 3 === 0 ? 'Garissa' : 'On Route',
        estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * (3 + i)).toISOString(),
        route,
        history: [
          { status: 'Created', location: 'Eastleigh', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
          { status: 'Picked', location: 'Nairobi', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
          { status: 'In Transit', location: 'On Route', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
        ],
        weightKg: 5 + i,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }
      batch.set(db.collection('shipments').doc(tracking), doc)
    }

    await batch.commit()
    return res.status(200).send('Seeded demo users and shipments')
  } catch (err) {
    console.error('Seeder error', err)
    return res.status(500).send('Seeder failed')
  }
})
