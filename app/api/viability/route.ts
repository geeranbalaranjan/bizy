import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import { calculateViabilityScore } from '@/lib/utils/viability'
import type { BusinessProfile, ViabilityResult, Risk } from '@/types'
import { GRANTS } from '@/lib/data/grants'

const GEMINI_VIABILITY_MODEL = 'gemini-2.5-flash'

interface GeminiViabilityResponse {
  topRisks: Risk[]
  topOpportunities: string[]
  verdictSummary: string
  recommendedNextSteps?: string[]
  marketInsights?: string
}

export async function POST(req: NextRequest) {
  try {
    const profile = (await req.json()) as BusinessProfile

    if (!profile?.businessType || !profile?.province) {
      return NextResponse.json(
        { error: 'BusinessProfile with businessType and province is required' },
        { status: 400 }
      )
    }

    if (!profile?.businessDescription?.trim()) {
      return NextResponse.json(
        { error: 'Business description is required for viability analysis' },
        { status: 400 }
      )
    }

    const baseResult = calculateViabilityScore(profile)

    const systemPrompt = `You are an expert Canadian startup advisor.
Analyze this business idea and evaluate its viability.
Return ONLY valid JSON with no markdown or explanation.

Required fields:
- topRisks: array of 3 risks, each with { title, description, mitigation, severity: "high"|"medium"|"low" }
- topOpportunities: array of 3 opportunity strings
- verdictSummary: 2-3 sentence summary of the viability verdict
- recommendedNextSteps: array of 4-6 actionable next steps for the founder (e.g. "Register your business name", "Apply for municipal permits")
- marketInsights: 2-4 sentences on demand, competition, and trends for this business type and region`

    const prompt = `Business Type: ${profile.businessType}
Province: ${profile.province}
City: ${profile.city}
Budget: ${profile.budget}
Target Customers: ${profile.targetCustomers}
Description: ${profile.businessDescription}

Return structured JSON: topRisks, topOpportunities, verdictSummary, recommendedNextSteps, marketInsights.`

    const aiResponse = await promptGeminiJSON<GeminiViabilityResponse>(
      prompt,
      systemPrompt,
      GEMINI_VIABILITY_MODEL
    )

    const matchingGrants = GRANTS.filter((g) => {
      const provinceMatch =
        g.eligibility.provinces === 'all' ||
        g.eligibility.provinces.includes(profile.province)
      const businessMatch = g.eligibility.businessTypes.includes(profile.businessType)
      return provinceMatch && businessMatch
    })

    const result: ViabilityResult = {
      ...baseResult,
      grantsAvailable: matchingGrants.length,
      topRisks: aiResponse.topRisks ?? [],
      topOpportunities: aiResponse.topOpportunities ?? [],
      verdictSummary: aiResponse.verdictSummary ?? '',
      recommendedNextSteps: aiResponse.recommendedNextSteps ?? [],
      marketInsights: aiResponse.marketInsights ?? '',
    } as ViabilityResult

    return NextResponse.json(result)
  } catch (error) {
    console.error('Viability API error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate viability' },
      { status: 500 }
    )
  }
}
