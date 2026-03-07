'use client'

import { cn } from '@/lib/utils'

interface SurvivalRate {
  year1: number
  year3: number
  year5: number
}

interface SurvivalStatsProps {
  survivalRate: SurvivalRate
}

export function SurvivalStats({ survivalRate }: SurvivalStatsProps) {
  const stats = [
    { label: 'Year 1', value: survivalRate.year1, color: 'bg-green-500' },
    { label: 'Year 3', value: survivalRate.year3, color: 'bg-brand-accent' },
    { label: 'Year 5', value: survivalRate.year5, color: 'bg-brand-highlight' },
  ]

  return (
    <div className="space-y-4">
      <h4 className="font-heading text-sm font-semibold text-brand-primary">
        Survival Rates
      </h4>
      <div className="space-y-3">
        {stats.map(({ label, value, color }) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium text-brand-primary">
                {Math.round(value * 100)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={cn('h-full rounded-full transition-all duration-500', color)}
                style={{ width: `${value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
