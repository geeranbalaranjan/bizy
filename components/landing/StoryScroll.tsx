'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  const stories = [
    "Starting a business in Canada is confusing.",
    "Regulations, taxes, licenses, funding, compliance.",
    "Most founders don't know where to start.",
    "Bizy changes that."
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      
      // Calculate how far through the container we've scrolled
      // We want to trigger changes as the user scrolls through this specific section
      const scrollProgress = -rect.top / (rect.height - window.innerHeight)
      
      if (scrollProgress < 0) {
        setActiveSection(0)
      } else if (scrollProgress > 1) {
        setActiveSection(stories.length - 1)
      } else {
        // Map scroll progress to section indices
        const index = Math.floor(scrollProgress * stories.length)
        setActiveSection(Math.min(index, stories.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stories.length])

  return (
    <section 
      ref={containerRef} 
      className="bg-black relative"
      // Height is huge so we can scroll through it, creating the sticky effect
      style={{ height: `${stories.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center max-w-5xl mx-auto px-6">
        <div className="space-y-12 md:space-y-20 py-20">
          {stories.map((text, index) => (
            <h2 
              key={index}
              className={cn(
                "text-4xl md:text-5xl lg:text-7xl font-body font-medium transition-all duration-700 leading-tight",
                activeSection === index 
                  ? "text-white opacity-100 translate-y-0" 
                  : activeSection > index
                    ? "text-white/20 opacity-40 -translate-y-4" // Already passed
                    : "text-white/20 opacity-40 translate-y-4"  // Upcoming
              )}
            >
              {text}
            </h2>
          ))}
        </div>
      </div>
    </section>
  )
}
