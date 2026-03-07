'use client'

import { ExternalLink } from 'lucide-react'
import type { Grant } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GrantCardProps {
  grant: Grant
}

const typeBadgeColors: Record<string, string> = {
  grant: 'bg-green-100 text-green-800',
  loan: 'bg-blue-100 text-blue-800',
  tax_credit: 'bg-purple-100 text-purple-800',
  subsidy: 'bg-amber-100 text-amber-800',
}

export function GrantCard({ grant }: GrantCardProps) {
  const amountText =
    grant.amount.min === 0 && grant.amount.max === 0
      ? 'Varies'
      : `$${grant.amount.min.toLocaleString()} - $${grant.amount.max.toLocaleString()}`

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-heading font-semibold text-brand-primary">
            {grant.name}
          </h4>
          <p className="mt-1 text-sm text-gray-500">{grant.provider}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                typeBadgeColors[grant.type] ?? 'bg-gray-100 text-gray-800'
              )}
            >
              {grant.type.replace('_', ' ')}
            </span>
            <span className="text-sm font-medium text-brand-accent">
              {amountText}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {grant.description}
          </p>
        </div>
      </div>
      <Link
        href={grant.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block"
      >
        <Button variant="accent" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          Apply
        </Button>
      </Link>
    </div>
  )
}
