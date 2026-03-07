'use client'

import { Check, AlertTriangle, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ComparisonTable() {
  const rows = [
    {
      feature: "Has real, adaptive conversations",
      bizy: "check",
      consultant: "check",
      traditional: "minus"
    },
    {
      feature: "Automated viability & survival analysis",
      bizy: "check",
      consultant: "warning",
      traditional: "warning"
    },
    {
      feature: "Available instantly, 24/7",
      bizy: "check",
      consultant: "warning",
      traditional: "check"
    },
    {
      feature: "Generates custom launch roadmap",
      bizy: "check",
      consultant: "check",
      traditional: "minus"
    },
    {
      feature: "Sales without headcount",
      bizy: "check",
      consultant: "warning",
      traditional: "warning"
    },
    {
      feature: "No prohibitive startup costs",
      bizy: "check",
      consultant: "minus",
      traditional: "check"
    },
    {
      feature: "Live web storefront creation",
      bizy: "check",
      consultant: "warning",
      traditional: "minus"
    }
  ]

  const getIcon = (state: string) => {
    switch (state) {
      case "check":
        return <Check className="w-5 h-5 text-success mx-auto" strokeWidth={3} />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning mx-auto" />
      case "minus":
      default:
        return <Minus className="w-5 h-5 text-gray-500 mx-auto" />
    }
  }

  return (
    <section className="py-24 bg-[#111] border-y border-white/5 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">
            Built for how founders actually<br/>want to build
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Bizy isn't a static business plan template. It's a dynamic, guided intelligence platform designed for modern builders.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-left font-medium text-gray-400 w-[40%]">Key Features</th>
                <th className="py-6 px-4 text-center font-bold text-xl w-[20%]">
                  <div className="bg-brand-primary border border-white/10 rounded-lg py-3 px-6 shadow-lg inline-flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-accent"></span>
                    Bizy
                  </div>
                </th>
                <th className="py-6 px-4 text-center font-medium text-gray-400 w-[20%]">Consultants</th>
                <th className="py-6 px-4 text-center font-medium text-gray-400 w-[20%]">Manual Planning</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className={cn(
                  "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
                  idx === rows.length - 1 && "border-b-0"
                )}>
                  <td className="py-5 px-4 text-sm font-medium text-gray-200">
                    {row.feature}
                  </td>
                  <td className="py-5 px-4 text-center bg-white/[0.02]">
                    {getIcon(row.bizy)}
                  </td>
                  <td className="py-5 px-4 text-center">
                    {getIcon(row.consultant)}
                  </td>
                  <td className="py-5 px-4 text-center">
                    {getIcon(row.traditional)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
