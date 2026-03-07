'use client'

import { Loader2 } from 'lucide-react'
import type { ViabilityResult } from '@/types'
import { Button } from '@/components/ui/button'
import { ViabilityScore } from './ViabilityScore'

interface ViabilityScanProps {
  viabilityResult: ViabilityResult | null
  onRunScan: () => void
  isLoading?: boolean
}

export function ViabilityScan({
  viabilityResult,
  onRunScan,
  isLoading = false,
}: ViabilityScanProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-12">
        <Loader2 className="h-12 w-12 animate-spin text-brand-accent" />
        <p className="font-heading text-lg font-medium text-brand-primary">
          Analyzing your business...
        </p>
        <p className="text-sm text-gray-500">This may take a moment</p>
      </div>
    )
  }

  if (viabilityResult) {
    return (
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-semibold text-brand-primary">
            Viability Results
          </h3>
          <ViabilityScore score={viabilityResult.score} />
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-700">{viabilityResult.verdictSummary}</p>
        </div>
        <Button variant="outline" onClick={onRunScan}>
          Run scan again
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-gray-200 bg-white p-12">
      <h3 className="font-heading text-xl font-semibold text-brand-primary">
        Run Viability Scan
      </h3>
      <p className="max-w-md text-center text-sm text-gray-600">
        Get an AI-powered assessment of your business idea based on your profile,
        market conditions, and industry benchmarks.
      </p>
      <Button onClick={onRunScan} size="lg">
        Run Scan
      </Button>
    </div>
  )
}
