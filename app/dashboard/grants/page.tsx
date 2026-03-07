'use client'

import { useState, useMemo } from 'react'
import { Sparkles, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { GrantCard } from '@/components/grants/GrantCard'
import { GrantFilter, type GrantFilters } from '@/components/grants/GrantFilter'
import { GRANTS } from '@/lib/data/grants'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'
import { Button } from '@/components/ui/button'
import type { Grant, BusinessProfile, GrantTag, CanadianProvince } from '@/types'

// Grant matching logic
function getMatchScore(grant: Grant, profile: BusinessProfile | null): number {
  if (!profile) return 0
  
  let score = 0
  const { founderDemographics, businessCharacteristics } = profile
  
  // Province match (high priority)
  if (grant.eligibility.provinces.includes('all') || 
      (profile.province && grant.eligibility.provinces.includes(profile.province))) {
    score += 20
  }
  
  // Industry match
  if (grant.eligibility.industries.includes('all') || 
      (profile.businessType && grant.eligibility.industries.includes(profile.businessType))) {
    score += 15
  }
  
  // Demographics and characteristics matching
  const eligibility = grant.eligibility
  
  // Woman-owned
  if (eligibility.requiresWomanOwned === true) {
    if (businessCharacteristics?.womanOwned === true) {
      score += 25
    } else {
      score -= 50 // Disqualifying if required but not met
    }
  }
  
  // Indigenous-owned
  if (eligibility.requiresIndigenousOwned === true) {
    if (businessCharacteristics?.indigenousOwned === true || 
        (founderDemographics?.indigenousIdentity && 
         founderDemographics.indigenousIdentity !== 'none' && 
         founderDemographics.indigenousIdentity !== 'prefer_not_to_say')) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Minority-owned
  if (eligibility.requiresMinorityOwned === true) {
    if (businessCharacteristics?.minorityOwned === true) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Rural location
  if (eligibility.requiresRuralLocation === true) {
    if (businessCharacteristics?.ruralLocation === true) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Tech startup
  if (eligibility.requiresTechStartup === true) {
    if (businessCharacteristics?.techStartup === true) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Sustainability focus
  if (eligibility.requiresSustainabilityFocus === true) {
    if (businessCharacteristics?.sustainabilityFocus === true) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Veteran status
  if (eligibility.requiresVeteran === true) {
    if (founderDemographics?.veteranStatus === 'yes') {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Newcomer/Immigrant
  if (eligibility.requiresNewcomer === true) {
    if (founderDemographics?.immigrantStatus === 'newcomer_under_5_years' ||
        founderDemographics?.immigrantStatus === 'immigrant') {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Youth
  if (eligibility.requiresYouth === true) {
    if (founderDemographics?.youthEntrepreneur === true) {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Disability
  if (eligibility.requiresDisability === true) {
    if (founderDemographics?.disabilityStatus === 'yes') {
      score += 25
    } else {
      score -= 50
    }
  }
  
  // Bonus for general grants (no specific requirements)
  const hasSpecificRequirements = 
    eligibility.requiresWomanOwned ||
    eligibility.requiresIndigenousOwned ||
    eligibility.requiresMinorityOwned ||
    eligibility.requiresRuralLocation ||
    eligibility.requiresTechStartup ||
    eligibility.requiresSustainabilityFocus ||
    eligibility.requiresVeteran ||
    eligibility.requiresNewcomer ||
    eligibility.requiresYouth ||
    eligibility.requiresDisability
    
  if (!hasSpecificRequirements) {
    score += 10 // General grants are broadly applicable
  }
  
  return score
}

function getRecommendedGrants(grants: Grant[], profile: BusinessProfile | null): Grant[] {
  if (!profile) return []
  
  return grants
    .map(grant => ({ grant, score: getMatchScore(grant, profile) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ grant }) => grant)
}

export default function GrantsPage() {
  const { businessProfile } = useBusinessProfile()
  const { t } = useTranslation()
  
  const [filters, setFilters] = useState<GrantFilters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [showAllGrants, setShowAllGrants] = useState(false)
  
  // Get recommended grants
  const recommendedGrants = useMemo(() => {
    return getRecommendedGrants(GRANTS, businessProfile)
  }, [businessProfile])
  
  // Filter all grants
  const filteredGrants = useMemo(() => {
    let result = GRANTS
    
    if (filters.type) {
      result = result.filter(g => g.type === filters.type)
    }
    
    if (filters.province) {
      result = result.filter(g => 
        g.eligibility.provinces.includes('all') || 
        g.eligibility.provinces.includes(filters.province as CanadianProvince)
      )
    }
    
    if (filters.tag) {
      result = result.filter(g => g.tags?.includes(filters.tag as GrantTag))
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(g => 
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.provider.toLowerCase().includes(query)
      )
    }
    
    return result
  }, [filters])
  
  // Determine which grants to show
  const displayedGrants = showAllGrants ? filteredGrants : filteredGrants.slice(0, 9)
  const hasMoreGrants = filteredGrants.length > 9
  
  // Check if user has profile data for recommendations
  const hasProfileForRecommendations = businessProfile && (
    businessProfile.province ||
    businessProfile.founderDemographics ||
    businessProfile.businessCharacteristics
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-brand-primary mb-2">
          {t('Grants & Funding')}
        </h1>
        <p className="text-gray-500">
          {t('Discover grants, loans, and funding opportunities for your Canadian business')}
        </p>
      </div>
      
      {/* Recommended section */}
      {hasProfileForRecommendations && recommendedGrants.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-brand-accent" />
            <h2 className="text-xl font-heading font-semibold text-brand-primary">
              {t('Recommended for You')}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {t('Based on your business profile and self-identification')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} isRecommended />
            ))}
          </div>
        </section>
      )}
      
      {/* No profile notice */}
      {!hasProfileForRecommendations && (
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">
                {t('Get personalized recommendations')}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {t('Complete your profile with the optional self-identification questions to see grants tailored to your business.')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* All Grants section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-heading font-semibold text-brand-primary">
              {t('All Grants')}
            </h2>
            <span className="text-sm text-gray-500">({filteredGrants.length})</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-1"
          >
            <Filter className="h-4 w-4" />
            {t('Filters')}
            {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mb-4">
            <GrantFilter currentFilters={filters} onFilter={setFilters} />
          </div>
        )}
        
        {/* Grant cards grid */}
        {displayedGrants.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedGrants.map((grant) => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
            
            {/* Show more button */}
            {hasMoreGrants && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAllGrants(!showAllGrants)}
                >
                  {showAllGrants 
                    ? t('Show less') 
                    : t(`Show all ${filteredGrants.length} grants`)
                  }
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium">{t('No grants found')}</p>
            <p className="text-sm mt-1">{t('Try adjusting your filters')}</p>
          </div>
        )}
      </section>
    </div>
  )
}
