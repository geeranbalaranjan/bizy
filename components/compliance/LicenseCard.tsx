'use client'

import { ExternalLink } from 'lucide-react'
import type { License } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LicenseCardProps {
  license: License
}

export function LicenseCard({ license }: LicenseCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h4 className="font-heading font-semibold text-brand-primary">
        {license.name}
      </h4>
      <p className="mt-1 text-sm text-gray-500">{license.issuingAuthority}</p>
      <p className="mt-2 text-sm text-gray-600">{license.description}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <span className="text-gray-600">
          <span className="font-medium">Cost:</span> {license.estimatedCost}
        </span>
        <span className="text-gray-600">
          <span className="font-medium">Time:</span> {license.estimatedTime}
        </span>
        {license.renewalPeriod && (
          <span className="text-gray-600">
            <span className="font-medium">Renewal:</span> {license.renewalPeriod}
          </span>
        )}
      </div>
      <Link
        href={license.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block"
      >
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          Application link
        </Button>
      </Link>
    </div>
  )
}
