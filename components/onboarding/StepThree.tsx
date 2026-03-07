'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const STAGE_OPTIONS = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'ready', label: 'Ready to launch' },
] as const

const BUDGET_OPTIONS = [
  { value: 'under_5k', label: 'Under $5K' },
  { value: '5k_25k', label: '$5K - $25K' },
  { value: '25k_100k', label: '$25K - $100K' },
  { value: 'over_100k', label: '$100K+' },
] as const

const GOAL_OPTIONS = [
  { value: 'first sale', label: 'First sale' },
  { value: 'full-time income', label: 'Full-time income' },
  { value: 'hire employees', label: 'Hire employees' },
  { value: 'scale nationally', label: 'Scale nationally' },
] as const

interface StepThreeProps {
  onBack: () => void
  onSubmit: (data: {
    stage: string
    budget: string
    goals: string[]
    background?: string
  }) => void
}

export function StepThree({ onBack, onSubmit }: StepThreeProps) {
  const [stage, setStage] = useState('')
  const [budget, setBudget] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [background, setBackground] = useState('')

  const toggleGoal = (value: string) => {
    setGoals((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ stage, budget, goals, background: background || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <span className="mb-2 block font-heading text-sm font-medium text-brand-primary">
          Stage
        </span>
        <div className="space-y-2">
          {STAGE_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-brand-accent/50"
            >
              <input
                type="radio"
                name="stage"
                value={value}
                checked={stage === value}
                onChange={(e) => setStage(e.target.value)}
                className="h-4 w-4 text-brand-accent"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          Budget
        </label>
        <select
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          required
        >
          <option value="">Select budget range</option>
          {BUDGET_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-2 block font-heading text-sm font-medium text-brand-primary">
          Goals
        </span>
        <div className="space-y-2">
          {GOAL_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-brand-accent/50"
            >
              <input
                type="checkbox"
                checked={goals.includes(value)}
                onChange={() => toggleGoal(value)}
                className="h-4 w-4 rounded text-brand-accent"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="background"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          Background (optional)
        </label>
        <textarea
          id="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          placeholder="Tell us about your experience..."
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Submit
        </Button>
      </div>
    </form>
  )
}
