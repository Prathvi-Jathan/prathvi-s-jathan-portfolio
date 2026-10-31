import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ScrambleText from './ScrambleText'
import { personalInfo, heroContent } from '../data/portfolioData'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const rootRef = useRef(null)
  const dividerRef = useRef(null)

  // Split name: first word is solid bone text, remaining words are outlined
  const nameParts = (personalInfo.name || '').trim().split(' ')
  const firstWord = nameParts[0] || 'Prathvi'
  const restWords = nameParts.slice(1).join(' ') || 'S Jathan'

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const fades = rootRef.current?.querySelectorAll('[data-hero="fade"]')
      if (fades && fades.length > 0) {
        gsap.fromTo(
          fades,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.3,
          },
        )
      }

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.4,
          },
        )
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="hud-grid min-h-screen flex flex-col justify-between overflow-hidden px-5 md:px-10 pt-24 pb-10"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 my-auto">
        {/* Left Column: Eyebrow, Dual-style Name, Role, Intro & CTAs */}
        <div className="flex flex-col items-start z-10">
          <div
            data-hero="fade"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-3"
          >
            {heroContent.eyebrow}
          </div>

          <h1
            data-hero="fade"
            className="text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] my-2 select-none"
          >
            <span className="block text-bone">
              <ScrambleText text={firstWord} trigger="mount" delay={200} speed={25} />
            </span>
            <span className="block text-transparent [-webkit-text-stroke:1.5px_#e8e6df]">
              <ScrambleText text={restWords} trigger="mount" delay={500} speed={25} />
            </span>
          </h1>

          {/* Animated Divider */}
          <div
            ref={dividerRef}
            className="h-px w-full max-w-xl bg-bone/25 origin-left my-6"
            aria-hidden="true"
          />

          {/* Role & Intro */}
          <div data-hero="fade" className="space-y-3 max-w-xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
              {personalInfo.role}
            </div>
            <p className="text-lg md:text-xl text-bone/85 leading-relaxed">
              {heroContent.intro}
            </p>
          </div>

          {/* Square-cornered HUD Buttons */}
          <div data-hero="fade" className="flex flex-wrap gap-4 mt-8">
            <a
              href={heroContent.ctaPrimary.href}
              className="group bg-signal text-ink hover:bg-bone font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 transition-colors inline-flex items-center gap-2"
            >
              <span>{heroContent.ctaPrimary.label}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="border border-bone/30 text-bone hover:border-signal hover:text-signal font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 transition-colors inline-flex items-center"
            >
              <span>{heroContent.ctaSecondary.label}</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Signal Core in HUD Frame */}
        <div data-hero="fade" className="w-full flex justify-center items-center">
          <div className="hud-frame relative w-full h-[48vh] min-h-[320px] lg:h-[70vh] border border-bone/10 bg-panel/40 flex items-center justify-center overflow-hidden">
            <div
              className="absolute top-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim pointer-events-none z-10"
              aria-hidden="true"
            >
              core.view &mdash; drag to rotate
            </div>
            <div
              className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim pointer-events-none z-10"
              aria-hidden="true"
            >
              {personalInfo.city}
            </div>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div
        data-hero="fade"
        className="w-full max-w-[1440px] mx-auto mt-10 border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim flex items-center justify-between"
      >
        <div className="flex items-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal mr-2.5" />
          <span>{personalInfo.availability}</span>
        </div>
        <div className="hidden sm:inline-block tracking-[0.25em]">
          Scroll &darr;
        </div>
      </div>
    </section>
  )
}
