import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import { calculateViabilityScore } from '@/lib/utils/viability'
import type { BusinessProfile, ViabilityResult, Risk } from '@/types'
import { GRANTS } from '@/lib/data/grants'

interface GeminiViabilityResponse {
  topRisks: Risk[]
  topOpportunities: string[]
  verdictSummary: string
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

    const baseResult = calculateViabilityScore(profile)

    const systemPrompt = `You are a Canadian small business advisor. Analyze the business profile and return JSON with:
- topRisks: array of 3 risks, each with { title, description, mitigation, severity: "high"|"medium"|"low" }
- topOpportunities: array of 3 opportunity strings
- verdictSummary: 2-3 sentence summary of the viability verdict`

    const prompt = `Business profile: ${JSON.stringify(profile)}

Return topRisks (3), topOpportunities (3), and verdictSummary.`

    const aiResponse = await promptGeminiJSON<GeminiViabilityResponse>(
      prompt,
      systemPrompt
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
