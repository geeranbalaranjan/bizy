import { NextRequest, NextResponse } from 'next/server'
import { createAppClip } from '@/lib/reactiv'
import type { ReactivClipConfig } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const config = (await req.json()) as ReactivClipConfig

    if (!config?.businessName || !config?.products || !config?.orderType) {
      return NextResponse.json(
        { error: 'businessName, products, and orderType are required' },
        { status: 400 }
      )
    }

    const result = await createAppClip(config)

    return NextResponse.json({
      clipUrl: result.url,
      qrCode: result.qr_code_url,
    })
  } catch (error) {
    console.error('Reactiv API error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create app clip',
      },
      { status: 500 }
    )
  }
}
