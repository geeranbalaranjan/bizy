import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import { calculateViabilityScore } from '@/lib/utils/viability'
import type { BusinessProfile, ViabilityResult, Risk } from '@/types'
import { GRANTS } from '@/lib/data/grants'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/i18n'

const GEMINI_VIABILITY_MODEL = 'gemini-2.5-flash'

interface GeminiViabilityResponse {
  topRisks: Risk[]
  topOpportunities: string[]
  verdictSummary: string
  recommendedNextSteps?: string[]
  marketInsights?: string
}

// Helper to get language name for prompts
function getLanguageName(code: string): string {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code)
  return lang?.name || 'English'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const profile = body as BusinessProfile & { language?: string }
    const language = profile.language || DEFAULT_LANGUAGE
    const languageName = getLanguageName(language)

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
IMPORTANT: Respond in ${languageName} language.

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

Return structured JSON in ${languageName}: topRisks, topOpportunities, verdictSummary, recommendedNextSteps, marketInsights.`

    const aiResponse = await promptGeminiJSON<GeminiViabilityResponse>(
      prompt,
      systemPrompt,
      GEMINI_VIABILITY_MODEL
    )

    const matchingGrants = GRANTS.filter((g) => {
      const provinceMatch =
        g.eligibility.provinces.includes('all') ||
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
