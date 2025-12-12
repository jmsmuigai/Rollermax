/**
 * Simple Firestore seeding script for Rollermax demo data.
 * Usage: NODE_ENV=development node scripts/seed-firestore.js
 * Requires GOOGLE_APPLICATION_CREDENTIALS env var pointing to service account JSON
 */

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const fs = require('fs')

async function main() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (!keyPath || !fs.existsSync(keyPath)) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to a valid service account JSON file')
    process.exit(1)
  }

  initializeApp({
    credential: cert(require(keyPath)),
  })

  const db = getFirestore()

  // Create 10 demo users
  const users = []
  for (let i = 1; i <= 10; i++) {
    users.push({
      uid: `demo-user-${i}`,
      name: `Demo User ${i}`,
      email: `demo${i}@example.com`,
      phone: `+2547000000${i}`,
      createdAt: new Date(),
    })
  }

  const batch = db.batch()

  users.forEach((u) => {
    const ref = db.collection('users').doc(u.uid)
    batch.set(ref, u)
  })

  // Create 10 demo shipments with simple Eastleigh -> Thika -> Garissa route
  const shipments = []
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
      route: route,
      history: [
        { status: 'Created', location: 'Eastleigh', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
        { status: 'Picked', location: 'Nairobi', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
        { status: 'In Transit', location: 'On Route', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
      ],
      weightKg: 5 + i,
      createdAt: new Date(),
    }

    shipments.push({ ref: db.collection('shipments').doc(tracking), data: doc })
  }

  shipments.forEach((s) => {
    batch.set(s.ref, s.data)
  })

  await batch.commit()
  console.log('Seeded users and shipments to Firestore')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
