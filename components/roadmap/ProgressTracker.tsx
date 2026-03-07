'use client'

import { cn } from '@/lib/utils'

interface ProgressTrackerProps {
  completed: number
  total: number
}

export function ProgressTracker({ completed, total }: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-brand-primary">Progress</span>
        <span className="text-gray-600">
          {completed} / {total} ({percentage}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            'h-full rounded-full bg-brand-accent transition-all duration-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
