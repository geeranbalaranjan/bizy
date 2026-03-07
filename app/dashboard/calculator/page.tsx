'use client'

import { useState, useMemo } from 'react'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'

interface CalculatorInputs {
  startupCosts: number
  monthlyFixedCosts: number
  variableCostPerUnit: number
  averageSalePrice: number
}

export default function BreakEvenCalculator() {
  const { businessProfile } = useBusinessProfile()
  const { t } = useTranslation()
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    startupCosts: 10000,
    monthlyFixedCosts: 3000,
    variableCostPerUnit: 15,
    averageSalePrice: 50,
  })

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: Math.max(0, value) }))
  }

  const calculations = useMemo(() => {
    const { startupCosts, monthlyFixedCosts, variableCostPerUnit, averageSalePrice } = inputs
    
    // Contribution margin per unit
    const contributionMargin = averageSalePrice - variableCostPerUnit
    
    // Break-even units per month (to cover fixed costs)
    const breakEvenUnitsMonthly = contributionMargin > 0 
      ? Math.ceil(monthlyFixedCosts / contributionMargin) 
      : Infinity
    
    // Break-even revenue per month
    const breakEvenRevenueMonthly = breakEvenUnitsMonthly * averageSalePrice
    
    // Months to recover startup costs (after reaching monthly break-even)
    const monthsToRecoverStartup = contributionMargin > 0 && breakEvenUnitsMonthly < Infinity
      ? Math.ceil(startupCosts / (contributionMargin * breakEvenUnitsMonthly - monthlyFixedCosts + monthlyFixedCosts)) 
      : Infinity
    
    // Actually, simpler: after break-even, extra profit per unit goes to startup recovery
    // If selling exactly break-even units, no extra profit - need to sell more
    // Let's assume they sell 20% more than break-even
    const targetUnitsMonthly = Math.ceil(breakEvenUnitsMonthly * 1.2)
    const monthlyProfit = (targetUnitsMonthly * contributionMargin) - monthlyFixedCosts
    const monthsToRecoverAtTarget = monthlyProfit > 0 
      ? Math.ceil(startupCosts / monthlyProfit)
      : Infinity

    // Daily breakdown
    const breakEvenUnitsDaily = Math.ceil(breakEvenUnitsMonthly / 30)
    const breakEvenRevenueDaily = breakEvenUnitsDaily * averageSalePrice

    // Profit margin percentage
    const profitMarginPercent = averageSalePrice > 0 
      ? ((contributionMargin / averageSalePrice) * 100).toFixed(1)
      : '0'

    return {
      contributionMargin,
      breakEvenUnitsMonthly,
      breakEvenRevenueMonthly,
      breakEvenUnitsDaily,
      breakEvenRevenueDaily,
      targetUnitsMonthly,
      monthlyProfit,
      monthsToRecoverAtTarget,
      profitMarginPercent,
      isValid: contributionMargin > 0
    }
  }, [inputs])

  const formatCurrency = (amount: number) => {
    if (!isFinite(amount)) return '—'
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('Break-Even Calculator')}</h1>
        <p className="text-gray-600">
          {t('Find out exactly how many sales you need to cover your costs')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('Your Numbers')}</h2>
          
          <div className="space-y-6">
            {/* Startup Costs */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t('Initial Startup Costs')}</span>
                <span className="text-xs text-gray-500">{t('One-time investment')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={inputs.startupCosts || ''}
                  onChange={(e) => updateInput('startupCosts', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{t('Equipment, inventory, setup, legal fees, etc.')}</p>
            </div>

            {/* Monthly Fixed Costs */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t('Monthly Fixed Costs')}</span>
                <span className="text-xs text-gray-500">{t('Recurring every month')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={inputs.monthlyFixedCosts || ''}
                  onChange={(e) => updateInput('monthlyFixedCosts', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3000"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{t('Rent, utilities, insurance, subscriptions, etc.')}</p>
            </div>

            {/* Variable Cost Per Unit */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t('Cost Per Sale/Unit')}</span>
                <span className="text-xs text-gray-500">{t('Variable cost')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={inputs.variableCostPerUnit || ''}
                  onChange={(e) => updateInput('variableCostPerUnit', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{t('Materials, packaging, payment processing per item')}</p>
            </div>

            {/* Average Sale Price */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t('Average Sale Price')}</span>
                <span className="text-xs text-gray-500">{t('What you charge')}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={inputs.averageSalePrice || ''}
                  onChange={(e) => updateInput('averageSalePrice', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{t('Average revenue per transaction')}</p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Main Break-Even Card */}
          <div className={`rounded-xl p-6 ${calculations.isValid ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gray-400'}`}>
            <div className="text-white/80 text-sm mb-2">{t('To break even each month, you need')}</div>
            <div className="text-5xl font-bold text-white mb-2">
              {calculations.isValid ? calculations.breakEvenUnitsMonthly.toLocaleString() : '—'}
            </div>
            <div className="text-white/90 text-lg mb-4">{t('sales per month')}</div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <div className="text-white/70 text-xs">{t('Monthly Revenue Target')}</div>
                <div className="text-white font-semibold text-lg">
                  {formatCurrency(calculations.breakEvenRevenueMonthly)}
                </div>
              </div>
              <div>
                <div className="text-white/70 text-xs">{t('Daily Sales Needed')}</div>
                <div className="text-white font-semibold text-lg">
                  {calculations.isValid ? calculations.breakEvenUnitsDaily : '—'} {t('sales')}
                </div>
              </div>
            </div>
          </div>

          {/* Profit Margin */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">{t('Profit Analysis')}</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('Profit per sale')}</span>
                <span className={`font-semibold ${calculations.contributionMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(calculations.contributionMargin)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('Profit margin')}</span>
                <span className={`font-semibold ${parseFloat(calculations.profitMarginPercent) > 30 ? 'text-green-600' : parseFloat(calculations.profitMarginPercent) > 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {calculations.profitMarginPercent}%
                </span>
              </div>

              {/* Margin bar */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${parseFloat(calculations.profitMarginPercent) > 30 ? 'bg-green-500' : parseFloat(calculations.profitMarginPercent) > 15 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, Math.max(0, parseFloat(calculations.profitMarginPercent)))}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {parseFloat(calculations.profitMarginPercent) > 30 
                  ? '✅ Great margin! You have room to grow.' 
                  : parseFloat(calculations.profitMarginPercent) > 15 
                    ? '⚠️ Decent margin, but watch your costs.'
                    : '❌ Low margin - consider raising prices or cutting costs.'}
              </p>
            </div>
          </div>

          {/* Startup Recovery */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Startup Cost Recovery</h3>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {calculations.monthsToRecoverAtTarget < Infinity ? calculations.monthsToRecoverAtTarget : '∞'}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">months to recover</div>
                <div className="text-sm text-gray-500">
                  selling {calculations.targetUnitsMonthly.toLocaleString()} units/month (20% above break-even)
                </div>
              </div>
            </div>

            {calculations.monthsToRecoverAtTarget < Infinity && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  💰 At this pace, you&apos;ll profit <strong>{formatCurrency(calculations.monthlyProfit)}/month</strong> after covering costs.
                </p>
              </div>
            )}
          </div>

          {/* Warning if not viable */}
          {!calculations.isValid && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-medium text-red-900 mb-2">⚠️ Pricing Issue</h3>
              <p className="text-sm text-red-700">
                Your cost per unit ({formatCurrency(inputs.variableCostPerUnit)}) is higher than your sale price ({formatCurrency(inputs.averageSalePrice)}). 
                You&apos;ll lose money on every sale. Consider raising your prices or reducing your costs.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for First-Time Founders</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <strong>Aim for 50% margin</strong> — Service businesses should target 50%+ profit margins. Product businesses typically see 30-50%.
          </div>
          <div>
            <strong>Factor in your time</strong> — If you&apos;re paying yourself, include that in your monthly fixed costs.
          </div>
          <div>
            <strong>Start lean</strong> — The lower your fixed costs, the fewer sales you need to survive.
          </div>
        </div>
      </div>
    </div>
  )
}
