'use client'

import { ExternalLink, HelpCircle } from 'lucide-react'
import type { CRAForm } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CRADocCardProps {
  form: CRAForm
  onExplain?: (formId: string) => void
}

export function CRADocCard({ form, onExplain }: CRADocCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-primary px-2 py-0.5 font-mono text-xs font-medium text-white">
              {form.code}
            </span>
            <h4 className="font-heading font-semibold text-brand-primary">
              {form.name}
            </h4>
          </div>
          <p className="mt-2 text-sm text-gray-600">{form.description}</p>
          <p className="mt-1 text-xs text-gray-500">
            <span className="font-medium">When needed:</span> {form.whenNeeded}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onExplain?.(form.id)}
          aria-label="Explain this form"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={form.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            View form
          </Button>
        </Link>
      </div>
    </div>
  )
}
