import {
  personalInfo,
  socialLinks,
  navLinks,
  footerContent,
  academy,
} from '../data/portfolioData'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  // Filter available social links
  const socials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((s) => Boolean(s.url && s.url.trim()))

  const brandName = personalInfo.brandName || personalInfo.name || 'PORTFOLIO'

  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 px-5 md:px-10 pt-16 pb-8 bg-ink relative">
      <div className="max-w-[1440px] mx-auto">
        {/* Three Columns Directory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14">
          {/* Col 1: Navigate */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4 font-semibold">
              Navigate
            </div>
            <nav className="flex flex-col space-y-2.5" aria-label="Footer Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-wider text-bone/75 hover:text-signal transition-colors inline-block w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 2: Elsewhere */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4 font-semibold">
              Elsewhere
            </div>
            <div className="flex flex-col space-y-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-bone/75 hover:text-signal transition-colors inline-flex items-center gap-1.5 w-fit"
                >
                  <span>{social.label}</span>
                  <span aria-hidden="true">&nearr;</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Say Hello */}
          <div className="md:text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4 font-semibold">
              Say hello
            </div>
            <div className="flex flex-col space-y-2.5 md:items-end">
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-mono text-xs uppercase tracking-wider text-bone/75 hover:text-signal transition-colors inline-block"
              >
                {personalInfo.email}
              </a>
              <span className="font-mono text-xs text-dim">
                {personalInfo.city}
              </span>
            </div>
          </div>
        </div>

        {/* Massive Faint Watermark */}
        <div
          aria-hidden="true"
          className="w-full text-center uppercase whitespace-nowrap text-[13.5vw] font-bold leading-none tracking-[-0.05em] text-bone/[0.07] select-none my-8 md:my-12 overflow-hidden pointer-events-none"
        >
          {brandName}
        </div>

        {/* Bottom Attribution Bar */}
        <div className="border-t border-bone/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-dim flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            &copy; {CURRENT_YEAR} {personalInfo.name} &middot; {footerContent.tagline}
          </div>
          <div>
            Trained at{' '}
            <a
              href={academy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-bone/70 hover:text-signal transition-colors"
            >
              {academy.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
