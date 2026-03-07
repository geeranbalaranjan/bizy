import type { BusinessProfile, ViabilityResult } from '@/types'
import { INDUSTRY_STATS } from '@/lib/data/industry-stats'

/**
 * Composite viability score:
 *   30% — Industry survival rate (from static dataset)
 *   25% — Market saturation heuristic
 *   25% — Budget adequacy for business type
 *   20% — Founder experience match
 */

const BUDGET_RANGES: Record<string, number> = {
  under_5k: 2500,
  '5k_25k': 15000,
  '25k_100k': 62500,
  over_100k: 150000,
}

export function calculateViabilityScore(profile: BusinessProfile): Partial<ViabilityResult> {
  const stats =
    INDUSTRY_STATS.find(
      (s) => s.businessType === profile.businessType && s.province === profile.province
    ) ??
    INDUSTRY_STATS.find(
      (s) => s.businessType === profile.businessType && s.province === 'national'
    )

  const survivalScore = stats ? stats.survivalRate.year3 * 100 : 50
  const marketScore = 55 // placeholder — would be dynamic with real data
  const budgetMidpoint = BUDGET_RANGES[profile.budget] ?? 15000
  const budgetScore = stats
    ? Math.min((budgetMidpoint / stats.avgStartupCost) * 100, 100)
    : 50
  const experienceScore = profile.background && profile.background.length > 20 ? 70 : 40

  const composite = Math.round(
    survivalScore * 0.3 + marketScore * 0.25 + budgetScore * 0.25 + experienceScore * 0.2
  )

  const score = Math.max(0, Math.min(100, composite))

  let verdict: ViabilityResult['verdict'] = 'viable'
  if (score >= 75) verdict = 'strong'
  else if (score >= 55) verdict = 'viable'
  else if (score >= 35) verdict = 'challenging'
  else verdict = 'risky'

  return {
    score,
    marketCondition: marketScore > 65 ? 'high' : marketScore > 40 ? 'moderate' : 'low',
    averageRevenue: stats
      ? { year1: stats.avgRevenue.year1, year3: stats.avgRevenue.year3 }
      : { year1: 60000, year3: 120000 },
    survivalRate: stats
      ? stats.survivalRate
      : { year1: 0.8, year3: 0.6, year5: 0.47 },
    verdict,
  }
}
