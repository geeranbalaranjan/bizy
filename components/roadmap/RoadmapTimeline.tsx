'use client'

import type { RoadmapStep } from '@/types'
import { RoadmapStepCard } from './RoadmapStep'
import { cn } from '@/lib/utils'

interface RoadmapTimelineProps {
  steps: RoadmapStep[]
  progress: Record<string, boolean>
}

const categoryColors: Record<string, string> = {
  legal: 'border-l-blue-500',
  financial: 'border-l-green-500',
  licensing: 'border-l-purple-500',
  hr: 'border-l-amber-500',
  operations: 'border-l-cyan-500',
  marketing: 'border-l-pink-500',
}

export function RoadmapTimeline({ steps, progress }: RoadmapTimelineProps) {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="relative space-y-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'relative ml-10 border-l-4 pl-6',
              categoryColors[step.category] ?? 'border-l-gray-400'
            )}
          >
            <RoadmapStepCard
              step={step}
              isComplete={progress[step.id] ?? step.isComplete}
              onToggle={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
