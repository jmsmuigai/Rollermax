"use client"

import React, { useState } from 'react'

export default function SeedClient() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const runSeed = async () => {
    setLoading(true)
    setMessage('')
    try {
      const secret = prompt('Enter seed secret (ask admin)')
      if (!secret) return setMessage('Seed cancelled')
      const resp = await fetch('/api/seed-proxy', {
        method: 'POST',
        headers: { 'x-seed-secret': secret },
      })
      const text = await resp.text()
      setMessage(text)
    } catch (e) {
      setMessage('Seed request failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <p className="text-gray-300 mb-2">Seed demo data into Firestore (admin only)</p>
      <button onClick={runSeed} disabled={loading} className="btn">
        {loading ? 'Seeding…' : 'Run Seeder'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
    </div>
  )
}
