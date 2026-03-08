'use client'

import { Cpu, Sparkles, BarChart2, Shield, ArrowRight } from 'lucide-react'

export function AIFeatures() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Powered by Gemini 2.5 Flash
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              An AI trained on <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-accent">
                Canadian Business Reality
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Bizy isn&apos;t a wrapper around generic chat. It&apos;s an intelligent engine connected to StatsCan, CRA data, and provincial licensing registries.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Cpu />, title: "Context-Aware Advice", desc: "Understands your specific province, industry, and budget constraints." },
                { icon: <BarChart2 />, title: "Real-Time Market Data", desc: "Sources survival rates and revenue benchmarks for your exact postal code area." },
                { icon: <Shield />, title: "Automated Compliance", desc: "Generates the exact CRA forms and tax deadlines you need to follow." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-brand-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Visualization */}
          <div className="flex-[0.8] w-full max-w-md relative">
            <div className="absolute inset-0 bg-brand-accent/20 blur-[100px] rounded-full" />
            <div className="bg-brand-primary border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-brand-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">Bizy AI</div>
                  <div className="text-xs text-green-400">Online</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 w-[85%] border border-white/5">
                  I noticed you want to open a cafe in Toronto. Did you know 65% of cafes there fail in year one? Let&apos;s check the competition density first.
                </div>
                <div className="bg-brand-accent rounded-2xl rounded-tr-sm p-4 text-sm text-white w-[85%] ml-auto shadow-md">
                  Yes, show me the map and let&apos;s calculate the startup costs.
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 w-[85%] border border-white/5">
                  Loading viability scan... Your calculated risk score is <strong>Moderate (42)</strong>. I&apos;ve found 3 grants you can apply for to offset the initial rent.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="bg-white/5 rounded-full px-4 py-3 text-sm text-gray-500 border border-white/10 flex justify-between items-center">
                  <span>Ask anything...</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
