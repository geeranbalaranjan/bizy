'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/translation'
import type { FounderDemographics, BusinessCharacteristics, EmployeeCount, RevenueRange } from '@/types'
import type { TranslationKey } from '@/lib/i18n'

interface OptionWithKey {
  value: string
  labelKey: TranslationKey
}

const EMPLOYEE_COUNT_OPTIONS: { value: EmployeeCount; labelKey: TranslationKey }[] = [
  { value: '0', labelKey: 'employees.justMe' },
  { value: '1_5', labelKey: 'employees.1to5' },
  { value: '6_25', labelKey: 'employees.6to25' },
  { value: '26_100', labelKey: 'employees.26to100' },
  { value: '100_plus', labelKey: 'employees.100plus' },
]

const REVENUE_RANGE_OPTIONS: { value: RevenueRange; labelKey: TranslationKey }[] = [
  { value: 'pre_revenue', labelKey: 'revenue.preRevenue' },
  { value: 'under_50k', labelKey: 'revenue.under50k' },
  { value: '50k_250k', labelKey: 'revenue.50kTo250k' },
  { value: '250k_1m', labelKey: 'revenue.250kTo1m' },
  { value: '1m_5m', labelKey: 'revenue.1mTo5m' },
  { value: 'over_5m', labelKey: 'revenue.over5m' },
]

const GENDER_OPTIONS: OptionWithKey[] = [
  { value: 'woman', labelKey: 'gender.woman' },
  { value: 'man', labelKey: 'gender.man' },
  { value: 'non_binary', labelKey: 'gender.nonBinary' },
  { value: 'other', labelKey: 'gender.other' },
  { value: 'prefer_not_to_say', labelKey: 'gender.preferNotToSay' },
]

const INDIGENOUS_OPTIONS: OptionWithKey[] = [
  { value: 'first_nations', labelKey: 'indigenous.firstNations' },
  { value: 'metis', labelKey: 'indigenous.metis' },
  { value: 'inuit', labelKey: 'indigenous.inuit' },
  { value: 'none', labelKey: 'indigenous.none' },
  { value: 'prefer_not_to_say', labelKey: 'indigenous.preferNotToSay' },
]

const YES_NO_OPTIONS: OptionWithKey[] = [
  { value: 'yes', labelKey: 'common.yes' },
  { value: 'no', labelKey: 'common.no' },
  { value: 'prefer_not_to_say', labelKey: 'common.preferNotToSay' },
]

const IMMIGRANT_OPTIONS: OptionWithKey[] = [
  { value: 'newcomer_under_5_years', labelKey: 'immigrant.newcomer' },
  { value: 'immigrant', labelKey: 'immigrant.immigrant' },
  { value: 'citizen_born', labelKey: 'immigrant.citizenBorn' },
  { value: 'prefer_not_to_say', labelKey: 'immigrant.preferNotToSay' },
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
    labelKey 
  }: { 
    value: boolean | null
    onChange: (val: boolean | null) => void
    labelKey: TranslationKey 
  }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <span className="text-sm text-gray-700">{t(labelKey)}</span>
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
          {t('common.yes')}
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
          {t('common.no')}
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
            <p className="text-sm font-medium text-blue-900">{t('onboarding.stepFour.optionalNotice')}</p>
            <p className="text-sm text-blue-700 mt-1">
              {t('onboarding.stepFour.optionalDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-4">{t('onboarding.stepFour.businessInfo')}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('onboarding.stepFour.numberOfEmployees')}
            </label>
            <select
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value as EmployeeCount)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('common.select')}</option>
              {EMPLOYEE_COUNT_OPTIONS.map(({ value, labelKey }) => (
                <option key={value} value={value}>{t(labelKey)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('onboarding.stepFour.annualRevenue')}
            </label>
            <select
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value as RevenueRange)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('common.select')}</option>
              {REVENUE_RANGE_OPTIONS.map(({ value, labelKey }) => (
                <option key={value} value={value}>{t(labelKey)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Founder Demographics */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-2">{t('onboarding.founderDemographics')}</h3>
        <p className="text-xs text-gray-500 mb-4">{t('onboarding.founderDemographicsDesc')}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('onboarding.genderIdentity')}
            </label>
            <select
              value={genderIdentity}
              onChange={(e) => setGenderIdentity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('common.select')}</option>
              {GENDER_OPTIONS.map(({ value, labelKey }) => (
                <option key={value} value={value}>{t(labelKey)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('onboarding.indigenousIdentity')}
            </label>
            <select
              value={indigenousIdentity}
              onChange={(e) => setIndigenousIdentity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('common.select')}</option>
              {INDIGENOUS_OPTIONS.map(({ value, labelKey }) => (
                <option key={value} value={value}>{t(labelKey)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('onboarding.immigrantStatus')}
            </label>
            <select
              value={immigrantStatus}
              onChange={(e) => setImmigrantStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="">{t('common.select')}</option>
              {IMMIGRANT_OPTIONS.map(({ value, labelKey }) => (
                <option key={value} value={value}>{t(labelKey)}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('onboarding.disabilityStatus')}
              </label>
              <select
                value={disabilityStatus}
                onChange={(e) => setDisabilityStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              >
                <option value="">{t('common.select')}</option>
                {YES_NO_OPTIONS.map(({ value, labelKey }) => (
                  <option key={value} value={value}>{t(labelKey)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('onboarding.veteranStatus')}
              </label>
              <select
                value={veteranStatus}
                onChange={(e) => setVeteranStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              >
                <option value="">{t('common.select')}</option>
                {YES_NO_OPTIONS.map(({ value, labelKey }) => (
                  <option key={value} value={value}>{t(labelKey)}</option>
                ))}
              </select>
            </div>
          </div>

          <BooleanSelect
            value={isYouthEntrepreneur}
            onChange={setIsYouthEntrepreneur}
            labelKey="onboarding.youthEntrepreneur"
          />
        </div>
      </div>

      {/* Business Characteristics */}
      <div>
        <h3 className="font-heading font-semibold text-brand-primary mb-2">{t('onboarding.businessCharacteristics')}</h3>
        <p className="text-xs text-gray-500 mb-4">{t('onboarding.businessCharacteristicsDesc')}</p>
        
        <div className="space-y-3">
          <BooleanSelect
            value={womanOwned}
            onChange={setWomanOwned}
            labelKey="onboarding.womanOwned"
          />
          <BooleanSelect
            value={minorityOwned}
            onChange={setMinorityOwned}
            labelKey="onboarding.minorityOwned"
          />
          <BooleanSelect
            value={indigenousOwned}
            onChange={setIndigenousOwned}
            labelKey="onboarding.indigenousOwned"
          />
          <BooleanSelect
            value={ruralLocation}
            onChange={setRuralLocation}
            labelKey="onboarding.ruralLocation"
          />
          <BooleanSelect
            value={techStartup}
            onChange={setTechStartup}
            labelKey="onboarding.techStartup"
          />
          <BooleanSelect
            value={sustainabilityFocus}
            onChange={setSustainabilityFocus}
            labelKey="onboarding.sustainabilityFocus"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          {t('common.back')}
        </Button>
        <Button type="button" variant="outline" onClick={onSkip} className="flex-1">
          {t('common.skip')}
        </Button>
        <Button type="submit" className="flex-1">
          {t('common.submit')}
        </Button>
      </div>
    </form>
  )
}
