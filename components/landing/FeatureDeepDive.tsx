'use client'

import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export function FeatureDeepDive() {
  const features = [
    {
      title: "AI Viability Analysis",
      subtitle: "Know your chances before you spend a dime.",
      description: "We analyze massive datasets across Canada to predict market demand, competition density, and your probability of survival.",
      bullets: [
        "Real-time market density scanning",
        "Survival probability forecasting",
        "Cost vs revenue benchmarking"
      ],
      image: "viability", // placeholder for UI mock
      reversed: false
    },
    {
      title: "Launch Roadmap",
      subtitle: "Your step-by-step master plan.",
      description: "Gemini AI analyzes your business type and province to generate a highly specific, sequenced roadmap from idea to opening day.",
      bullets: [
        "Sequenced tasks with time estimates",
        "Prioritization logic",
        "Progress tracking"
      ],
      image: "roadmap", // placeholder for UI mock
      reversed: true
    }
  ]

  return (
    <section className="py-24 bg-brand-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${feature.reversed ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-sm font-semibold mb-2">
                  Feature Spotlight
                </div>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                  {feature.title}
                </h2>
                <h3 className="text-2xl text-white/80 font-medium">
                  {feature.subtitle}
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed pb-4">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0 mr-3" />
                      <span className="text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side - UI Mockup Mock */}
              <div className="flex-1 w-full">
                <div className="aspect-square md:aspect-[4/3] rounded-2xl bg-gradient-to-tr from-brand-primary to-black border border-white/10 p-2 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand-accent)_0%,_transparent_60%)] opacity-10 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Mock browser window */}
                  <div className="w-full h-full bg-brand-primary rounded-xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center font-mono text-white/20 text-2xl">
                       {/* This would be an actual next/image of the UI in production */}
                       [UI Preview: {feature.image}]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
