'use client'

import { ListChecks } from 'lucide-react'

interface NextStepsProps {
  steps: string[]
}

export function NextSteps({ steps }: NextStepsProps) {
  if (!steps?.length) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h4 className="font-heading text-lg font-semibold text-brand-primary mb-4 flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-brand-accent" />
        Next Steps
      </h4>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="text-sm font-medium text-gray-800">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
