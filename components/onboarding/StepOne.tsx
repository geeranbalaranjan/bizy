'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/translation'

const BUSINESS_TYPES = [
  { value: 'food', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Services' },
  { value: 'tech', label: 'Technology' },
  { value: 'construction', label: 'Construction' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
] as const

interface StepOneProps {
  onNext: (data: {
    businessName: string
    businessType: string
    businessDescription: string
  }) => void
}

export function StepOne({ onNext }: StepOneProps) {
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ businessName, businessType, businessDescription })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="businessName"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          {t('Business Name')}
        </label>
        <input
          id="businessName"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          placeholder={t('Enter your business name')}
          required
        />
      </div>

      <div>
        <label
          htmlFor="businessType"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          {t('Business Type')}
        </label>
        <select
          id="businessType"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          required
        >
          <option value="">{t('Select business type')}</option>
          {BUSINESS_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="businessDescription"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          {t('Business Description')}
        </label>
        <textarea
          id="businessDescription"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          placeholder={t('Describe your business...')}
        />
      </div>

      <Button type="submit" className="w-full">
        {t('Continue')}
      </Button>
    </form>
  )
}
