import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileCheck, Map, Store, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-primary)] text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-secondary)] via-[var(--brand-primary)] to-[var(--brand-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--brand-accent)_0%,_transparent_50%)] opacity-20" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <span className="text-2xl font-heading font-bold tracking-tight">
            Bizy
          </span>
          <Link
            href="/api/auth/login"
            className="px-5 py-2.5 rounded-lg bg-[var(--brand-accent)] hover:opacity-90 transition-opacity font-medium"
          >
            Get Started
          </Link>
        </nav>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6">
            Your first Canadian
            <br />
            <span className="text-[var(--brand-highlight)]">co-founder</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Launch your business in Canada with confidence. We guide you through
            viability, compliance, and launch—every step of the way.
          </p>
          <Link
            href="/api/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--brand-accent)] hover:opacity-90 transition-opacity font-semibold text-lg"
          >
            Start your journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* 4-Step Flow */}
      <section className="relative py-24 bg-[var(--brand-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            From idea to launch in four steps
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
            A clear path designed for Canadian entrepreneurs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: Zap,
                title: 'Viability Scan',
                desc: 'Validate your business idea with AI-powered market analysis.',
              },
              {
                step: '02',
                icon: Map,
                title: 'Launch Roadmap',
                desc: 'Get a personalized checklist to launch in Canada.',
              },
              {
                step: '03',
                icon: FileCheck,
                title: 'Compliance Hub',
                desc: 'CRA, licenses, HR—navigate regulations with ease.',
              },
              {
                step: '04',
                icon: Store,
                title: 'Storefront Builder',
                desc: 'Create your online presence and start selling.',
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative p-6 rounded-2xl bg-[var(--brand-primary)]/60 border border-white/10 hover:border-[var(--brand-accent)]/50 transition-colors"
              >
                <span className="text-sm font-mono text-[var(--brand-highlight)]">
                  {step}
                </span>
                <div className="mt-4 p-3 w-fit rounded-xl bg-[var(--brand-accent)]/20">
                  <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-heading font-semibold mt-4 mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-accent)]/20 text-[var(--brand-accent)] text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Free to get started
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to build something great?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join entrepreneurs who are launching with Bizy.
          </p>
          <Link
            href="/api/auth/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-[var(--brand-accent)] hover:opacity-90 transition-opacity font-semibold text-lg"
          >
            Create your account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-gray-500 text-sm">© Bizy. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
