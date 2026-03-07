import { NextRequest, NextResponse } from 'next/server'
import { GRANTS } from '@/lib/data/grants'
import type { BusinessType, CanadianProvince } from '@/types'

interface GrantsRequestBody {
  businessType: BusinessType
  province: CanadianProvince
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GrantsRequestBody
    const { businessType, province } = body

    if (!businessType || !province) {
      return NextResponse.json(
        { error: 'businessType and province are required' },
        { status: 400 }
      )
    }

    const filtered = GRANTS.filter((grant) => {
      const provinceMatch =
        grant.eligibility.provinces === 'all' ||
        grant.eligibility.provinces.includes(province)
      const businessMatch = grant.eligibility.businessTypes.includes(businessType)
      return provinceMatch && businessMatch
    })

    const sorted = [...filtered].sort(
      (a, b) => (b.amount?.max ?? 0) - (a.amount?.max ?? 0)
    )

    return NextResponse.json({ grants: sorted })
  } catch (error) {
    console.error('Grants API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grants' },
      { status: 500 }
    )
  }
}
