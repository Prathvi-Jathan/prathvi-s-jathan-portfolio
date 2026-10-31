import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrambleText from './ScrambleText'
import { experience } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Journey() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (fillRef.current) fillRef.current.style.transform = 'scaleY(1)'
      const items = listRef.current?.querySelectorAll('li')
      items?.forEach((item) => {
        item.classList.add('is-on')
        item.style.opacity = '1'
        item.style.transform = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Scrub timeline fill line based on scroll through the list
      if (fillRef.current && listRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        )
      }

      // 2. Animate each timeline entry: node activation + entrance fade
      const items = listRef.current?.querySelectorAll('li')
      items?.forEach((item) => {
        // Toggle active state on node as scroll line passes
        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%',
          onEnter: () => item.classList.add('is-on'),
          onLeaveBack: () => item.classList.remove('is-on'),
        })

        // Entrance fade from right
        gsap.fromTo(
          item,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="px-5 md:px-10 py-28 md:py-40 bg-ink"
    >
      <div className="grid max-w-[1440px] mx-auto lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* Left Column: Sticky section header */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-3">
          <ScrambleText
            text="03 / Journey"
            trigger="view"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block mb-3"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone">
            Where I&apos;ve been learning and building.
          </h2>
        </div>

        {/* Right Column: Timeline list with progressive fill line */}
        <div className="relative">
          <ol ref={listRef} className="relative pl-10 space-y-16 list-none m-0">
            {/* Background 1px base line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-bone/15"
              aria-hidden="true"
            />

            {/* Signal-orange animated fill line */}
            <div
              ref={fillRef}
              className="absolute left-0 top-0 bottom-0 w-px bg-signal origin-top scale-y-0"
              aria-hidden="true"
            />

            {experience.map((item, index) => (
              <li
                key={`${item.org}-${index}`}
                className="relative space-y-3 [&.is-on_.node]:bg-signal [&.is-on_.node]:scale-100"
              >
                {/* 15px square node centered on the vertical line */}
                <div
                  className="node absolute -left-[47px] top-1.5 w-[15px] h-[15px] border border-signal bg-ink scale-75 transition-all duration-300"
                  aria-hidden="true"
                />

                {/* Period */}
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
                  {item.period}
                </div>

                {/* Role */}
                <h3 className="text-2xl md:text-3xl font-bold text-bone">
                  {item.role}
                </h3>

                {/* Organisation */}
                <div className="font-mono text-sm text-signal font-medium">
                  {item.org}
                </div>

                {/* Description */}
                <p className="text-bone/70 leading-relaxed text-base max-w-xl">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

