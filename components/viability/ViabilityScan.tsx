'use client'

import { useState, useEffect } from 'react'
import { Loader2, RefreshCw, HelpCircle } from 'lucide-react'
import type { ViabilityResult, BusinessProfile } from '@/types'
import { Button } from '@/components/ui/button'
import { ViabilityScore } from './ViabilityScore'
import { MarketInsights } from './MarketInsights'
import { MarketChart } from './MarketChart'
import { SurvivalStats } from './SurvivalStats'
import { RiskCards } from './RiskCards'
import { Opportunities } from './Opportunities'
import { AIRecommendations } from './AIRecommendations'
import { NextSteps } from './NextSteps'

const LOADING_MESSAGES = [
  'Analyzing Canadian market trends...',
  'Evaluating industry competition...',
  'Calculating survival probabilities...',
  'Generating AI startup strategy...',
]

interface ViabilityScanProps {
  viabilityResult: ViabilityResult | null
  onRunScan: () => void
  isLoading?: boolean
  businessProfile?: BusinessProfile | null
}

export function ViabilityScan({
  viabilityResult,
  onRunScan,
  isLoading = false,
  businessProfile,
}: ViabilityScanProps) {
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [explainLoading, setExplainLoading] = useState(false)
  const [explainText, setExplainText] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading) return
    const interval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isLoading])

  async function handleExplainScore() {
    if (!viabilityResult || !businessProfile?.businessDescription) return
    setExplainLoading(true)
    setExplainText(null)
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user' as const,
              content: `Explain why this business received a viability score of ${viabilityResult.score}/100.\n\nBusiness: ${businessProfile.businessDescription}\n\nProvide simple insights and suggestions for improvement.`,
            },
          ],
          systemPrompt:
            'You are a Canadian small business advisor. Give clear, actionable advice in plain language.',
          model: 'gemini-2.5-flash',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to get explanation')
      }
      const data = await res.json()
      setExplainText(data.response ?? '')
    } catch (err) {
      setExplainText(err instanceof Error ? err.message : 'Failed to load explanation.')
    } finally {
      setExplainLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-12">
        <Loader2 className="h-12 w-12 animate-spin text-brand-accent" />
        <p className="font-heading text-lg font-medium text-brand-primary">
          {LOADING_MESSAGES[loadingMessageIndex]}
        </p>
        <p className="text-sm text-gray-500">This may take a moment</p>
      </div>
    )
  }

  if (viabilityResult) {
    const marketChartData = [
      { name: 'Year 1', value: viabilityResult.averageRevenue.year1 },
      { name: 'Year 3', value: viabilityResult.averageRevenue.year3 },
    ]

    return (
      <div className="space-y-6">
        {/* Score + Verdict */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="font-heading text-xl font-semibold text-brand-primary mb-2">
                Viability Results
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-700">{viabilityResult.verdictSummary}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExplainScore}
                  disabled={explainLoading || !businessProfile?.businessDescription}
                >
                  {explainLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <HelpCircle className="h-4 w-4" />
                  )}
                  <span className="ml-2">Explain my score</span>
                </Button>
              </div>
              {explainText !== null && (
                <div className="mt-4 rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-4">
                  <p className="text-sm font-medium text-brand-primary mb-1">AI explanation</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{explainText}</p>
                </div>
              )}
            </div>
            <ViabilityScore score={viabilityResult.score} />
          </div>
        </div>

        {/* Market Insights */}
        {viabilityResult.marketInsights && (
          <MarketInsights marketInsights={viabilityResult.marketInsights} />
        )}

        {/* Revenue Benchmarks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="font-heading text-lg font-semibold text-brand-primary mb-4">
            Revenue Benchmarks
          </h4>
          <MarketChart data={marketChartData} />
          <p className="mt-2 text-xs text-gray-500">
            Estimated average revenue (CAD) for similar businesses in your region
          </p>
        </div>

        {/* Survival Rates */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <SurvivalStats survivalRate={viabilityResult.survivalRate} />
        </div>

        {/* Top Risks */}
        {viabilityResult.topRisks?.length > 0 && (
          <RiskCards risks={viabilityResult.topRisks} />
        )}

        {/* Top Opportunities */}
        {viabilityResult.topOpportunities?.length > 0 && (
          <Opportunities opportunities={viabilityResult.topOpportunities} />
        )}

        {/* AI Recommendations */}
        {viabilityResult.recommendedNextSteps && viabilityResult.recommendedNextSteps.length > 0 && (
          <AIRecommendations steps={viabilityResult.recommendedNextSteps} />
        )}

        {/* Next Steps */}
        {viabilityResult.recommendedNextSteps && viabilityResult.recommendedNextSteps.length > 0 && (
          <NextSteps steps={viabilityResult.recommendedNextSteps} />
        )}

        {/* Run Scan Again */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onRunScan}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Run scan again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-gray-200 bg-white p-12">
      <h3 className="font-heading text-xl font-semibold text-brand-primary">
        Run Viability Scan
      </h3>
      <p className="max-w-md text-center text-sm text-gray-600">
        Get an AI-powered assessment of your business idea based on your profile,
        market conditions, and industry benchmarks.
      </p>
      <Button onClick={onRunScan} size="lg">
        Run Scan
      </Button>
    </div>
  )
}
