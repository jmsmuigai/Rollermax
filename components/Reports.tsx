"use client"

import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, limit } from 'firebase/firestore'

export default function Reports() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{ total: number; byStatus: Record<string, number>; avgDeliveryDays: number } | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const q = query(collection(db, 'shipments'), limit(200))
        const snaps = await getDocs(q)
        const rows = snaps.docs.map(d => d.data() as any)
        const total = rows.length
        const byStatus: Record<string, number> = {}
        let totalDays = 0
        let countDates = 0
        rows.forEach(r => {
          const s = (r.status || 'unknown')
          byStatus[s] = (byStatus[s] || 0) + 1
          if (r.createdAt && r.estimatedDelivery) {
            try {
              const created = new Date(r.createdAt.seconds ? r.createdAt.seconds * 1000 : r.createdAt)
              const est = new Date(r.estimatedDelivery)
              const days = (est.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
              if (Number.isFinite(days)) { totalDays += days; countDates += 1 }
            } catch (e) {}
          }
        })
        const avgDeliveryDays = countDates ? Math.round(totalDays / countDates) : 0
        setStats({ total, byStatus, avgDeliveryDays })
      } catch (e) {
        console.error('Reports load failed', e)
        setStats({ total: 0, byStatus: {}, avgDeliveryDays: 0 })
      } finally { setLoading(false) }
    }
    load()
  }, [])

  if (loading) return <div className="text-gray-300">Loading reports...</div>
  if (!stats) return <div className="text-gray-300">No report data</div>

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-4">Shipment Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">Total Shipments</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">Average Delivery Days</p>
          <p className="text-2xl font-bold text-white">{stats.avgDeliveryDays}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">By Status</p>
          <ul className="mt-2 space-y-1">
            {Object.entries(stats.byStatus).map(([k,v]) => (
              <li key={k} className="flex justify-between text-white/90">
                <span>{k}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
