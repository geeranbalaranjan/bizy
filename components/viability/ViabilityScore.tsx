'use client'

import { cn } from '@/lib/utils'

interface ViabilityScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function ViabilityScore({ score, size = 'lg' }: ViabilityScoreProps) {
  const getScoreColor = () => {
    if (score > 70) return { text: 'text-green-600', stroke: 'stroke-green-600' }
    if (score >= 40) return { text: 'text-amber-600', stroke: 'stroke-amber-600' }
    return { text: 'text-red-600', stroke: 'stroke-red-600' }
  }

  const colors = getScoreColor()

  const sizeClasses = {
    sm: 'h-16 w-16 text-xl',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-32 w-32 text-4xl',
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        sizeClasses[size]
      )}
    >
      <svg
        className="-rotate-90"
        viewBox="0 0 36 36"
        width="100%"
        height="100%"
      >
        <path
          className="stroke-gray-200"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={cn('transition-all duration-500', colors.stroke)}
          strokeWidth="3"
          strokeDasharray={`${score}, 100`}
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className={cn('absolute font-heading font-bold', colors.text)}>
        {score}
      </span>
    </div>
  )
}
