import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's shared animation loop
    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Smoothly scroll in-page anchor links (#about, #projects, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#' || href === '#!') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -60 })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Refresh ScrollTrigger calculations after full load and a brief timeout
    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 800)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('load', handleLoad)
      clearTimeout(refreshTimer)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

