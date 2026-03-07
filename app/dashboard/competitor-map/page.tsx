'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'
import { BusinessType } from '@/types'

interface Competitor {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  vicinity?: string
  business_status?: string
  opening_hours?: {
    open_now?: boolean
  }
  price_level?: number
}

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'food', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Professional Services' },
  { value: 'tech', label: 'Technology' },
  { value: 'construction', label: 'Construction' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

const RADIUS_OPTIONS = [
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' },
]

// Canadian city coordinates for quick selection and auto-lookup
const CANADIAN_CITIES = [
  { name: 'Toronto, ON', lat: 43.6532, lng: -79.3832, aliases: ['toronto'] },
  { name: 'Vancouver, BC', lat: 49.2827, lng: -123.1207, aliases: ['vancouver'] },
  { name: 'Calgary, AB', lat: 51.0447, lng: -114.0719, aliases: ['calgary'] },
  { name: 'Montreal, QC', lat: 45.5017, lng: -73.5673, aliases: ['montreal', 'montréal'] },
  { name: 'Ottawa, ON', lat: 45.4215, lng: -75.6972, aliases: ['ottawa'] },
  { name: 'Edmonton, AB', lat: 53.5461, lng: -113.4937, aliases: ['edmonton'] },
  { name: 'Winnipeg, MB', lat: 49.8951, lng: -97.1384, aliases: ['winnipeg'] },
  { name: 'Halifax, NS', lat: 44.6488, lng: -63.5752, aliases: ['halifax'] },
  { name: 'Victoria, BC', lat: 48.4284, lng: -123.3656, aliases: ['victoria'] },
  { name: 'Quebec City, QC', lat: 46.8139, lng: -71.2080, aliases: ['quebec', 'québec', 'quebec city'] },
  { name: 'Saskatoon, SK', lat: 52.1579, lng: -106.6702, aliases: ['saskatoon'] },
  { name: 'Regina, SK', lat: 50.4452, lng: -104.6189, aliases: ['regina'] },
  { name: 'Kitchener, ON', lat: 43.4516, lng: -80.4925, aliases: ['kitchener', 'waterloo', 'kitchener-waterloo'] },
  { name: 'London, ON', lat: 42.9849, lng: -81.2453, aliases: ['london'] },
  { name: 'Hamilton, ON', lat: 43.2557, lng: -79.8711, aliases: ['hamilton'] },
  { name: 'Mississauga, ON', lat: 43.5890, lng: -79.6441, aliases: ['mississauga'] },
  { name: 'Brampton, ON', lat: 43.7315, lng: -79.7624, aliases: ['brampton'] },
  { name: 'Surrey, BC', lat: 49.1913, lng: -122.8490, aliases: ['surrey'] },
  { name: 'Markham, ON', lat: 43.8561, lng: -79.3370, aliases: ['markham'] },
  { name: 'St. John\'s, NL', lat: 47.5615, lng: -52.7126, aliases: ['st. john\'s', 'st johns', 'saint johns'] },
  { name: 'Moncton, NB', lat: 46.0878, lng: -64.7782, aliases: ['moncton'] },
  { name: 'Charlottetown, PE', lat: 46.2382, lng: -63.1311, aliases: ['charlottetown'] },
  { name: 'Whitehorse, YT', lat: 60.7212, lng: -135.0568, aliases: ['whitehorse'] },
  { name: 'Yellowknife, NT', lat: 62.4540, lng: -114.3718, aliases: ['yellowknife'] },
  { name: 'Iqaluit, NU', lat: 63.7467, lng: -68.5170, aliases: ['iqaluit'] },
]

// Helper to find city coordinates by name
const findCityByName = (cityName: string): typeof CANADIAN_CITIES[0] | null => {
  const searchName = cityName.toLowerCase().trim()
  return CANADIAN_CITIES.find(city => 
    city.name.toLowerCase().includes(searchName) ||
    city.aliases.some(alias => alias.toLowerCase() === searchName || searchName.includes(alias))
  ) || null
}

export default function CompetitorMapPage() {
  const { businessProfile } = useBusinessProfile()
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationName, setLocationName] = useState('')
  const [businessType, setBusinessType] = useState<BusinessType>(businessProfile?.businessType || 'food')
  const [radius, setRadius] = useState(5000)
  const [keyword, setKeyword] = useState('')
  
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [error, setError] = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [profileLoaded, setProfileLoaded] = useState(false)

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Add Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Add Leaflet JS
    if (!window.L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  // Initialize map when location is set
  useEffect(() => {
    if (!mapLoaded || !location || !mapRef.current || !window.L) return

    // Clear existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    // Create new map
    const map = window.L.map(mapRef.current).setView([location.lat, location.lng], 14)
    
    // Add tile layer (OpenStreetMap)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Add center marker (user's location)
    const centerIcon = window.L.divIcon({
      html: `<div style="background: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })
    
    window.L.marker([location.lat, location.lng], { icon: centerIcon })
      .addTo(map)
      .bindPopup('<strong>Your Location</strong>')

    // Add radius circle
    window.L.circle([location.lat, location.lng], {
      radius: radius,
      color: '#3B82F6',
      fillColor: '#3B82F6',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(map)

    mapInstanceRef.current = map

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mapLoaded, location, radius])

  // Update markers when competitors change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add competitor markers
    competitors.forEach((competitor, index) => {
      const isOpen = competitor.opening_hours?.open_now
      const markerColor = isOpen === undefined ? '#6B7280' : isOpen ? '#10B981' : '#EF4444'
      
      const icon = window.L.divIcon({
        html: `<div style="background: ${markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${index + 1}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })

      const marker = window.L.marker(
        [competitor.geometry.location.lat, competitor.geometry.location.lng],
        { icon }
      )
        .addTo(mapInstanceRef.current)
        .on('click', () => setSelectedCompetitor(competitor))

      const popupContent = `
        <div style="min-width: 150px;">
          <strong>${competitor.name}</strong>
          ${competitor.rating ? `<div style="color: #F59E0B;">⭐ ${competitor.rating} (${competitor.user_ratings_total || 0})</div>` : ''}
          ${competitor.vicinity ? `<div style="font-size: 12px; color: #6B7280;">${competitor.vicinity}</div>` : ''}
        </div>
      `
      marker.bindPopup(popupContent)

      markersRef.current.push(marker)
    })

    // Fit bounds to show all markers
    if (competitors.length > 0 && location) {
      const bounds = window.L.latLngBounds([
        [location.lat, location.lng],
        ...competitors.map(c => [c.geometry.location.lat, c.geometry.location.lng])
      ])
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [competitors, location])

  // Auto-populate from business profile on mount
  useEffect(() => {
    if (profileLoaded || !businessProfile) return
    
    // Set business type from profile
    if (businessProfile.businessType) {
      setBusinessType(businessProfile.businessType)
    }
    
    // Try to find and set location from profile city
    if (businessProfile.city) {
      const cityMatch = findCityByName(businessProfile.city)
      if (cityMatch) {
        setLocation({ lat: cityMatch.lat, lng: cityMatch.lng })
        setLocationName(`${businessProfile.city}, ${businessProfile.province}`)
      }
    }
    
    setProfileLoaded(true)
  }, [businessProfile, profileLoaded])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please select a city from the list.')
      return
    }

    setIsGettingLocation(true)
    setError('')
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLocationName('Current Location')
        setIsGettingLocation(false)
        setError('')
      },
      (err) => {
        setIsGettingLocation(false)
        // Provide specific error messages based on error code
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please enable location in your browser settings, or select a city below.')
            break
          case err.POSITION_UNAVAILABLE:
            setError('Location unavailable. Please select a city from the list.')
            break
          case err.TIMEOUT:
            setError('Location request timed out. Please try again or select a city.')
            break
          default:
            setError('Unable to get your location. Please select a city below.')
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // Cache for 5 minutes
      }
    )
  }

  const selectCity = (city: typeof CANADIAN_CITIES[0]) => {
    setLocation({ lat: city.lat, lng: city.lng })
    setLocationName(city.name)
  }

  const searchCompetitors = async () => {
    if (!location) {
      setError('Please set a location first')
      return
    }

    setIsLoading(true)
    setError('')
    setSelectedCompetitor(null)

    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          radius,
          businessType,
          keyword: keyword || undefined
        })
      })

      if (!response.ok) throw new Error('Failed to search')

      const data = await response.json()
      setCompetitors(data.results || [])
      setIsDemo(data.isDemo || false)
    } catch (err) {
      setError('Failed to search for competitors')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getSaturationLevel = () => {
    const count = competitors.length
    const areaKm2 = Math.PI * Math.pow(radius / 1000, 2)
    const density = count / areaKm2

    if (count === 0) return null
    if (density > 5) return { level: 'High', color: 'red', message: 'Very competitive area - consider differentiation strategy' }
    if (density > 2) return { level: 'Moderate', color: 'amber', message: 'Some competition - find your niche' }
    return { level: 'Low', color: 'green', message: 'Less saturated - good opportunity!' }
  }

  const saturation = getSaturationLevel()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('Competitor Map')}</h1>
        <p className="text-gray-600">
          {t('See how saturated your area is with similar businesses')}
        </p>
        {businessProfile && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
            <span>🏢</span>
            <span>{t('Showing competitors for')} <strong>{businessProfile.businessName}</strong></span>
            {businessProfile.city && <span className="text-indigo-500">{t('in')} {businessProfile.city}, {businessProfile.province}</span>}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Location Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">📍 {t('Set Your Location')}</h2>
            
            <button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="w-full mb-4 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
            >
              {isGettingLocation ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('Getting Location...')}
                </>
              ) : (
                <><span>📍</span> {t('Use My Location')}</>
              )}
            </button>
            
            {error && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                ⚠️ {error}
              </div>
            )}

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t('or select a city')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CANADIAN_CITIES.map(city => (
                <button
                  key={city.name}
                  onClick={() => selectCity(city)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    locationName === city.name
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {city.name.split(',')[0]}
                </button>
              ))}
            </div>

            {location && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800">
                ✓ {t('Location set')}: {locationName || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
              </div>
            )}
          </div>

          {/* Search Options */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">🔍 {t('Search Options')}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Business Type')}
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {BUSINESS_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{t(type.label)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Search Radius')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {RADIUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setRadius(opt.value)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        radius === opt.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Keyword (optional)')}
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('e.g., pizza, salon, lawyer')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={searchCompetitors}
                disabled={!location || isLoading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('Searching...')}
                  </>
                ) : (
                  <>🔍 {t('Find Competitors')}</>
                )}
              </button>
            </div>
          </div>

          {/* Results Stats */}
          {competitors.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">📊 {t('Analysis')}</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Competitors Found')}</span>
                  <span className="text-2xl font-bold text-gray-900">{competitors.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Search Area')}</span>
                  <span className="font-medium">{(Math.PI * Math.pow(radius / 1000, 2)).toFixed(1)} km²</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('Avg Rating')}</span>
                  <span className="font-medium">
                    ⭐ {competitors.filter(c => c.rating).length > 0
                      ? (competitors.reduce((sum, c) => sum + (c.rating || 0), 0) / competitors.filter(c => c.rating).length).toFixed(1)
                      : 'N/A'}
                  </span>
                </div>

                {saturation && (
                  <div className={`p-4 rounded-lg ${
                    saturation.color === 'red' ? 'bg-red-50' :
                    saturation.color === 'amber' ? 'bg-amber-50' : 'bg-green-50'
                  }`}>
                    <div className={`font-semibold ${
                      saturation.color === 'red' ? 'text-red-800' :
                      saturation.color === 'amber' ? 'text-amber-800' : 'text-green-800'
                    }`}>
                      {saturation.level} Saturation
                    </div>
                    <p className={`text-sm mt-1 ${
                      saturation.color === 'red' ? 'text-red-700' :
                      saturation.color === 'amber' ? 'text-amber-700' : 'text-green-700'
                    }`}>
                      {saturation.message}
                    </p>
                  </div>
                )}
              </div>

              {isDemo && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  ℹ️ Demo mode - showing simulated competitors. Add Google Maps API key for real data.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Container */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div 
              ref={mapRef}
              className="w-full h-[500px] bg-gray-100"
              style={{ minHeight: '500px' }}
            >
              {!location && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🗺️</div>
                    <p className="text-gray-600">Select a location to view the map</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Competitor List */}
          {competitors.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Nearby Competitors ({competitors.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {competitors.map((competitor, index) => (
                  <div
                    key={competitor.place_id}
                    onClick={() => {
                      setSelectedCompetitor(competitor)
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView(
                          [competitor.geometry.location.lat, competitor.geometry.location.lng],
                          16
                        )
                        markersRef.current[index]?.openPopup()
                      }
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCompetitor?.place_id === competitor.place_id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                        competitor.opening_hours?.open_now === undefined ? 'bg-gray-400' :
                        competitor.opening_hours?.open_now ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{competitor.name}</div>
                        <div className="flex items-center gap-2 text-sm">
                          {competitor.rating && (
                            <span className="text-amber-600">
                              ⭐ {competitor.rating} ({competitor.user_ratings_total})
                            </span>
                          )}
                          {competitor.price_level && (
                            <span className="text-gray-500">
                              {'$'.repeat(competitor.price_level)}
                            </span>
                          )}
                        </div>
                        {competitor.vicinity && (
                          <div className="text-xs text-gray-500 truncate mt-1">
                            {competitor.vicinity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 What This Tells You</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <strong>High saturation</strong> — You&apos;ll need a strong differentiator (niche, price, quality, or service) to compete.
          </div>
          <div>
            <strong>Check ratings</strong> — Low-rated competitors = opportunity. Customers are looking for better options.
          </div>
          <div>
            <strong>Clusters matter</strong> — Being near competitors can be good (foot traffic) or bad (price wars).
          </div>
        </div>
      </div>
    </div>
  )
}

// Type declaration for Leaflet
declare global {
  interface Window {
    L: any
  }
}
