'use client'

import { Button } from '@/components/ui/button'

export interface GrantFilters {
  type?: string
  province?: string
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
  { value: 'all', label: 'National' },
]

export function GrantFilter({ currentFilters, onFilter }: GrantFilterProps) {
  const handleTypeChange = (type: string) => {
    onFilter({ ...currentFilters, type: type || undefined })
  }

  const handleProvinceChange = (province: string) => {
    onFilter({ ...currentFilters, province: province || undefined })
  }

  const handleClear = () => {
    onFilter({})
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <label htmlFor="filter-type" className="text-sm font-medium text-gray-700">
          Type:
        </label>
        <select
          id="filter-type"
          value={currentFilters.type ?? ''}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
          {GRANT_TYPES.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor="filter-province"
          className="text-sm font-medium text-gray-700"
        >
          Province:
        </label>
        <select
          id="filter-province"
          value={currentFilters.province ?? ''}
          onChange={(e) => handleProvinceChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
          {PROVINCES.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Button variant="ghost" size="sm" onClick={handleClear}>
        Clear filters
      </Button>
    </div>
  )
}
