'use client'

import { useState } from 'react'
import { FileText, Search, Compass, Store } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/context/TranslationContext'

export function TimelineWalkthrough() {
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation()

  const steps = [
    {
      titleKey: 'timeline.step1.title',
      descriptionKey: 'timeline.step1.description',
      icon: <FileText className="w-6 h-6" />
    },
    {
      titleKey: 'timeline.step2.title',
      descriptionKey: 'timeline.step2.description',
      icon: <Search className="w-6 h-6" />
    },
    {
      titleKey: 'timeline.step3.title',
      descriptionKey: 'timeline.step3.description',
      icon: <Compass className="w-6 h-6" />
    },
    {
      titleKey: 'timeline.step4.title',
      descriptionKey: 'timeline.step4.description',
      icon: <Store className="w-6 h-6" />
    }
  ]

  return (
    <section className="py-24 bg-brand-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            {t('timeline.headline')}
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
                      {t(step.titleKey)}
                    </h4>
                    <p className={cn(
                      "text-sm mt-1 transition-colors",
                      activeStep === idx ? "text-gray-300" : "text-gray-600 group-hover:text-gray-400"
                    )}>
                      {t(step.descriptionKey)}
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
                   <div className="text-sm uppercase tracking-widest text-brand-accent mb-2">{t('timeline.stepLabel')} {activeStep + 1}</div>
                   [{t('timeline.previewLabel')} {t(steps[activeStep].titleKey)}]
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
