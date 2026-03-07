'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PROVINCES } from '@/lib/utils/province'

interface StepTwoProps {
  onNext: (data: {
    province: string
    city: string
    targetCustomers: string
  }) => void
  onBack: () => void
}

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [targetCustomers, setTargetCustomers] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ province, city, targetCustomers })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="province"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          Province / Territory
        </label>
        <select
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          required
        >
          <option value="">Select province</option>
          {PROVINCES.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="city"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          City
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          placeholder="Enter your city"
          required
        />
      </div>

      <div>
        <label
          htmlFor="targetCustomers"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          Target Customers
        </label>
        <input
          id="targetCustomers"
          type="text"
          value={targetCustomers}
          onChange={(e) => setTargetCustomers(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          placeholder="Who are your target customers?"
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  )
}
