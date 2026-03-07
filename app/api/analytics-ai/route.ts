import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import type { BusinessProfile } from '@/types'

interface AnalyticsAIRequest {
  profile: BusinessProfile
  metrics: {
    revenue: number
    customers: number
    growthRate: number
    conversionRate: number
    customerAcquisitionCost: number
    burnRate: number
  }
}

interface BusinessInsightsResponse {
  strengths: string[]
  weaknesses: string[]
  actions: string[]
}

export async function POST(req: NextRequest) {
  try {
    const { profile, metrics } = (await req.json()) as AnalyticsAIRequest

    if (!profile || !metrics) {
      return NextResponse.json(
        { error: 'Profile and metrics are required' },
        { status: 400 }
      )
    }

    let insights: BusinessInsightsResponse = { strengths: [], weaknesses: [], actions: [] }
    try {
      insights = await promptGeminiJSON<BusinessInsightsResponse>(
        `Analyze these startup metrics and provide insights for a Canadian ${profile.businessType} business in ${profile.province}.

Revenue: $${metrics.revenue}/month
Customers: ${metrics.customers}
Growth Rate: ${metrics.growthRate}%
Conversion Rate: ${metrics.conversionRate}%
Customer Acquisition Cost: $${metrics.customerAcquisitionCost}
Monthly Burn Rate: $${metrics.burnRate}

Return JSON with:
- strengths: array of 3 key business strengths
- weaknesses: array of 3 areas needing improvement
- actions: array of 3 recommended strategic actions the founder should take next`,
        'You are a startup advisor for Canadian businesses. Be specific and actionable.'
      )
    } catch (aiError) {
      console.error('Analytics AI Gemini error:', aiError)
    }

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Analytics AI error:', error)
    return NextResponse.json(
      { error: 'Failed to generate business insights' },
      { status: 500 }
    )
  }
}
