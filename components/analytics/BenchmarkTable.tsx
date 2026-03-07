'use client'

import type { IndustryBenchmark } from '@/types'

interface BenchmarkTableProps {
  benchmarks: IndustryBenchmark[]
}

export function BenchmarkTable({ benchmarks }: BenchmarkTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-heading text-sm font-semibold text-brand-primary">
              Metric
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Your Business
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              Provincial Avg
            </th>
            <th className="px-4 py-3 text-right font-heading text-sm font-semibold text-brand-primary">
              National Avg
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {benchmarks.map((benchmark, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">
                {benchmark.businessType} ({benchmark.province})
              </td>
              <td className="px-4 py-3 text-right text-sm text-gray-600">—</td>
              <td className="px-4 py-3 text-right text-sm text-gray-600">
                ${benchmark.avgRevenue.year1.toLocaleString()} (Y1)
              </td>
              <td className="px-4 py-3 text-right text-sm text-gray-600">
                {Math.round(benchmark.survivalRate.year3 * 100)}% (Y3)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
