'use client'

interface MarketInsightsProps {
  marketInsights: string
}

export function MarketInsights({ marketInsights }: MarketInsightsProps) {
  if (!marketInsights?.trim()) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h4 className="font-heading text-lg font-semibold text-brand-primary mb-3">
        Market Insights
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed">{marketInsights}</p>
    </div>
  )
}
