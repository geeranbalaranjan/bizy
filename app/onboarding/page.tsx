'use client'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-heading font-bold text-brand-primary mb-4">
          Multi-step onboarding form
        </h1>
        <p className="text-gray-500 mb-8">
          Complete your profile to get personalized recommendations for your
          business launch.
        </p>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-gray-400 text-center py-12">
            Onboarding steps will appear here.
          </p>
        </div>
      </div>
    </div>
  )
}
