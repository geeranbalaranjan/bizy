'use client'

import { useState } from 'react'
import { FileText, Search, Compass, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TimelineWalkthrough() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Describe your business",
      description: "Tell Bizy what you want to build and where.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Bizy analyzes viability",
      description: "AI pulls market data to predict survival.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "Generate launch roadmap",
      description: "Get a step-by-step compliant action plan.",
      icon: <Compass className="w-6 h-6" />
    },
    {
      title: "Launch your storefront",
      description: "Generate a beautiful website and start selling.",
      icon: <Store className="w-6 h-6" />
    }
  ]

  return (
    <section className="py-24 bg-brand-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Four steps to launched.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Timeline Controls */}
          <div className="flex-1 space-y-4 relative w-full">
            {/* Connecting line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-white/10 hidden md:block" />

            {steps.map((step, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                className="group relative"
              >
                <div 
                  className={cn(
                    "flex items-center gap-6 p-4 rounded-2xl cursor-pointer transition-all duration-300",
                    activeStep === idx 
                      ? "bg-white/10 border border-white/20" 
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors shrink-0 z-10",
                    activeStep === idx 
                      ? "bg-brand-accent text-white" 
                      : "bg-brand-secondary text-gray-500 border border-white/10 group-hover:text-white group-hover:border-white/30"
                  )}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-heading text-lg font-bold transition-colors",
                      activeStep === idx ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}>
                      {step.title}
                    </h4>
                    <p className={cn(
                      "text-sm mt-1 transition-colors",
                      activeStep === idx ? "text-gray-300" : "text-gray-600 group-hover:text-gray-400"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Visual - Mock UI Container */}
          <div className="flex-[1.5] w-full">
             <div className="bg-gradient-to-br from-brand-secondary to-black rounded-3xl p-2 border border-white/10 shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center">
                {/* Background glow syncing with active step abstractly */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-accent)_0%,_transparent_70%)] opacity-10 transition-transform duration-700 ease-out" 
                  style={{ transform: `translateY(${(activeStep - 1.5) * 20}%)` }}
                />
                
                <div className="text-gray-500 font-mono text-center relative z-10 transition-all duration-500" key={activeStep}>
                   <div className="text-sm uppercase tracking-widest text-brand-accent mb-2">Step {activeStep + 1}</div>
                   [Animated UI Preview for: {steps[activeStep].title}]
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
