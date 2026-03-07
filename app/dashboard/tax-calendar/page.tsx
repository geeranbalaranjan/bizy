'use client'

import { useState, useMemo } from 'react'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'
import { BusinessType } from '@/types'

interface TaxDeadline {
  id: string
  name: string
  date: string
  description: string
  applies: BusinessType[]
  hasPayroll: boolean
  hasGST: boolean
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annual'
  url: string
  penalty: string
}

// 2026 Canadian tax deadlines
const TAX_DEADLINES_2026: TaxDeadline[] = [
  // Annual deadlines
  {
    id: 'personal-tax',
    name: 'Personal Tax Return (T1)',
    date: '2026-04-30',
    description: 'File your personal income tax return for 2025',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'annual',
    url: 'https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/netfile-overview.html',
    penalty: 'Late filing penalty: 5% of balance owing + 1% per month (max 12 months)'
  },
  {
    id: 'self-employed-tax',
    name: 'Self-Employed Tax Return (T1)',
    date: '2026-06-15',
    description: 'Extended deadline for self-employed individuals to FILE (payment still due April 30)',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'annual',
    url: 'https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/netfile-overview.html',
    penalty: 'Interest accrues from May 1 on unpaid amounts'
  },
  {
    id: 'corp-tax-return',
    name: 'Corporate Tax Return (T2)',
    date: '2026-06-30',
    description: 'File corporate tax return within 6 months of fiscal year-end (assuming Dec 31 year-end)',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'annual',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-income-tax-return.html',
    penalty: 'Late filing: 5% of unpaid tax + 1% per month (max 12 months)'
  },
  {
    id: 't4-summary',
    name: 'T4 Summary & Slips',
    date: '2026-02-28',
    description: 'Provide T4 slips to employees and file T4 Summary with CRA',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'annual',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/completing-filing-information-returns/t4-information-employers.html',
    penalty: '$100/day late (min $100, max $7,500)'
  },
  {
    id: 't5-summary',
    name: 'T5 Summary (Dividends)',
    date: '2026-02-28',
    description: 'File T5 slips if your corporation paid dividends',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'annual',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/completing-slips-summaries/financial-slips-summaries/return-investment-income-t5.html',
    penalty: '$25/day late per slip (max $2,500)'
  },
  // GST/HST Quarterly (Q1 2026)
  {
    id: 'gst-q1',
    name: 'GST/HST Return - Q1 2026',
    date: '2026-04-30',
    description: 'File and remit GST/HST collected Jan 1 - Mar 31, 2026',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: true,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/complete-file-return.html',
    penalty: 'Interest + 1% penalty + 0.25% per month late'
  },
  {
    id: 'gst-q2',
    name: 'GST/HST Return - Q2 2026',
    date: '2026-07-31',
    description: 'File and remit GST/HST collected Apr 1 - Jun 30, 2026',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: true,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/complete-file-return.html',
    penalty: 'Interest + 1% penalty + 0.25% per month late'
  },
  {
    id: 'gst-q3',
    name: 'GST/HST Return - Q3 2026',
    date: '2026-10-31',
    description: 'File and remit GST/HST collected Jul 1 - Sep 30, 2026',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: true,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/complete-file-return.html',
    penalty: 'Interest + 1% penalty + 0.25% per month late'
  },
  {
    id: 'gst-q4',
    name: 'GST/HST Return - Q4 2026',
    date: '2027-01-31',
    description: 'File and remit GST/HST collected Oct 1 - Dec 31, 2026',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: true,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/complete-file-return.html',
    penalty: 'Interest + 1% penalty + 0.25% per month late'
  },
  // Payroll remittances (monthly example - showing Q1)
  {
    id: 'payroll-jan',
    name: 'Payroll Remittance - January',
    date: '2026-02-15',
    description: 'Remit CPP, EI, and income tax withheld for January payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-feb',
    name: 'Payroll Remittance - February',
    date: '2026-03-15',
    description: 'Remit CPP, EI, and income tax withheld for February payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-mar',
    name: 'Payroll Remittance - March',
    date: '2026-04-15',
    description: 'Remit CPP, EI, and income tax withheld for March payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-apr',
    name: 'Payroll Remittance - April',
    date: '2026-05-15',
    description: 'Remit CPP, EI, and income tax withheld for April payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-may',
    name: 'Payroll Remittance - May',
    date: '2026-06-15',
    description: 'Remit CPP, EI, and income tax withheld for May payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-jun',
    name: 'Payroll Remittance - June',
    date: '2026-07-15',
    description: 'Remit CPP, EI, and income tax withheld for June payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-jul',
    name: 'Payroll Remittance - July',
    date: '2026-08-15',
    description: 'Remit CPP, EI, and income tax withheld for July payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-aug',
    name: 'Payroll Remittance - August',
    date: '2026-09-15',
    description: 'Remit CPP, EI, and income tax withheld for August payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-sep',
    name: 'Payroll Remittance - September',
    date: '2026-10-15',
    description: 'Remit CPP, EI, and income tax withheld for September payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-oct',
    name: 'Payroll Remittance - October',
    date: '2026-11-15',
    description: 'Remit CPP, EI, and income tax withheld for October payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-nov',
    name: 'Payroll Remittance - November',
    date: '2026-12-15',
    description: 'Remit CPP, EI, and income tax withheld for November payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  {
    id: 'payroll-dec',
    name: 'Payroll Remittance - December',
    date: '2027-01-15',
    description: 'Remit CPP, EI, and income tax withheld for December payroll',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: true,
    hasGST: false,
    frequency: 'monthly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/remitting-source-deductions.html',
    penalty: '3% if 1-3 days late, 5% if 4-5 days, 7% if 6-7 days, 10% if 7+ days'
  },
  // Corporate instalments (quarterly)
  {
    id: 'corp-instalment-q1',
    name: 'Corporate Tax Instalment - Q1',
    date: '2026-03-31',
    description: 'Quarterly corporate tax instalment payment',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-instalments.html',
    penalty: 'Interest charged on late instalments'
  },
  {
    id: 'corp-instalment-q2',
    name: 'Corporate Tax Instalment - Q2',
    date: '2026-06-30',
    description: 'Quarterly corporate tax instalment payment',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-instalments.html',
    penalty: 'Interest charged on late instalments'
  },
  {
    id: 'corp-instalment-q3',
    name: 'Corporate Tax Instalment - Q3',
    date: '2026-09-30',
    description: 'Quarterly corporate tax instalment payment',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-instalments.html',
    penalty: 'Interest charged on late instalments'
  },
  {
    id: 'corp-instalment-q4',
    name: 'Corporate Tax Instalment - Q4',
    date: '2026-12-31',
    description: 'Quarterly corporate tax instalment payment',
    applies: ['food', 'retail', 'services', 'tech', 'construction', 'health', 'education', 'other'],
    hasPayroll: false,
    hasGST: false,
    frequency: 'quarterly',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-instalments.html',
    penalty: 'Interest charged on late instalments'
  },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function TaxCalendarPage() {
  const { businessProfile } = useBusinessProfile()
  const { t } = useTranslation()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [hasPayroll, setHasPayroll] = useState(false)
  const [hasGST, setHasGST] = useState(true)
  const [showAllTypes, setShowAllTypes] = useState(true)

  const filteredDeadlines = useMemo(() => {
    return TAX_DEADLINES_2026.filter(deadline => {
      // Filter by payroll
      if (deadline.hasPayroll && !hasPayroll) return false
      
      // Filter by GST
      if (deadline.hasGST && !hasGST) return false

      // Filter by business type
      if (!showAllTypes && businessProfile?.businessType) {
        if (!deadline.applies.includes(businessProfile.businessType)) return false
      }

      return true
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [hasPayroll, hasGST, showAllTypes, businessProfile])

  const deadlinesByMonth = useMemo(() => {
    const grouped: Record<number, TaxDeadline[]> = {}
    
    filteredDeadlines.forEach(deadline => {
      const month = new Date(deadline.date).getMonth()
      if (!grouped[month]) grouped[month] = []
      grouped[month].push(deadline)
    })

    return grouped
  }, [filteredDeadlines])

  const upcomingDeadlines = useMemo(() => {
    const today = new Date()
    return filteredDeadlines
      .filter(d => new Date(d.date) >= today)
      .slice(0, 5)
  }, [filteredDeadlines])

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil < 0) return 'bg-gray-100 text-gray-500 border-gray-300'
    if (daysUntil <= 7) return 'bg-red-50 text-red-700 border-red-300'
    if (daysUntil <= 30) return 'bg-amber-50 text-amber-700 border-amber-300'
    return 'bg-green-50 text-green-700 border-green-300'
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-CA', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('Tax Deadline Calendar')}</h1>
        <p className="text-gray-600">
          {t('Never miss a CRA deadline — stay compliant and avoid penalties')}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">{t('Show deadlines for')}:</span>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasGST}
              onChange={(e) => setHasGST(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t('GST/HST Registered')}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasPayroll}
              onChange={(e) => setHasPayroll(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t('Has Employees')}</span>
          </label>

          <div className="ml-auto text-sm text-gray-500">
            {t('Showing')} {filteredDeadlines.length} {t('deadlines')}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">⏰</span> {t('Coming Up')}
            </h2>
            
            <div className="space-y-3">
              {upcomingDeadlines.map(deadline => {
                const daysUntil = getDaysUntil(deadline.date)
                return (
                  <div 
                    key={deadline.id}
                    className={`p-3 rounded-lg border ${getUrgencyColor(daysUntil)}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm">{deadline.name}</div>
                        <div className="text-xs mt-1 opacity-80">{formatDate(deadline.date)}</div>
                      </div>
                      <div className="text-xs font-semibold whitespace-nowrap">
                        {daysUntil === 0 ? t('TODAY') : daysUntil === 1 ? `1 ${t('day')}` : `${daysUntil} ${t('days')}`}
                      </div>
                    </div>
                  </div>
                )
              })}

              {upcomingDeadlines.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  {t('No upcoming deadlines with current filters')}
                </p>
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-2">{t('Legend')}</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-200 border border-red-400" />
                  <span className="text-gray-600">{t('Due within 7 days')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-200 border border-amber-400" />
                  <span className="text-gray-600">{t('Due within 30 days')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-200 border border-green-400" />
                  <span className="text-gray-600">{t('30+ days away')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Month Selector */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {MONTHS.map((month, idx) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(idx)}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedMonth === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {month.slice(0, 3)}
                {deadlinesByMonth[idx]?.length > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                    selectedMonth === idx ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {deadlinesByMonth[idx].length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Deadlines for Selected Month */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{MONTHS[selectedMonth]} 2026</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {deadlinesByMonth[selectedMonth]?.map(deadline => {
                const daysUntil = getDaysUntil(deadline.date)
                return (
                  <div key={deadline.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Date Badge */}
                      <div className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 ${getUrgencyColor(daysUntil)}`}>
                        <div className="text-lg font-bold">{new Date(deadline.date).getDate()}</div>
                        <div className="text-xs uppercase">{MONTHS[new Date(deadline.date).getMonth()].slice(0, 3)}</div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{deadline.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full shrink-0 ${
                            deadline.frequency === 'annual' ? 'bg-purple-100 text-purple-700' :
                            deadline.frequency === 'quarterly' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {deadline.frequency}
                          </span>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-4 text-xs">
                          <span className="text-red-600">⚠️ {deadline.penalty}</span>
                        </div>

                        <div className="mt-3">
                          <a 
                            href={deadline.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            {t('File Now')} →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {!deadlinesByMonth[selectedMonth] && (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="text-gray-600">{t('No deadlines this month!')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">⚠️ {t('Common Mistakes That Cost New Business Owners')}</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <strong>{t('Missing payroll remittances')}</strong> — {t('The CRA is ruthless about payroll. Late = automatic penalties every single time.')}
          </div>
          <div>
            <strong>{t('Forgetting GST/HST')}</strong> — {t("That money isn't yours. Set it aside monthly or quarterly payments become a shock.")}
          </div>
          <div>
            <strong>{t('No instalments')}</strong> — {t('If you owe $3K+ in taxes, CRA expects quarterly instalments. Interest adds up fast.')}
          </div>
        </div>
      </div>
    </div>
  )
}
