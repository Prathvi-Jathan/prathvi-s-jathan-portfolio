import { useState, useEffect } from 'react'
import { personalInfo, navLinks, heroContent } from '../data/portfolioData'

export default function Hud() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [timeString, setTimeString] = useState('')

  // Derive initials for the brand badge
  const initials = (personalInfo.brandName || personalInfo.name || 'PSJ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3)

  // Track scroll position for background blur & border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotate status line every 3.5 seconds
  useEffect(() => {
    if (!heroContent.statusLines || heroContent.statusLines.length === 0) return

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % heroContent.statusLines.length)
    }, 3500)

    return () => clearInterval(statusInterval)
  }, [])

  // Update live clock every second using the configured timezone
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: personalInfo.timezone || 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const updateTime = () => {
      setTimeString(formatter.format(new Date()))
    }

    updateTime()
    const clockInterval = setInterval(updateTime, 1000)

    return () => clearInterval(clockInterval)
  }, [])

  const currentStatus = heroContent.statusLines?.[statusIndex] || ''

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-ink/80 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-5 md:px-10 flex items-center justify-between">
        {/* Left: Brand badge & name */}
        <a
          href="#home"
          aria-label={personalInfo.brandName || personalInfo.name}
          className="flex items-center gap-3 group"
        >
          <span className="w-8 h-8 flex items-center justify-center border border-signal font-mono text-xs font-semibold text-signal transition-transform group-hover:scale-105">
            {initials}
          </span>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-[0.2em] text-bone group-hover:text-signal transition-colors">
            {personalInfo.brandName || personalInfo.name}
          </span>
        </a>

        {/* Centre: Live rotating HUD status (desktop) */}
        {currentStatus && (
          <div className="hidden lg:flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal" />
            </span>
            <span aria-live="polite" className="select-none">
              {currentStatus}
            </span>
          </div>
        )}

        {/* Right: Desktop Navigation & Live Clock */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="h-3 w-px bg-bone/20" aria-hidden="true" />
          <span
            className="font-mono text-xs tabular-nums text-dim tracking-wider"
            title={personalInfo.timezone}
          >
            {timeString}
          </span>
        </div>

        {/* Mobile: Hamburger / Close toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-hud-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden font-mono text-xs uppercase tracking-widest text-bone hover:text-signal py-1.5 px-3 border border-bone/20 transition-colors"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-hud-menu"
          className="md:hidden bg-ink/95 backdrop-blur-xl border-b border-bone/10 px-6 py-6"
        >
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold tracking-tight text-bone hover:text-signal border-b border-bone/10 py-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-4 border-t border-bone/10 flex items-center justify-between font-mono text-xs text-dim">
            <span>{personalInfo.city}</span>
            <span className="tabular-nums" title={personalInfo.timezone}>
              {timeString}
            </span>
          </div>
        </div>
      )}
    </header>
  )
}

