'use client'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/translation'
import type { GrantTag } from '@/types'

export interface GrantFilters {
  type?: string
  province?: string
  tag?: GrantTag
  searchQuery?: string
}

interface GrantFilterProps {
  currentFilters: GrantFilters
  onFilter: (filters: GrantFilters) => void
}

const GRANT_TYPES = [
  { value: '', label: 'All types' },
  { value: 'grant', label: 'Grant' },
  { value: 'loan', label: 'Loan' },
  { value: 'tax_credit', label: 'Tax Credit' },
  { value: 'subsidy', label: 'Subsidy' },
]

const PROVINCES = [
  { value: '', label: 'All provinces' },
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'QC', label: 'Quebec' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'YT', label: 'Yukon' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'all', label: 'National' },
]

const TAGS: { value: GrantTag | ''; label: string }[] = [
  { value: '', label: 'All categories' },
  { value: 'general', label: 'General' },
  { value: 'women_owned', label: 'Women-owned' },
  { value: 'youth', label: 'Youth' },
  { value: 'indigenous', label: 'Indigenous' },
  { value: 'immigrant', label: 'Newcomer / Immigrant' },
  { value: 'tech_startup', label: 'Tech & Innovation' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'rural', label: 'Rural' },
  { value: 'veteran', label: 'Veteran' },
  { value: 'disability', label: 'Disability' },
  { value: 'minority_owned', label: 'Minority-owned' },
  { value: 'innovation', label: 'Innovation' },
]

export function GrantFilter({ currentFilters, onFilter }: GrantFilterProps) {
  const { t } = useTranslation()
  
  const handleTypeChange = (type: string) => {
    onFilter({ ...currentFilters, type: type || undefined })
  }

  const handleProvinceChange = (province: string) => {
    onFilter({ ...currentFilters, province: province || undefined })
  }

  const handleTagChange = (tag: string) => {
    onFilter({ ...currentFilters, tag: (tag as GrantTag) || undefined })
  }

  const handleSearchChange = (query: string) => {
    onFilter({ ...currentFilters, searchQuery: query || undefined })
  }

  const handleClear = () => {
    onFilter({})
  }

  const hasFilters = currentFilters.type || currentFilters.province || currentFilters.tag || currentFilters.searchQuery

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder={t('Search grants...')}
          value={currentFilters.searchQuery ?? ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
      </div>
      
      {/* Type filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="filter-type" className="text-sm font-medium text-gray-700">
          {t('Type')}:
        </label>
        <select
          id="filter-type"
          value={currentFilters.type ?? ''}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
          {GRANT_TYPES.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Province filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="filter-province"
          className="text-sm font-medium text-gray-700"
        >
          {t('Province')}:
        </label>
        <select
          id="filter-province"
          value={currentFilters.province ?? ''}
          onChange={(e) => handleProvinceChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
          {PROVINCES.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Tag/Category filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="filter-tag"
          className="text-sm font-medium text-gray-700"
        >
          {t('Category')}:
        </label>
        <select
          id="filter-tag"
          value={currentFilters.tag ?? ''}
          onChange={(e) => handleTagChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
          {TAGS.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {t(label)}
            </option>
          ))}
        </select>
      </div>
      
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleClear}>
          {t('Clear filters')}
        </Button>
      )}
    </div>
  )
}
