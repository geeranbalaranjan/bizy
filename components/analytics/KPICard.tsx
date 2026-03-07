'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon?: LucideIcon
}

export function KPICard({ title, value, change, icon: Icon }: KPICardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 font-heading text-2xl font-bold text-brand-primary">
            {value}
          </p>
          {change !== undefined && (
            <p
              className={cn(
                'mt-1 text-sm font-medium',
                change >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {change >= 0 ? '+' : ''}
              {change}% from last period
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-brand-primary/10 p-2">
            <Icon className="h-6 w-6 text-brand-primary" />
          </div>
        )}
      </div>
    </div>
  )
}
