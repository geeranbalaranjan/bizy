'use client'

import { useEffect } from 'react'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useViabilityScore } from '@/hooks/useViabilityScore'
import { useAnalytics } from '@/hooks/useAnalytics'
import { KPICard } from '@/components/analytics/KPICard'
import { RevenueChart } from '@/components/analytics/RevenueChart'
import { BenchmarkTable } from '@/components/analytics/BenchmarkTable'
import { BusinessHealthScore } from '@/components/analytics/BusinessHealthScore'
import { INDUSTRY_STATS } from '@/lib/data/industry-stats'
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Sparkles,
  Loader2,
  BarChart3,
  Brain,
  Rocket,
  AlertTriangle,
  ListChecks,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-3 h-4 w-1/3 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-full rounded bg-gray-100" />
      <div className="mb-2 h-3 w-5/6 rounded bg-gray-100" />
      <div className="h-3 w-4/6 rounded bg-gray-100" />
    </div>
  )
}

export default function AnalyticsPage() {
  const { businessProfile, loading: profileLoading } = useBusinessProfile()
  const { result: viabilityResult, runScan } = useViabilityScore()
  const {
    metrics,
    revenueChartData,
    healthScore,
    aiInsights,
    aiLoading,
    aiError,
    generateInsights,
  } = useAnalytics(businessProfile, viabilityResult)

  useEffect(() => {
    if (businessProfile && !viabilityResult) {
      runScan(businessProfile)
    }
  }, [businessProfile, viabilityResult, runScan])

  const benchmarks = businessProfile
    ? INDUSTRY_STATS.filter(
        (s) =>
          s.businessType === businessProfile.businessType &&
          (s.province === businessProfile.province || s.province === 'national')
      )
    : []

  if (profileLoading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-heading font-bold text-brand-primary">
          Analytics Dashboard
        </h1>
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-16">
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-brand-accent" />
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!businessProfile) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-heading font-bold text-brand-primary">
          Analytics Dashboard
        </h1>
        <div className="flex flex-col items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
          <h3 className="font-heading text-lg font-semibold text-brand-primary">
            Business Profile Required
          </h3>
          <p className="max-w-md text-sm text-gray-600">
            Complete your business profile in onboarding to unlock the analytics dashboard.
          </p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-heading font-bold text-brand-primary">
          Analytics Dashboard
        </h1>
        <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
          <p className="text-sm text-gray-500">Calculating metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-brand-primary">
          Analytics Dashboard
        </h1>
        {!aiInsights && !aiLoading && (
          <Button
            variant="accent"
            size="sm"
            className="gap-2"
            onClick={generateInsights}
          >
            <Sparkles className="h-4 w-4" />
            Generate AI Insights
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Row 1: KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Monthly Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            change={12.5}
            icon={DollarSign}
          />
          <KPICard
            title="Customers"
            value={metrics.customers}
            change={8.2}
            icon={Users}
          />
          <KPICard
            title="Growth Rate"
            value={`${metrics.growthRate}%`}
            change={3.1}
            icon={TrendingUp}
          />
          <KPICard
            title="Acquisition Cost"
            value={`$${metrics.customerAcquisitionCost}`}
            change={-5.4}
            icon={Target}
          />
        </div>

        {/* Row 2: Health Score + Revenue Chart */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6">
            <BusinessHealthScore score={healthScore} />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-accent" />
              <h3 className="font-heading text-sm font-semibold text-brand-primary">
                Revenue Growth
              </h3>
            </div>
            <RevenueChart data={revenueChartData} />
          </div>
        </div>

        {/* Row 3: Benchmark Comparison */}
        {benchmarks.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-accent" />
              <h3 className="font-heading text-sm font-semibold text-brand-primary">
                Industry Benchmark Comparison
              </h3>
            </div>
            <BenchmarkTable benchmarks={benchmarks} yourRevenue={metrics.revenue} />
          </div>
        )}

        {/* AI Insights Section */}
        {aiLoading && (
          <div className="grid gap-6 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {aiError && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-800">AI insights failed</p>
              <p className="text-sm text-red-700">{aiError}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={generateInsights}>
                Retry
              </Button>
            </div>
          </div>
        )}

        {aiInsights && (
          <>
            {/* Row 4: Market Insights + Business Insights */}
            <div className="grid gap-6 lg:grid-cols-2">
              {aiInsights.marketInsights && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-highlight" />
                    <h3 className="font-heading text-sm font-semibold text-brand-primary">
                      Market Insights
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {aiInsights.marketInsights}
                  </p>
                </div>
              )}

              {(aiInsights.businessInsights.strengths.length > 0 ||
                aiInsights.businessInsights.weaknesses.length > 0) && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-sm font-semibold text-brand-primary">
                      AI Business Analysis
                    </h3>
                  </div>
                  {aiInsights.businessInsights.strengths.length > 0 && (
                    <div className="mb-3">
                      <p className="mb-1 text-xs font-semibold uppercase text-green-700">
                        Strengths
                      </p>
                      <ul className="space-y-1">
                        {aiInsights.businessInsights.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {aiInsights.businessInsights.weaknesses.length > 0 && (
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase text-amber-700">
                        Areas to Improve
                      </p>
                      <ul className="space-y-1">
                        {aiInsights.businessInsights.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Row 5: Growth Predictions + Recommended Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
              {(aiInsights.predictions.threeMonth > 0 || aiInsights.predictions.breakEven) && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-sm font-semibold text-brand-primary">
                      Growth Predictions
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <p className="text-xs text-blue-600">3-Month</p>
                      <p className="mt-1 font-heading text-lg font-bold text-blue-800">
                        ${aiInsights.predictions.threeMonth.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-500">/month</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 text-center">
                      <p className="text-xs text-purple-600">6-Month</p>
                      <p className="mt-1 font-heading text-lg font-bold text-purple-800">
                        ${aiInsights.predictions.sixMonth.toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-500">/month</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                      <p className="text-xs text-green-600">Break-Even</p>
                      <p className="mt-1 font-heading text-sm font-bold text-green-800">
                        {aiInsights.predictions.breakEven || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {aiInsights.recommendedActions.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-sm font-semibold text-brand-primary">
                      Recommended Next Actions
                    </h3>
                  </div>
                  <ol className="space-y-2">
                    {aiInsights.recommendedActions.map((action, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-3"
                      >
                        <span className={cn(
                          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
                          'bg-brand-accent text-white'
                        )}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-gray-700">{action}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
