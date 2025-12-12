"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

type Props = {
  route: [number, number][]
  center?: [number, number]
  zoom?: number
  satellite?: boolean
}

const AnimatedMarker: React.FC<{ path: [number, number][] }> = ({ path }) => {
  const map = useMap()
  const markerRef = useRef<L.Marker | null>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (!map || !path || path.length === 0) return

    const icon = L.divIcon({
      className: 'animated-marker',
      html: '<div class="w-8 h-8 rounded-full bg-red-600 shadow-lg border-2 border-white"></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const marker = L.marker(path[0] as L.LatLngExpression, { icon }).addTo(map)
    markerRef.current = marker

    const interval = setInterval(() => {
      indexRef.current += 1
      if (indexRef.current >= path.length) {
        indexRef.current = path.length - 1
        clearInterval(interval)
      }
      const latlng = path[indexRef.current]
      marker.setLatLng(latlng as L.LatLngExpression)
      try {
        map.panTo(latlng as L.LatLngExpression)
      } catch (e) {
        // ignore pan errors in some environments
      }
    }, 1200)

    return () => {
      clearInterval(interval)
      try {
        marker.remove()
      } catch (e) {}
    }
  }, [map, path])

  return null
}

const MapTracker: React.FC<Props> = ({ route, center, zoom = 6, satellite = false }) => {
  const tileUrl = satellite
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={(center as any) || (route[0] as any)} zoom={zoom} style={{ height: '24rem', width: '100%' }}>
        <TileLayer url={tileUrl} />
        <Polyline positions={route} color="#3b82f6" weight={4} opacity={0.9} />
        <Marker position={route[0] as any} />
        <Marker position={route[route.length - 1] as any} />
        <AnimatedMarker path={route} />
      </MapContainer>
    </div>
  )
}

export default MapTracker
