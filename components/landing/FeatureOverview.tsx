'use client'

import { Compass, Lightbulb, ShieldCheck, Store, ArrowRight } from 'lucide-react'

export function FeatureOverview() {
  const features = [
    {
      title: "Viability Scan",
      description: "Analyze market demand, competition, and survival probability before launching.",
      icon: <Lightbulb className="w-8 h-8 text-brand-accent" />,
      color: "bg-brand-accent/10 border-brand-accent/20"
    },
    {
      title: "Launch Roadmap",
      description: "Your AI co-founder generates a custom, step-by-step roadmap to launch your business.",
      icon: <Compass className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Compliance Hub",
      description: "Automatically discover required licenses, taxes, and CRA forms for your province.",
      icon: <ShieldCheck className="w-8 h-8 text-success" />,
      color: "bg-success/10 border-success/20"
    },
    {
      title: "Storefront Builder",
      description: "Launch your business online instantly with AI-generated landing pages and booking flows.",
      icon: <Store className="w-8 h-8 text-brand-highlight" />,
      color: "bg-brand-highlight/10 border-brand-highlight/20"
    }
  ]

  return (
    <section id="product-demo" className="py-24 bg-brand-primary relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">launch smarter.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stop guessing. Let our AI platform guide you through the complexities of starting a business in Canada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                Explore Feature <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
