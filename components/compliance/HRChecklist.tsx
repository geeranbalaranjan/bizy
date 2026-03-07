'use client'

import { Check, ExternalLink } from 'lucide-react'
import type { OnboardingChecklist } from '@/types'
import { cn } from '@/lib/utils'

interface HRChecklistProps {
  checklist: OnboardingChecklist
}

export function HRChecklist({ checklist }: HRChecklistProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h4 className="font-heading font-semibold text-brand-primary">
          {checklist.employeeName}
        </h4>
        <p className="text-sm text-gray-500">
          {checklist.role} • Start: {checklist.startDate}
        </p>
      </div>
      <div className="space-y-3">
        {checklist.steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 rounded-lg border p-3',
              step.isComplete ? 'border-green-200 bg-green-50/50' : 'border-gray-200'
            )}
          >
            <div
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                step.isComplete ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
              )}
            >
              {step.isComplete && <Check className="h-3 w-3" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-brand-primary">{step.title}</p>
              <p className="mt-0.5 text-sm text-gray-600">{step.description}</p>
              <p className="mt-1 text-xs text-gray-500">Due: {step.dueDate}</p>
              {step.templateUrl && (
                <a
                  href={step.templateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-brand-accent hover:underline"
                >
                  Template
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
