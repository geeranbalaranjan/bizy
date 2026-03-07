import type { CanadianProvince } from '@/types'

export const PROVINCE_NAMES: Record<CanadianProvince, string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
}

export const PROVINCES = Object.entries(PROVINCE_NAMES).map(([code, name]) => ({
  code: code as CanadianProvince,
  name,
}))

export function getProvinceName(code: CanadianProvince): string {
  return PROVINCE_NAMES[code] ?? code
}

export const HST_PROVINCES: CanadianProvince[] = ['ON', 'NB', 'NL', 'NS', 'PE']
export const GST_ONLY_PROVINCES: CanadianProvince[] = ['AB', 'BC', 'MB', 'QC', 'SK', 'NT', 'NU', 'YT']

export function getTaxType(province: CanadianProvince): string {
  if (HST_PROVINCES.includes(province)) return 'HST'
  if (province === 'QC') return 'GST + QST'
  if (['BC', 'MB', 'SK'].includes(province)) return 'GST + PST'
  return 'GST'
}
