'use client'

import { QrCode, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AppClipPreviewProps {
  clipUrl: string
  qrCodeUrl: string
}

export function AppClipPreview({ clipUrl, qrCodeUrl }: AppClipPreviewProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h4 className="font-heading text-lg font-semibold text-brand-primary">
        App Clip Preview
      </h4>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            <QrCode className="h-16 w-16 text-gray-400" />
          </div>
          <p className="text-center text-xs text-gray-500">QR Code</p>
          <a
            href={qrCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-accent hover:underline"
          >
            {qrCodeUrl}
          </a>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">Clip URL</p>
          <p className="mt-1 break-all text-sm text-gray-600">{clipUrl}</p>
          <Link href={clipUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-4 w-4" />
              Open preview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
