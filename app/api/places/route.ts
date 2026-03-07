import { NextRequest, NextResponse } from 'next/server'

// Support both server-side and public env variable names
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

// Map business types to Google Places types
const BUSINESS_TYPE_TO_PLACES: Record<string, string[]> = {
  food: ['restaurant', 'cafe', 'bakery', 'bar', 'meal_delivery', 'meal_takeaway'],
  retail: ['store', 'clothing_store', 'shoe_store', 'jewelry_store', 'furniture_store', 'home_goods_store'],
  services: ['accounting', 'lawyer', 'insurance_agency', 'real_estate_agency', 'travel_agency'],
  tech: ['electronics_store', 'computer_store'],
  construction: ['general_contractor', 'electrician', 'plumber', 'roofing_contractor'],
  health: ['doctor', 'dentist', 'physiotherapist', 'gym', 'spa', 'beauty_salon'],
  education: ['school', 'university', 'library', 'tutoring'],
  other: ['store', 'establishment'],
}

export async function POST(request: NextRequest) {
  try {
    const { lat, lng, radius, businessType, keyword } = await request.json()

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Location coordinates required' },
        { status: 400 }
      )
    }

    if (!GOOGLE_MAPS_API_KEY) {
      // Return mock data for demo if no API key
      return NextResponse.json({
        results: generateMockResults(lat, lng, radius, businessType),
        status: 'OK',
        isDemo: true
      })
    }

    // Get place types for the business category
    const placeTypes = BUSINESS_TYPE_TO_PLACES[businessType] || BUSINESS_TYPE_TO_PLACES.other

    // Search for each place type and combine results
    const allResults: any[] = []
    
    for (const type of placeTypes.slice(0, 3)) { // Limit to 3 types to avoid rate limits
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
      url.searchParams.set('location', `${lat},${lng}`)
      url.searchParams.set('radius', String(radius || 5000))
      url.searchParams.set('type', type)
      if (keyword) {
        url.searchParams.set('keyword', keyword)
      }
      url.searchParams.set('key', GOOGLE_MAPS_API_KEY)

      const response = await fetch(url.toString())
      const data = await response.json()

      if (data.results) {
        allResults.push(...data.results)
      }
    }

    // Remove duplicates by place_id
    const uniqueResults = allResults.reduce((acc, curr) => {
      if (!acc.find((r: any) => r.place_id === curr.place_id)) {
        acc.push(curr)
      }
      return acc
    }, [])

    return NextResponse.json({
      results: uniqueResults.slice(0, 50), // Limit to 50 results
      status: 'OK',
      isDemo: false
    })
  } catch (error) {
    console.error('Places API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    )
  }
}

// Generate mock data for demo purposes
function generateMockResults(lat: number, lng: number, radius: number, businessType: string) {
  const mockBusinesses = [
    { name: 'Maple Leaf Cafe', rating: 4.5, user_ratings_total: 127 },
    { name: 'Northern Lights Restaurant', rating: 4.2, user_ratings_total: 89 },
    { name: 'True North Bakery', rating: 4.8, user_ratings_total: 234 },
    { name: 'Beaver Creek Bistro', rating: 3.9, user_ratings_total: 56 },
    { name: 'Rocky Mountain Grill', rating: 4.1, user_ratings_total: 178 },
    { name: 'Pacific Rim Kitchen', rating: 4.6, user_ratings_total: 312 },
    { name: 'Prairie Fields Eatery', rating: 4.0, user_ratings_total: 67 },
    { name: 'Great Lakes Diner', rating: 3.7, user_ratings_total: 43 },
    { name: 'Atlantic Coast Cafe', rating: 4.3, user_ratings_total: 156 },
    { name: 'Yukon Gold Restaurant', rating: 4.4, user_ratings_total: 98 },
    { name: 'Ontario Harvest Kitchen', rating: 4.2, user_ratings_total: 201 },
    { name: 'Quebec Bistro', rating: 4.7, user_ratings_total: 167 },
    { name: 'Maritime Fresh', rating: 4.0, user_ratings_total: 78 },
    { name: 'Prairies Pantry', rating: 3.8, user_ratings_total: 45 },
    { name: 'West Coast Eats', rating: 4.5, user_ratings_total: 289 },
  ]

  // Generate random positions within radius
  const radiusKm = (radius || 5000) / 1000
  const results = mockBusinesses.slice(0, Math.floor(Math.random() * 8) + 8).map((business, index) => {
    // Random offset within radius
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * radiusKm
    const offsetLat = (distance / 111) * Math.cos(angle)
    const offsetLng = (distance / (111 * Math.cos(lat * Math.PI / 180))) * Math.sin(angle)

    return {
      place_id: `mock_${index}`,
      name: business.name,
      rating: business.rating,
      user_ratings_total: business.user_ratings_total,
      geometry: {
        location: {
          lat: lat + offsetLat,
          lng: lng + offsetLng
        }
      },
      vicinity: '123 Main Street',
      business_status: 'OPERATIONAL',
      opening_hours: {
        open_now: Math.random() > 0.3
      },
      price_level: Math.floor(Math.random() * 4) + 1
    }
  })

  return results
}
