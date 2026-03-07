'use client'

import { Lightbulb } from 'lucide-react'

interface OpportunitiesProps {
  opportunities: string[]
}

export function Opportunities({ opportunities }: OpportunitiesProps) {
  if (!opportunities?.length) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h4 className="font-heading text-lg font-semibold text-brand-primary mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-brand-accent" />
        Top Opportunities
      </h4>
      <div className="space-y-3">
        {opportunities.map((opp, index) => (
          <div
            key={index}
            className="rounded-lg border border-green-200 bg-green-50 p-4"
          >
            <p className="text-sm font-medium text-gray-800">{opp}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
