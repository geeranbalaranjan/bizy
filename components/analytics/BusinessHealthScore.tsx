'use client'

import { cn } from '@/lib/utils'
import { Activity } from 'lucide-react'

interface BusinessHealthScoreProps {
  score: number
}

export function BusinessHealthScore({ score }: BusinessHealthScoreProps) {
  const getScoreColor = () => {
    if (score > 70) return { text: 'text-green-600', stroke: 'stroke-green-600', label: 'Healthy' }
    if (score >= 40) return { text: 'text-amber-600', stroke: 'stroke-amber-600', label: 'Moderate' }
    return { text: 'text-red-600', stroke: 'stroke-red-600', label: 'Needs Attention' }
  }

  const { text, stroke, label } = getScoreColor()

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-brand-accent" />
        <h4 className="font-heading text-sm font-semibold text-brand-primary">
          Business Health
        </h4>
      </div>
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full">
        <svg className="-rotate-90" viewBox="0 0 36 36" width="100%" height="100%">
          <path
            className="stroke-gray-200"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={cn('transition-all duration-700', stroke)}
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className={cn('absolute text-2xl font-heading font-bold', text)}>
          {score}
        </span>
      </div>
      <span className={cn('text-xs font-medium', text)}>{label}</span>
    </div>
  )
}
