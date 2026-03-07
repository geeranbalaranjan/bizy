'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/translation'
import type { FounderDemographics, BusinessCharacteristics, EmployeeCount, RevenueRange } from '@/types'

const EMPLOYEE_COUNT_OPTIONS: { value: EmployeeCount; label: string }[] = [
  { value: '0', label: 'Just me (0 employees)' },
  { value: '1_5', label: '1-5 employees' },
  { value: '6_25', label: '6-25 employees' },
  { value: '26_100', label: '26-100 employees' },
  { value: '100_plus', label: '100+ employees' },
]

const REVENUE_RANGE_OPTIONS: { value: RevenueRange; label: string }[] = [
  { value: 'pre_revenue', label: 'Pre-revenue' },
  { value: 'under_50k', label: 'Under $50K' },
  { value: '50k_250k', label: '$50K - $250K' },
  { value: '250k_1m', label: '$250K - $1M' },
  { value: '1m_5m', label: '$1M - $5M' },
  { value: 'over_5m', label: 'Over $5M' },
]

const GENDER_OPTIONS = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const INDIGENOUS_OPTIONS = [
  { value: 'first_nations', label: 'First Nations' },
  { value: 'metis', label: 'Métis' },
  { value: 'inuit', label: 'Inuit' },
  { value: 'none', label: 'None' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const IMMIGRANT_OPTIONS = [
  { value: 'newcomer_under_5_years', label: 'Newcomer (arrived within 5 years)' },
  { value: 'immigrant', label: 'Immigrant (arrived over 5 years ago)' },
  { value: 'citizen_born', label: 'Canadian-born citizen' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

interface StepFourProps {
  onBack: () => void
  onSubmit: (data: {
    employeeCount?: EmployeeCount
    revenueRange?: RevenueRange
    founderDemographics?: FounderDemographics
    businessCharacteristics?: BusinessCharacteristics
  }) => void
  onSkip: () => void
}

export function StepFour({ onBack, onSubmit, onSkip }: StepFourProps) {
  const { t } = useTranslation()
  
  // Business info
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount | ''>('')
  const [revenueRange, setRevenueRange] = useState<RevenueRange | ''>('')
  
  // Founder demographics (optional)
  const [genderIdentity, setGenderIdentity] = useState('')
  const [indigenousIdentity, setIndigenousIdentity] = useState('')
  const [disabilityStatus, setDisabilityStatus] = useState('')
  const [veteranStatus, setVeteranStatus] = useState('')
  const [immigrantStatus, setImmigrantStatus] = useState('')
  const [isYouthEntrepreneur, setIsYouthEntrepreneur] = useState<boolean | null>(null)
  
  // Business characteristics (optional)
  const [womanOwned, setWomanOwned] = useState<boolean | null>(null)
  const [minorityOwned, setMinorityOwned] = useState<boolean | null>(null)
  const [indigenousOwned, setIndigenousOwned] = useState<boolean | null>(null)
  const [ruralLocation, setRuralLocation] = useState<boolean | null>(null)
  const [techStartup, setTechStartup] = useState<boolean | null>(null)
  const [sustainabilityFocus, setSustainabilityFocus] = useState<boolean | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const founderDemographics: FounderDemographics = {}
    if (genderIdentity) founderDemographics.genderIdentity = genderIdentity as FounderDemographics['genderIdentity']
    if (indigenousIdentity) founderDemographics.indigenousIdentity = indigenousIdentity as FounderDemographics['indigenousIdentity']
    if (disabilityStatus) founderDemographics.disabilityStatus = disabilityStatus as FounderDemographics['disabilityStatus']
    if (veteranStatus) founderDemographics.veteranStatus = veteranStatus as FounderDemographics['veteranStatus']
    if (immigrantStatus) founderDemographics.immigrantStatus = immigrantStatus as FounderDemographics['immigrantStatus']
    if (isYouthEntrepreneur !== null) founderDemographics.youthEntrepreneur = isYouthEntrepreneur
    
    const businessCharacteristics: BusinessCharacteristics = {}
    if (womanOwned !== null) businessCharacteristics.womanOwned = womanOwned
    if (minorityOwned !== null) businessCharacteristics.minorityOwned = minorityOwned
    if (indigenousOwned !== null) businessCharacteristics.indigenousOwned = indigenousOwned
    if (ruralLocation !== null) businessCharacteristics.ruralLocation = ruralLocation
    if (techStartup !== null) businessCharacteristics.techStartup = techStartup
    if (sustainabilityFocus !== null) businessCharacteristics.sustainabilityFocus = sustainabilityFocus

    onSubmit({
      employeeCount: employeeCount || undefined,
      revenueRange: revenueRange || undefined,
      founderDemographics: Object.keys(founderDemographics).length > 0 ? founderDemographics : undefined,
      businessCharacteristics: Object.keys(businessCharacteristics).length > 0 ? businessCharacteristics : undefined,
    })
  }

  const BooleanSelect = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: boolean | null
    onChange: (val: boolean | null) => void
    label: string 
  }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <span className="text-sm text-gray-700">{t(label)}</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(value === true ? null : true)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            value === true 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('Yes')}
        </button>
        <button
          type="button"
          onClick={() => onChange(value === false ? null : false)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            value === false 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('No')}
        </button>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Optional notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">ℹ️</span>
          <div>
            <p className="text-sm font-medium text-blue-900">{t('This step is completely optional')}</p>
            <p className="text-sm text-blue-700 mt-1">
              {t('Voluntary self-identification helps us match you with relevant grants and funding opportunities. All information is kept confidential.')}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-4">{t('Business Information')}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Number of Employees')}
            </label>
            <select
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value as EmployeeCount)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('Select...')}</option>
              {EMPLOYEE_COUNT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{t(label)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Annual Revenue Range')}
            </label>
            <select
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value as RevenueRange)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('Select...')}</option>
              {REVENUE_RANGE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{t(label)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Founder Demographics */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-2">{t('Founder Demographics')}</h3>
        <p className="text-xs text-gray-500 mb-4">{t('Voluntary self-identification for grant eligibility')}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Gender Identity')}
            </label>
            <select
              value={genderIdentity}
              onChange={(e) => setGenderIdentity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('Select...')}</option>
              {GENDER_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{t(label)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Indigenous Identity')}
            </label>
            <select
              value={indigenousIdentity}
              onChange={(e) => setIndigenousIdentity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('Select...')}</option>
              {INDIGENOUS_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{t(label)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Immigrant / Newcomer Status')}
            </label>
            <select
              value={immigrantStatus}
              onChange={(e) => setImmigrantStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('Select...')}</option>
              {IMMIGRANT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{t(label)}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Disability Status')}
              </label>
              <select
                value={disabilityStatus}
                onChange={(e) => setDisabilityStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              >
                <option value="">{t('Select...')}</option>
                {YES_NO_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{t(label)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Veteran Status')}
              </label>
              <select
                value={veteranStatus}
                onChange={(e) => setVeteranStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              >
                <option value="">{t('Select...')}</option>
                {YES_NO_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{t(label)}</option>
                ))}
              </select>
            </div>
          </div>

          <BooleanSelect
            value={isYouthEntrepreneur}
            onChange={setIsYouthEntrepreneur}
            label="Youth Entrepreneur (under 30)"
          />
        </div>
      </div>

      {/* Business Characteristics */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-2">{t('Business Characteristics')}</h3>
        <p className="text-xs text-gray-500 mb-4">{t('These help us find relevant funding programs')}</p>
        
        <div className="space-y-3">
          <BooleanSelect
            value={womanOwned}
            onChange={setWomanOwned}
            label="Is the business woman-owned? (51%+ ownership)"
          />
          <BooleanSelect
            value={minorityOwned}
            onChange={setMinorityOwned}
            label="Is the business minority-owned?"
          />
          <BooleanSelect
            value={indigenousOwned}
            onChange={setIndigenousOwned}
            label="Is the business Indigenous-owned?"
          />
          <BooleanSelect
            value={ruralLocation}
            onChange={setRuralLocation}
            label="Is the business located in a rural area?"
          />
          <BooleanSelect
            value={techStartup}
            onChange={setTechStartup}
            label="Is the business a technology startup?"
          />
          <BooleanSelect
            value={sustainabilityFocus}
            onChange={setSustainabilityFocus}
            label="Is the business focused on sustainability or green innovation?"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          {t('Back')}
        </Button>
        <Button type="button" variant="outline" onClick={onSkip} className="flex-1">
          {t('Skip')}
        </Button>
        <Button type="submit" className="flex-1">
          {t('Submit')}
        </Button>
      </div>
    </form>
  )
}
