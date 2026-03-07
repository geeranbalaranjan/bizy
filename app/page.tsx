'use client'

import { LandingNav } from '@/components/layout/LandingNav'

import { HeroSection } from '@/components/landing/HeroSection'
import { SocialProof } from '@/components/landing/SocialProof'
import { StoryScroll } from '@/components/landing/StoryScroll'
import { FeatureOverview } from '@/components/landing/FeatureOverview'
import { FeatureDeepDive } from '@/components/landing/FeatureDeepDive'
import { TimelineWalkthrough } from '@/components/landing/TimelineWalkthrough'
import { AIFeatures } from '@/components/landing/AIFeatures'
import { ComparisonTable } from '@/components/landing/ComparisonTable'
import { CTASection } from '@/components/landing/CTASection'
import { ModernFooter } from '@/components/landing/ModernFooter'

export default function LandingPage() {
  // temporarily mock isLoggedIn to true for the preview
  const isLoggedIn = false
  
  return (
    <div className="min-h-screen bg-brand-primary text-white font-body selection:bg-brand-accent/30 selection:text-white">
      {/* Absolute positioned Top Nav (Overlaying Hero) */}
      <div className="absolute top-0 inset-x-0 z-50">
         <LandingNav isLoggedIn={isLoggedIn} />
      </div>

      <main>
        <HeroSection isLoggedIn={isLoggedIn} />
        <SocialProof />
        <StoryScroll />
        <FeatureOverview />
        <FeatureDeepDive />
        <AIFeatures />
        <ComparisonTable />
        <TimelineWalkthrough />
        <CTASection isLoggedIn={isLoggedIn} />
      </main>

      <ModernFooter />
    </div>
  )
}
