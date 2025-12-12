"use client"

import React, { useEffect, useState } from 'react'
import MapTracker from './MapTracker'
import { db } from '../lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

type Props = {
  trackingNumber: string
  satellite?: boolean
}

export default function LiveTracker({ trackingNumber, satellite = true }: Props) {
  const [route, setRoute] = useState<[number, number][] | null>(null)
  const [loading, setLoading] = useState(true)
  const id = trackingNumber.toUpperCase()

  useEffect(() => {
    setLoading(true)
    const ref = doc(db, 'shipments', id)
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setRoute(null)
        setLoading(false)
        return
      }
      const data = snap.data() as any
      const r = Array.isArray(data.route) ? data.route.map((p: any) => (Array.isArray(p) ? [p[0], p[1]] : [p.lat, p.lng])) : null
      setRoute(r)
      setLoading(false)
    }, (err) => {
      console.error('LiveTracker snapshot error', err)
      setLoading(false)
    })

    return () => unsub()
  }, [id])

  if (loading) return <div className="text-gray-300">Loading live tracker...</div>
  if (!route || route.length === 0) return <div className="text-gray-300">No route available for {trackingNumber}</div>

  return <MapTracker route={route} center={route[0]} satellite={satellite} zoom={7} />
}
