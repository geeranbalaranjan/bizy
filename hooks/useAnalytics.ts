'use client'

import { useState, useMemo, useCallback } from 'react'
import type { BusinessProfile, ViabilityResult } from '@/types'

export interface AnalyticsMetrics {
  revenue: number
  customers: number
  growthRate: number
  conversionRate: number
  customerAcquisitionCost: number
  burnRate: number
}

export interface AIInsightsData {
  marketInsights: string
  businessInsights: { strengths: string[]; weaknesses: string[]; actions: string[] }
  predictions: { threeMonth: number; sixMonth: number; breakEven: string }
  recommendedActions: string[]
}

export function useAnalytics(
  profile: BusinessProfile | null,
  viabilityResult: ViabilityResult | null
) {
  const [aiInsights, setAiInsights] = useState<AIInsightsData | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const metrics: AnalyticsMetrics | null = useMemo(() => {
    if (!profile || !viabilityResult) return null
    const score = viabilityResult.score
    return {
      revenue: Math.round(score * 200),
      customers: Math.round(score * 4),
      growthRate: Math.round((score / 5) * 10) / 10,
      conversionRate: Math.round((score / 15) * 100) / 100,
      customerAcquisitionCost: Math.max(5, Math.round(150 - score * 1.2)),
      burnRate: Math.round(score * 80),
    }
  }, [profile, viabilityResult])

  const revenueChartData = useMemo(() => {
    if (!metrics) return []
    const base = metrics.revenue
    return [
      { name: 'Jan', value: Math.round(base * 0.18) },
      { name: 'Feb', value: Math.round(base * 0.32) },
      { name: 'Mar', value: Math.round(base * 0.47) },
      { name: 'Apr', value: Math.round(base * 0.73) },
      { name: 'May', value: base },
      { name: 'Jun', value: Math.round(base * 1.15) },
    ]
  }, [metrics])

  const healthScore = useMemo(() => {
    if (!metrics || !viabilityResult) return 0
    const raw =
      viabilityResult.score * 0.5 +
      metrics.growthRate * 2 +
      metrics.conversionRate * 50
    return Math.max(0, Math.min(100, Math.round(raw)))
  }, [metrics, viabilityResult])

  const generateInsights = useCallback(async () => {
    if (!profile || !metrics) return
    setAiLoading(true)
    setAiError(null)

    try {
      const [marketRes, businessRes, predictRes] = await Promise.allSettled([
        fetch('/api/analytics-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        }),
        fetch('/api/analytics-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile, metrics }),
        }),
        fetch('/api/analytics-predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile, metrics }),
        }),
      ])

      const marketData =
        marketRes.status === 'fulfilled' && marketRes.value.ok
          ? await marketRes.value.json()
          : null
      const businessData =
        businessRes.status === 'fulfilled' && businessRes.value.ok
          ? await businessRes.value.json()
          : null
      const predictData =
        predictRes.status === 'fulfilled' && predictRes.value.ok
          ? await predictRes.value.json()
          : null

      setAiInsights({
        marketInsights: marketData?.insights ?? '',
        businessInsights: businessData?.insights ?? { strengths: [], weaknesses: [], actions: [] },
        predictions: predictData?.predictions ?? { threeMonth: 0, sixMonth: 0, breakEven: '' },
        recommendedActions: businessData?.insights?.actions ?? [],
      })
    } catch {
      setAiError('Failed to generate AI insights')
    } finally {
      setAiLoading(false)
    }
  }, [profile, metrics])

  return {
    metrics,
    revenueChartData,
    healthScore,
    aiInsights,
    aiLoading,
    aiError,
    generateInsights,
  }
}
