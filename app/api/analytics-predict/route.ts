import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import type { BusinessProfile } from '@/types'

interface PredictRequest {
  profile: BusinessProfile
  metrics: {
    revenue: number
    customers: number
    growthRate: number
  }
}

interface PredictionsResponse {
  threeMonth: number
  sixMonth: number
  breakEven: string
}

export async function POST(req: NextRequest) {
  try {
    const { profile, metrics } = (await req.json()) as PredictRequest

    if (!profile || !metrics) {
      return NextResponse.json(
        { error: 'Profile and metrics are required' },
        { status: 400 }
      )
    }

    let predictions: PredictionsResponse = { threeMonth: 0, sixMonth: 0, breakEven: '' }
    try {
      predictions = await promptGeminiJSON<PredictionsResponse>(
        `Predict the business growth trajectory for a Canadian ${profile.businessType} business in ${profile.province}.

Current Monthly Revenue: $${metrics.revenue}
Current Customers: ${metrics.customers}
Growth Rate: ${metrics.growthRate}%

Return JSON with:
- threeMonth: predicted monthly revenue in 3 months (number)
- sixMonth: predicted monthly revenue in 6 months (number)
- breakEven: estimated time to break even as a short string like "8-12 months"`,
        'You are a financial analyst specializing in Canadian startups. Provide realistic projections based on industry norms.'
      )
    } catch (aiError) {
      console.error('Analytics predict Gemini error:', aiError)
    }

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error('Analytics predict error:', error)
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}
