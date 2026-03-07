'use client'

import { cn } from '@/lib/utils'

interface OnboardingProgressProps {
  currentStep: number
  totalSteps?: number
}

export function OnboardingProgress({
  currentStep,
  totalSteps = 3,
}: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
              step === currentStep
                ? 'bg-brand-accent text-white'
                : step < currentStep
                  ? 'bg-brand-accent/50 text-white'
                  : 'bg-gray-200 text-gray-500'
            )}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={cn(
                'mx-1 h-0.5 w-8 rounded',
                step < currentStep ? 'bg-brand-accent' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
