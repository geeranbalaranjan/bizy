'use client'

import { ExternalLink, Calendar, Star } from 'lucide-react'
import type { Grant, GrantTag } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/components/translation'

interface GrantCardProps {
  grant: Grant
  isRecommended?: boolean
}

const typeBadgeColors: Record<string, string> = {
  grant: 'bg-green-100 text-green-800',
  loan: 'bg-blue-100 text-blue-800',
  tax_credit: 'bg-purple-100 text-purple-800',
  subsidy: 'bg-amber-100 text-amber-800',
}

const tagColors: Record<GrantTag, string> = {
  general: 'bg-gray-100 text-gray-700',
  women_owned: 'bg-pink-100 text-pink-700',
  youth: 'bg-orange-100 text-orange-700',
  indigenous: 'bg-amber-100 text-amber-700',
  immigrant: 'bg-teal-100 text-teal-700',
  tech_startup: 'bg-indigo-100 text-indigo-700',
  sustainability: 'bg-emerald-100 text-emerald-700',
  rural: 'bg-lime-100 text-lime-700',
  veteran: 'bg-slate-100 text-slate-700',
  disability: 'bg-violet-100 text-violet-700',
  minority_owned: 'bg-cyan-100 text-cyan-700',
  innovation: 'bg-blue-100 text-blue-700',
}

const tagLabels: Record<GrantTag, string> = {
  general: 'General',
  women_owned: 'Women-owned',
  youth: 'Youth',
  indigenous: 'Indigenous',
  immigrant: 'Newcomer',
  tech_startup: 'Tech/Innovation',
  sustainability: 'Sustainability',
  rural: 'Rural',
  veteran: 'Veteran',
  disability: 'Disability',
  minority_owned: 'Minority-owned',
  innovation: 'Innovation',
}

export function GrantCard({ grant, isRecommended }: GrantCardProps) {
  const { t } = useTranslation()
  
  const amountText =
    grant.amount.min === 0 && grant.amount.max === 0
      ? t('Varies')
      : `$${grant.amount.min.toLocaleString()} - $${grant.amount.max.toLocaleString()}`

  const deadlineText = grant.deadline 
    ? new Date(grant.deadline).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
    : t('Ongoing')

  return (
    <div className={cn(
      "rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md",
      isRecommended ? "border-brand-accent border-2 ring-1 ring-brand-accent/20" : "border-gray-200"
    )}>
      {/* Recommended badge */}
      {isRecommended && (
        <div className="flex items-center gap-1 text-brand-accent text-xs font-semibold mb-2">
          <Star className="h-3.5 w-3.5 fill-brand-accent" />
          {t('Recommended for you')}
        </div>
      )}
      
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-heading font-semibold text-brand-primary">
            {grant.name}
          </h4>
          <p className="mt-1 text-sm text-gray-500">{grant.provider}</p>
          
          {/* Type and amount */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                typeBadgeColors[grant.type] ?? 'bg-gray-100 text-gray-800'
              )}
            >
              {t(grant.type.replace('_', ' '))}
            </span>
            <span className="text-sm font-medium text-brand-accent">
              {amountText}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {deadlineText}
            </span>
          </div>
          
          {/* Tags */}
          {grant.tags && grant.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {grant.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs',
                    tagColors[tag] ?? 'bg-gray-100 text-gray-700'
                  )}
                >
                  {t(tagLabels[tag] ?? tag)}
                </span>
              ))}
              {grant.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{grant.tags.length - 3}</span>
              )}
            </div>
          )}
          
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
          {t('Apply')}
        </Button>
      </Link>
    </div>
  )
}
