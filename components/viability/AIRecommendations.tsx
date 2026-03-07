'use client'

import { Sparkles } from 'lucide-react'

interface AIRecommendationsProps {
  steps: string[]
}

export function AIRecommendations({ steps }: AIRecommendationsProps) {
  if (!steps?.length) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h4 className="font-heading text-lg font-semibold text-brand-primary mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-accent" />
        AI Recommendations
      </h4>
      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-xs font-semibold text-brand-accent">
              {index + 1}
            </span>
            <p className="text-sm text-gray-700">{step}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
