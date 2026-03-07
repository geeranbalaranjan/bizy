'use client'

import type { IndustryBenchmark } from '@/types'
import { cn } from '@/lib/utils'

interface BenchmarkTableProps {
  benchmarks: IndustryBenchmark[]
  yourRevenue?: number
}

export function BenchmarkTable({ benchmarks, yourRevenue }: BenchmarkTableProps) {
  if (!benchmarks.length) return null

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-brand-primary">
              Industry
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Your Business
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Industry Avg (Y1)
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Survival Rate (Y3)
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Avg Startup Cost
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {benchmarks.map((b, i) => {
            const diff = yourRevenue
              ? Math.round(((yourRevenue * 12) / b.avgRevenue.year1 - 1) * 100)
              : null
            return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-700 capitalize">
                  {b.businessType} ({b.province})
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  {yourRevenue ? (
                    <span className="font-medium text-brand-primary">
                      ${(yourRevenue * 12).toLocaleString()}/yr
                      {diff !== null && (
                        <span className={cn('ml-1 text-xs', diff >= 0 ? 'text-green-600' : 'text-red-600')}>
                          ({diff >= 0 ? '+' : ''}{diff}%)
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  ${b.avgRevenue.year1.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {Math.round(b.survivalRate.year3 * 100)}%
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  ${b.avgStartupCost.toLocaleString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
