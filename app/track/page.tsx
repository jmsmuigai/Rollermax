'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { db } from '../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck,
  Sparkles,
  AlertCircle 
} from 'lucide-react'
import dynamic from 'next/dynamic'

const MapTracker = dynamic(() => import('../../components/MapTracker'), { ssr: false })

interface TrackingStatus {
  status: string
  location: string
  timestamp: string
  description: string
}

const mockTrackingData: Record<string, {
  trackingNumber: string
  status: string
  currentLocation: string
  estimatedDelivery: string
  history: TrackingStatus[]
  route?: [number, number][]
}> = {
  'RMX123456': {
    trackingNumber: 'RMX123456',
    status: 'In Transit',
    currentLocation: 'Nairobi Distribution Center',
    estimatedDelivery: '2024-01-15',
    history: [
      {
        status: 'Delivered',
        location: 'Mombasa Delivery Hub',
        timestamp: '2024-01-14 14:30',
        description: 'Package delivered to recipient',
      },
      {
        status: 'Out for Delivery',
        location: 'Mombasa Delivery Hub',
        timestamp: '2024-01-14 08:00',
        description: 'Package is out for delivery',
      },
      {
        status: 'In Transit',
        location: 'Nairobi Distribution Center',
        timestamp: '2024-01-13 16:45',
        description: 'Package departed from distribution center',
      },
      {
        status: 'In Transit',
        location: 'Nairobi Hub',
        timestamp: '2024-01-13 10:20',
        description: 'Package arrived at sorting facility',
      },
      {
        status: 'Picked Up',
        location: 'Nairobi Warehouse',
        timestamp: '2024-01-12 15:30',
        description: 'Package picked up from sender',
      },
    ],
    // Simulated route: Eastleigh (Nairobi) -> Thika -> Garissa
    route: [
      [-1.286389, 36.827223], // Nairobi (Eastleigh approx)
      [-1.100000, 36.933333], // en route
      [-1.033333, 37.069111], // Thika
      [-0.500000, 37.900000], // passing
      [-0.456000, 39.648000], // Garissa
    ]
  },
}

function TrackPageContent() {
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = useCallback(async (number?: string) => {
    const num = number || trackingNumber;
    if (!num.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Try to fetch from Firestore first
      const ref = doc(db, 'shipments', num.toUpperCase())
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        // Normalize route to [lat,lng][] if stored as objects
        const route = Array.isArray(data.route)
          ? data.route.map((p: any) => (Array.isArray(p) ? [p[0], p[1]] : [p.lat, p.lng]))
          : undefined

        setTrackingData({
          trackingNumber: data.trackingNumber || num.toUpperCase(),
          status: data.status || 'In Transit',
          currentLocation: data.currentLocation || 'On Route',
          estimatedDelivery: data.estimatedDelivery || new Date().toISOString(),
          history: data.history || [],
          route,
        })
        setIsLoading(false)
        return
      }

      // fallback to mock
      const data = mockTrackingData[num.toUpperCase()];
      if (data) {
        setTrackingData(data);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setTrackingData(null);
      }
    } catch (e) {
      console.error('Error fetching shipment', e)
      setError('Error fetching tracking information')
      setTrackingData(null)
    } finally {
      setIsLoading(false);
    }
  }, [trackingNumber]);

  useEffect(() => {
    const number = searchParams?.get('number');
    if (number) {
      setTrackingNumber(number);
      handleTrack(number);
    }
  }, [searchParams, handleTrack]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-400 bg-green-400/20'
      case 'out for delivery':
        return 'text-blue-400 bg-blue-400/20'
      case 'in transit':
        return 'text-accent bg-accent/20'
      case 'picked up':
        return 'text-purple-400 bg-purple-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return CheckCircle2
      case 'out for delivery':
        return Truck
      case 'in transit':
        return Package
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark pt-20 islamic-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI-Powered Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Track Your <span className="accent-gradient">Shipment</span>
          </h1>
          <p className="text-xl text-gray-300">
            Enter your tracking number to get real-time updates on your package
          </p>
        </motion.div>

        {/* Tracking Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleTrack()
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="Enter tracking number (e.g., RMX123456)"
                className="input-field pl-12 pr-4 py-4 text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Tracking...' : 'Track'}
            </button>
          </form>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center space-x-2 text-red-400 bg-red-400/20 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Tracking Results */}
        {trackingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current Status Card */}
            <div className="card border-2 border-accent/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Tracking Number</p>
                  <p className="text-2xl font-bold text-white">{trackingData.trackingNumber}</p>
                </div>
                <div className={`px-4 py-2 rounded-full inline-flex items-center space-x-2 mt-4 md:mt-0 ${getStatusColor(trackingData.status)}`}>
                  {(() => {
                    const Icon = getStatusIcon(trackingData.status)
                    return <Icon className="w-5 h-5" />
                  })()}
                  <span className="font-semibold">{trackingData.status}</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Location</p>
                  <p className="text-white font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-accent" />
                    {trackingData.currentLocation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Estimated Delivery</p>
                  <p className="text-white font-semibold flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-accent" />
                    {new Date(trackingData.estimatedDelivery).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Tracking History</h2>
              <div className="space-y-4">
                {trackingData.history.map((item: TrackingStatus, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex space-x-4 relative"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                        {(() => {
                          const Icon = getStatusIcon(item.status)
                          return <Icon className="w-6 h-6" />
                        })()}
                      </div>
                      {index < trackingData.history.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-white font-semibold">{item.status}</h3>
                        <p className="text-gray-400 text-sm">{item.timestamp}</p>
                      </div>
                      <p className="text-gray-400 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Map Simulation */}
        {trackingData && trackingData.route && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-white font-bold mb-4">Track on Map</h3>
              <MapTracker route={trackingData.route} center={trackingData.route[0]} zoom={7} satellite />
            </div>
          </motion.div>
        )}

        {/* AI Monitoring Notice */}
        {trackingData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="card bg-gradient-to-br from-accent/10 to-blue-500/10 border-accent/50"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">AI Monitoring Active</h3>
                <p className="text-gray-300 text-sm">
                  Our AI system is continuously monitoring your shipment and will automatically 
                  update you on any changes in delivery status. You'll receive notifications 
                  for any significant updates.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-gray-300">Loading tracking page...</p>
        </div>
      </div>
    }>
      <TrackPageContent />
    </Suspense>
  )
}

