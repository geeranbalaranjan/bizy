'use client'

import Link from 'next/link'
import { Check, ExternalLink } from 'lucide-react'
import type { RoadmapStep as RoadmapStepType } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RoadmapStepProps {
  step: RoadmapStepType
  isComplete: boolean
  onToggle: (stepId: string) => void
}

export function RoadmapStepCard({ step, isComplete, onToggle }: RoadmapStepProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        isComplete && 'border-green-200 bg-green-50/50'
      )}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggle(step.id)}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            isComplete
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 hover:border-brand-accent'
          )}
          aria-label={isComplete ? 'Mark incomplete' : 'Mark complete'}
        >
          {isComplete && <Check className="h-4 w-4" />}
        </button>

        <div className="min-w-0 flex-1">
          <h4 className="font-heading font-semibold text-brand-primary">
            {step.title}
          </h4>
          <p className="mt-1 text-sm text-gray-600">{step.description}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>⏱ {step.estimatedTime}</span>
            <span>💰 {step.estimatedCost}</span>
          </div>
          {step.actionUrl && (
            <Link
              href={step.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
            >
              View resource
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
