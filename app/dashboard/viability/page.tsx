'use client'

import Link from 'next/link'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useViabilityScore } from '@/hooks/useViabilityScore'
import { useAppContext } from '@/context/AppContext'
import { ViabilityScan } from '@/components/viability/ViabilityScan'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

function canRunScan(profile: { businessType?: string; province?: string; businessDescription?: string } | null): boolean {
  if (!profile) return false
  return Boolean(
    profile.businessType?.trim() &&
    profile.province?.trim() &&
    profile.businessDescription?.trim()
  )
}

export default function ViabilityPage() {
  const { businessProfile, loading: profileLoading } = useBusinessProfile()
  const { state, setViabilityResult } = useAppContext()
  const { result, loading, error, runScan } = useViabilityScore(state.viabilityResult)

  async function handleRunScan() {
    if (!canRunScan(businessProfile)) return
    try {
      const data = await runScan(businessProfile!)
      if (data) setViabilityResult(data)
    } catch {
      // Error already set in hook
    }
  }

  if (profileLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">
          Viability Scan
        </h1>
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    )
  }

  if (!businessProfile) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">
          Viability Scan
        </h1>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-medium text-amber-800 mb-2">Profile required</p>
          <p className="text-sm text-amber-700 mb-4">
            Complete onboarding to run a viability scan.
          </p>
          <Button asChild>
            <Link href="/onboarding">Complete onboarding</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">
        Viability Scan
      </h1>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Scan failed</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRunScan}
            disabled={!canRunScan(businessProfile)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry scan
          </Button>
        </div>
      )}

      <ViabilityScan
        viabilityResult={result}
        onRunScan={handleRunScan}
        isLoading={loading}
        businessProfile={businessProfile}
      />

      {!result && !loading && canRunScan(businessProfile) === false && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            Add your business type, province, and business description in onboarding to run a scan.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-2">
            <Link href="/onboarding">Edit profile</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
