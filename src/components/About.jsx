import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrambleText from './ScrambleText'
import { personalInfo, aboutContent, skillGroups } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Load portrait dynamically from assets
const portraitModules = import.meta.glob('../assets/about/about-portrait.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const portraitSrc = Object.values(portraitModules)[0] || null

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Set stats immediately if reduced motion is requested
      const statEls = sectionRef.current?.querySelectorAll('.stat-number')
      statEls?.forEach((el) => {
        el.textContent = el.getAttribute('data-value') || '0'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Reveal staggered elements when section reaches top 75%
      const reveals = sectionRef.current?.querySelectorAll('[data-about="reveal"]')
      if (reveals && reveals.length > 0) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          },
        )
      }

      // Count up numeric stats
      const statEls = sectionRef.current?.querySelectorAll('.stat-number')
      statEls?.forEach((el) => {
        const targetVal = Number(el.getAttribute('data-value')) || 0
        const counter = { val: 0 }
        gsap.to(counter, {
          val: targetVal,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString()
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-5 md:px-10 py-28 md:py-40 bg-ink"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Label */}
        <div data-about="reveal" className="mb-10">
          <ScrambleText
            text={aboutContent.label}
            trigger="view"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal"
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Portrait */}
          <div data-about="reveal" className="flex justify-center lg:justify-start">
            <div className="hud-frame relative aspect-[4/5] max-w-[420px] w-full border border-bone/10 bg-panel overflow-hidden">
              {portraitSrc ? (
                <>
                  <img
                    src={portraitSrc}
                    alt={`${personalInfo.name} — ${personalInfo.role}`}
                    className="w-full h-full object-cover grayscale contrast-125 select-none"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-signal mix-blend-multiply opacity-25 pointer-events-none"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-dim font-mono text-xs uppercase tracking-widest p-6 text-center">
                  <span className="text-signal text-xl mb-2 font-bold">[ PORTRAIT ]</span>
                  <span>NO IMAGE DETECTED</span>
                </div>
              )}
              <div
                className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim pointer-events-none z-10"
                aria-hidden="true"
              >
                ID &middot; {personalInfo.brandName || personalInfo.name}
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Paragraph, Stats & Skill Modules */}
          <div className="flex flex-col">
            <h2
              data-about="reveal"
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone mb-6"
            >
              {aboutContent.heading}
            </h2>

            <p
              data-about="reveal"
              className="text-lg md:text-xl leading-relaxed text-bone/75 max-w-2xl mb-10"
            >
              {aboutContent.paragraph}
            </p>

            {/* Stats list */}
            <dl
              data-about="reveal"
              className="border-y border-bone/10 py-8 grid grid-cols-3 gap-4 md:gap-8 my-4"
            >
              {aboutContent.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dd className="text-4xl md:text-6xl font-bold text-bone flex items-baseline">
                    <span className="stat-number tabular-nums" data-value={stat.value}>
                      0
                    </span>
                    {stat.suffix && (
                      <span className="text-signal font-normal">{stat.suffix}</span>
                    )}
                  </dd>
                  <dt className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-dim mt-2">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            {/* Skill Modules */}
            <div
              data-about="reveal"
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone/10 border border-bone/10 mt-10"
            >
              {skillGroups.map((group, idx) => (
                <div
                  key={group.title}
                  className="bg-ink p-6 hover:bg-panel transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
                      {group.title}
                    </span>
                    <span className="font-mono text-[11px] text-dim">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="border border-bone/15 px-2.5 py-1 font-mono text-xs text-bone/85 hover:border-signal hover:text-signal transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

