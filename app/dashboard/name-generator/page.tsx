'use client'

import { useState } from 'react'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'
import { BusinessType, CanadianProvince } from '@/types'

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'food', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Professional Services' },
  { value: 'tech', label: 'Technology' },
  { value: 'construction', label: 'Construction' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

const VIBES = [
  { value: 'professional', label: 'Professional & Trustworthy', emoji: '💼' },
  { value: 'creative', label: 'Creative & Unique', emoji: '🎨' },
  { value: 'friendly', label: 'Friendly & Approachable', emoji: '😊' },
  { value: 'modern', label: 'Modern & Tech-Forward', emoji: '🚀' },
  { value: 'luxurious', label: 'Premium & Luxurious', emoji: '✨' },
  { value: 'local', label: 'Local & Community-Focused', emoji: '🏠' },
]

const PROVINCES: { value: CanadianProvince; label: string }[] = [
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'QC', label: 'Quebec' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'YT', label: 'Yukon' },
  { value: 'NU', label: 'Nunavut' },
]

interface GeneratedName {
  name: string
  tagline: string
  domainSuggestion: string
  reasoning: string
}

export default function BusinessNameGeneratorPage() {
  const { businessProfile } = useBusinessProfile()
  const { t } = useTranslation()
  
  const [industry, setIndustry] = useState<BusinessType>(businessProfile?.businessType || 'services')
  const [vibe, setVibe] = useState('professional')
  const [province, setProvince] = useState<CanadianProvince>(businessProfile?.province || 'ON')
  const [keywords, setKeywords] = useState('')
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([])
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError('')
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 8 creative and available-sounding business names for a Canadian business with these characteristics:

Industry: ${BUSINESS_TYPES.find(b => b.value === industry)?.label || industry}
Vibe/Style: ${VIBES.find(v => v.value === vibe)?.label || vibe}
Province: ${PROVINCES.find(p => p.value === province)?.label || province}, Canada
${keywords ? `Keywords/Concepts: ${keywords}` : ''}

Requirements:
- Names should be memorable, easy to spell, and professional
- Avoid names that are too generic or already famous brands
- Include a mix: some using local/provincial references, some universal
- Consider domain availability (suggest .ca or .com variants)
- Each name should feel distinct from the others

Return ONLY a valid JSON array with exactly 8 objects, each with these fields:
- "name": the business name (no Inc./Ltd.)
- "tagline": a short 5-7 word tagline
- "domainSuggestion": likely available domain (e.g., namehere.ca)
- "reasoning": 1 sentence explaining why this name works

Return ONLY the JSON array, no other text.`,
          systemPrompt: 'You are a branding expert specializing in Canadian small businesses. Return only valid JSON arrays.'
        })
      })

      if (!response.ok) throw new Error('Failed to generate names')

      const data = await response.json()
      
      // Try to parse the response - handle both direct JSON and text
      let names: GeneratedName[] = []
      
      if (typeof data.response === 'string') {
        // Extract JSON from the response
        const jsonMatch = data.response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          names = JSON.parse(jsonMatch[0])
        }
      } else if (Array.isArray(data.response)) {
        names = data.response
      } else if (data.response?.names) {
        names = data.response.names
      }

      if (names.length === 0) {
        throw new Error('No names generated')
      }

      setGeneratedNames(names)
    } catch (err) {
      console.error('Generation error:', err)
      setError(t('Failed to generate names. Please try again.'))
      
      // Fallback mock data for demo
      setGeneratedNames([
        {
          name: 'Northbound Consulting',
          tagline: 'Guiding Your Business Forward',
          domainSuggestion: 'northboundconsulting.ca',
          reasoning: 'Canadian directional reference that implies growth and progress.'
        },
        {
          name: 'Maple & Main',
          tagline: 'Where Quality Meets Community',
          domainSuggestion: 'mapleandmain.ca',
          reasoning: 'Combines Canadian identity with small-town main street appeal.'
        },
        {
          name: 'ClearPath Solutions',
          tagline: 'Simplifying Your Success',
          domainSuggestion: 'clearpathsolutions.ca',
          reasoning: 'Professional and trustworthy, implies making complex things simple.'
        },
        {
          name: 'Evergreen & Co',
          tagline: 'Built to Last',
          domainSuggestion: 'evergreenandco.ca',
          reasoning: 'Suggests sustainability and longevity, resonates with Canadian nature.'
        },
        {
          name: 'True North Partners',
          tagline: 'Your Trusted Business Ally',
          domainSuggestion: 'truenorthpartners.ca',
          reasoning: 'Classic Canadian reference that conveys reliability and direction.'
        },
        {
          name: 'Summit Collective',
          tagline: 'Reaching New Heights Together',
          domainSuggestion: 'summitcollective.ca',
          reasoning: 'Ambitious and collaborative, appeals to growth-minded entrepreneurs.'
        },
        {
          name: 'Basecamp Ventures',
          tagline: 'Where Great Ideas Launch',
          domainSuggestion: 'basecampventures.ca',
          reasoning: 'Startup-friendly name suggesting a launchpad for new businesses.'
        },
        {
          name: 'Cornerstone & Cedar',
          tagline: 'Building Strong Foundations',
          domainSuggestion: 'cornerstonecedar.ca',
          reasoning: 'Combines stability (cornerstone) with Canadian nature (cedar).'
        },
      ])
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev)
      if (newFavs.has(name)) {
        newFavs.delete(name)
      } else {
        newFavs.add(name)
      }
      return newFavs
    })
  }

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('Business Name Generator')}</h1>
        <p className="text-gray-600">
          {t('AI-powered name ideas tailored for Canadian businesses')}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h2 className="font-semibold text-gray-900 mb-6">{t('Tell us about your business')}</h2>

            {/* Industry */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Industry')}
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as BusinessType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {BUSINESS_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Vibe */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Brand Vibe')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VIBES.map(v => (
                  <button
                    key={v.value}
                    onClick={() => setVibe(v.value)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      vibe === v.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-1">{v.emoji}</span>
                    {v.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Province */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Province')}
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value as CanadianProvince)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PROVINCES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Keywords */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Keywords (optional)')}
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t('e.g., sustainable, family, innovation')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{t('Add concepts you want reflected in the name')}</p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('Generating...')}
                </>
              ) : (
                <>
                  ✨ {t('Generate Names')}
                </>
              )}
            </button>

            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {generatedNames.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('Ready to find your perfect business name?')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('Fill in the details and click Generate to get AI-powered suggestions tailored for Canadian businesses.')}
              </p>
              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <span className="px-3 py-1 bg-gray-100 rounded-full">{t('Memorable')}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">{t('Domain-ready')}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">{t('Canadian-focused')}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Favorites bar */}
              {favorites.size > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-amber-600">⭐</span>
                    <span className="font-medium text-amber-900">{t('Favorites')}:</span>
                    {Array.from(favorites).map(name => (
                      <span key={name} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {generatedNames.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`bg-white rounded-xl border p-5 transition-all hover:shadow-md ${
                      favorites.has(item.name) ? 'border-amber-400 ring-2 ring-amber-100' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-blue-600">{item.tagline}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(item.name)}
                        className={`p-2 rounded-lg transition-colors ${
                          favorites.has(item.name) 
                            ? 'bg-amber-100 text-amber-600' 
                            : 'bg-gray-100 text-gray-400 hover:text-amber-500'
                        }`}
                      >
                        {favorites.has(item.name) ? '⭐' : '☆'}
                      </button>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">🌐</span>
                        <code className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs">
                          {item.domainSuggestion}
                        </code>
                        <a 
                          href={`https://www.godaddy.com/domainsearch/find?domainToCheck=${item.domainSuggestion}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {t('Check availability')}
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{item.reasoning}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copyName(item.name)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        📋 {t('Copy Name')}
                      </button>
                      <button
                        onClick={() => {
                          const text = `${item.name}\n${item.tagline}\n${item.domainSuggestion}`
                          navigator.clipboard.writeText(text)
                        }}
                        className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {t('Copy All')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Regenerate button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                >
                  🔄 {t('Generate More Names')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 {t('Tips for Choosing Your Business Name')}</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-700">
          <div>
            <strong>{t('Check the registry')}</strong> — {t("Verify your name isn't already registered in your province's business registry.")}
          </div>
          <div>
            <strong>{t('Secure the domain')}</strong> — {t('Lock down the .ca and .com before announcing anything.')}
          </div>
          <div>
            <strong>{t('Say it out loud')}</strong> — {t("Your name will be said thousands of times. Make sure it's easy to pronounce.")}
          </div>
          <div>
            <strong>{t('Check social handles')}</strong> — {t('Ensure @yourname is available on Instagram, LinkedIn, and X.')}
          </div>
        </div>
      </div>
    </div>
  )
}
