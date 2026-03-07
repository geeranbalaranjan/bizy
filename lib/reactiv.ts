import type { ReactivClipConfig } from '@/types'

const REACTIV_API_BASE = 'https://api.reactiv.ai/v1'

interface ReactivClipResponse {
  url: string
  qr_code_url: string
}

export async function createAppClip(
  config: ReactivClipConfig
): Promise<ReactivClipResponse> {
  const response = await fetch(`${REACTIV_API_BASE}/clips`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACTIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      store_id: process.env.REACTIV_STORE_ID,
      name: config.businessName,
      tagline: config.tagline,
      products: config.products,
      branding: {
        logo: config.logoUrl,
        primary_color: config.primaryColor,
      },
      contact: config.contactInfo,
      order_type: config.orderType,
    }),
  })

  if (!response.ok) {
    throw new Error(`Reactiv API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
