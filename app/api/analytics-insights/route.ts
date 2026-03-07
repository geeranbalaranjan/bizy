import { NextRequest, NextResponse } from 'next/server'
import { promptGemini } from '@/lib/gemini'
import type { BusinessProfile } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const profile = (await req.json()) as BusinessProfile

    if (!profile?.businessType || !profile?.province) {
      return NextResponse.json(
        { error: 'Business profile is required' },
        { status: 400 }
      )
    }

    let insights = ''
    try {
      insights = await promptGemini(
        `Analyze the market opportunity for this business.

Business Type: ${profile.businessType}
Province: ${profile.province}
City: ${profile.city}
Target Customers: ${profile.targetCustomers}
Description: ${profile.businessDescription}

Provide a concise 3-4 sentence analysis covering market opportunities, demand signals, risks, and growth potential in the Canadian context.`,
        'You are a Canadian market analyst specializing in startup opportunities. Be specific, data-informed, and actionable.'
      )
    } catch (aiError) {
      console.error('Analytics insights Gemini error:', aiError)
    }

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Analytics insights error:', error)
    return NextResponse.json(
      { error: 'Failed to generate market insights' },
      { status: 500 }
    )
  }
}
