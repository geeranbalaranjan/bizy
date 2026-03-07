'use client'

import type { Risk } from '@/types'
import { cn } from '@/lib/utils'

interface RiskCardsProps {
  risks: Risk[]
}

export function RiskCards({ risks }: RiskCardsProps) {
  const getSeverityStyles = (severity: Risk['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-amber-200 bg-amber-50'
      case 'low':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getSeverityBadge = (severity: Risk['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="font-heading text-sm font-semibold text-brand-primary">
        Top Risks
      </h4>
      <div className="space-y-3">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={cn(
              'rounded-lg border p-4',
              getSeverityStyles(risk.severity)
            )}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h5 className="font-medium text-brand-primary">{risk.title}</h5>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                  getSeverityBadge(risk.severity)
                )}
              >
                {risk.severity}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-600">{risk.description}</p>
            <p className="text-sm">
              <span className="font-medium text-brand-primary">Mitigation: </span>
              <span className="text-gray-600">{risk.mitigation}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
