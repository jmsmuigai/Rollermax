"use client"

import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { seedShipments } from '../lib/seed-data'
import { RefreshCw, Database } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  'Delivered': '#10b981',
  'In Transit': '#3b82f6',
  'Pending': '#f59e0b',
  'Delayed': '#ef4444',
}

export default function Reports() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{
    total: number
    byStatus: Record<string, number>
    avgDeliveryDays: number
    chartData: Array<{ name: string; value: number; color: string }>
  } | null>(null)

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
        const chartData = Object.entries(byStatus).map(([k, v]) => ({
          name: k,
          value: v,
          color: STATUS_COLORS[k] || '#8b5cf6',
        }))
        setStats({ total, byStatus, avgDeliveryDays, chartData })
      } catch (e) {
        console.error('Reports load failed', e)
        setStats({ total: 0, byStatus: {}, avgDeliveryDays: 0, chartData: [] })
      } finally { setLoading(false) }
    }
    load()
  }, [])

  if (loading) return <div className="text-gray-300 p-4">Loading reports...</div>
  if (!stats || stats.total === 0) return (
    <div className="text-gray-300 p-12 text-center bg-white/5 rounded-3xl border border-white/10">
      <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">No Report Data</h3>
      <p className="text-gray-500 mb-8">It looks like there are no shipments in the database yet.</p>
      <button 
        onClick={async () => {
          setLoading(true);
          await seedShipments();
          window.location.reload();
        }}
        className="btn-primary flex items-center gap-2 mx-auto"
      >
        <RefreshCw size={18} /> Seed Sample Data
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card p-6">
          <p className="text-sm text-gray-400 mb-2">Total Shipments</p>
          <p className="text-4xl font-bold text-accent">{stats.total}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-400 mb-2">Avg Delivery (days)</p>
          <p className="text-4xl font-bold text-blue-400">{stats.avgDeliveryDays}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-400 mb-2">Statuses Tracked</p>
          <p className="text-4xl font-bold text-purple-400">{Object.keys(stats.byStatus).length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Bar Chart */}
        <div className="card p-6">
          <h4 className="text-lg font-bold text-white mb-4">Shipments by Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie Chart */}
        <div className="card p-6">
          <h4 className="text-lg font-bold text-white mb-4">Status Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status List */}
      <div className="card p-6">
        <h4 className="text-lg font-bold text-white mb-4">Breakdown</h4>
        <div className="space-y-2">
          {stats.chartData.map(item => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-white font-medium">{item.name}</span>
              </div>
              <span className="text-white/80 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
