import type { CRAForm } from '@/types'

export const CRA_FORMS: CRAForm[] = [
  {
    id: 'rc1',
    name: 'Business Registration',
    code: 'RC1',
    description:
      'Request for a Business Number (BN) and register for CRA program accounts including GST/HST, payroll, import/export, and corporate income tax.',
    whenNeeded: 'When registering a new business with the CRA',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/rc1.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 'rc1a',
    name: 'GST/HST Registration',
    code: 'RC1A',
    description:
      'Register for a GST/HST account. Required once your business revenue exceeds $30,000/year, or you can register voluntarily to claim input tax credits.',
    whenNeeded: 'Revenue exceeds $30K/year or voluntary registration',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/rc1.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 'pd7a',
    name: 'Payroll Deductions Remittance',
    code: 'PD7A',
    description:
      'Statement of account for current source deductions. Used to remit payroll deductions (CPP, EI, income tax) to the CRA.',
    whenNeeded: 'When you hire your first employee',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/pd7a.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 't4',
    name: 'T4 Slip — Employment Income',
    code: 'T4',
    description:
      'Statement of Remuneration Paid. Issued to each employee annually, summarising their employment income and deductions for the tax year.',
    whenNeeded: 'Annually, for each employee by end of February',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t4.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 't2',
    name: 'Corporate Income Tax Return',
    code: 'T2',
    description:
      'Corporation Income Tax Return. All resident corporations must file a T2 return within 6 months of their fiscal year-end.',
    whenNeeded: 'Annually, for incorporated businesses',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t2.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 't2125',
    name: 'Business Income Statement',
    code: 'T2125',
    description:
      'Statement of Business or Professional Activities. Sole proprietors and partnerships use this to report business income on their personal tax return.',
    whenNeeded: 'Annually, for sole proprietors and partnerships',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t2125.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
  {
    id: 't661',
    name: 'Scientific Research & Experimental Development (SR&ED) Claim',
    code: 'T661',
    description:
      'Claim for Scientific Research and Experimental Development. Tech companies can claim tax credits for qualifying R&D activities.',
    whenNeeded: 'Annually, for businesses conducting qualifying R&D',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t661.html',
    categories: ['tech'],
  },
  {
    id: 'gst34',
    name: 'GST/HST Return',
    code: 'GST34',
    description:
      'Goods and Services Tax / Harmonized Sales Tax return. Filed regularly (monthly, quarterly, or annually) to report and remit net GST/HST.',
    whenNeeded: 'Regularly, once registered for GST/HST',
    url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/gst34.html',
    categories: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
  },
]
