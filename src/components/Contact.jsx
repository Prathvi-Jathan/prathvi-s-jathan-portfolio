import { useState, useRef, useEffect } from 'react'
import ScrambleText from './ScrambleText'
import {
  personalInfo,
  socialLinks,
  contactContent,
  emailjsConfig,
} from '../data/portfolioData'

export default function Contact() {
  const formRef = useRef(null)
  const timerRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const firstName = (personalInfo.name || 'user').trim().split(' ')[0].toLowerCase()

  const isConfigured =
    Boolean(emailjsConfig.serviceId) &&
    Boolean(emailjsConfig.templateId) &&
    Boolean(emailjsConfig.publicKey) &&
    emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
    emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
    emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSending) return

    const formData = new FormData(formRef.current)
    const name = formData.get('user_name') || ''
    const email = formData.get('user_email') || ''
    const message = formData.get('message') || ''

    if (!isConfigured) {
      // Fallback: Open mailto link when EmailJS environment variables are not yet configured
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      )
      window.open(
        `mailto:${personalInfo.email}?subject=${subject}&body=${body}`,
        '_blank',
      )

      setStatus('success')
      if (formRef.current) formRef.current.reset()
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setStatus(null), 4000)
      return
    }

    setIsSending(true)
    setStatus(null)

    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey,
      )
      setStatus('success')
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      console.error('EmailJS submission error:', err)
      setStatus('error')
    } finally {
      setIsSending(false)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setStatus(null), 4000)
    }
  }

  // Active social links
  const socials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((s) => Boolean(s.url && s.url.trim()))

  return (
    <section
      id="contact"
      className="hud-grid px-5 md:px-10 py-28 md:py-40 bg-ink relative"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        {/* Left Column: Direct Info, Scramble Label, Heading, Notes, Socials */}
        <div className="flex flex-col items-start">
          <ScrambleText
            text={contactContent.label}
            trigger="view"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block mb-3"
          />

          <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-bone mb-6">
            {contactContent.heading}
          </h2>

          <p className="text-lg text-bone/70 max-w-md leading-relaxed mb-8">
            {contactContent.note}
          </p>

          {/* Interactive Mailto Link */}
          <div className="mb-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-lg md:text-2xl text-bone underline decoration-signal decoration-2 underline-offset-8 hover:text-signal transition-colors inline-block"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* Optional Phone */}
          {personalInfo.phone && (
            <div className="mb-8">
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="font-mono text-sm text-dim hover:text-bone transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>
          )}

          {/* Social Links */}
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70 hover:text-signal transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{social.label}</span>
                  <span aria-hidden="true">&nearr;</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Terminal HUD Form */}
        <div className="hud-frame border border-bone/10 bg-ink/70 backdrop-blur p-6 md:p-10 relative">
          {/* Terminal Command Header */}
          <div className="font-mono text-xs text-dim mb-8 flex items-center gap-2 select-none">
            <span className="text-signal font-bold">$</span>
            <span>new message --to {firstName}</span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Field: Name */}
            <div>
              <label
                htmlFor="user_name"
                className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-2"
              >
                &gt; name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="Your full name"
                className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal text-bone placeholder:text-bone/30 font-mono text-sm py-2 px-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Field: Email */}
            <div>
              <label
                htmlFor="user_email"
                className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-2"
              >
                &gt; email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal text-bone placeholder:text-bone/30 font-mono text-sm py-2 px-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Field: Message */}
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-2"
              >
                &gt; message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about the role or project…"
                className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal text-bone placeholder:text-bone/30 font-mono text-sm py-2 px-0 focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-signal text-ink font-mono text-xs font-semibold uppercase tracking-[0.25em] px-6 py-4 flex items-center justify-between hover:bg-bone transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <span>{isSending ? 'Sending…' : 'Send message'}</span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </button>

            {/* Dynamic Status Notification */}
            <p
              role="status"
              className="font-mono text-xs min-h-[20px] transition-opacity mt-3"
            >
              {status === 'success' && (
                <span className="text-emerald-400">
                  &check; Message sent. Talk soon.
                </span>
              )}
              {status === 'error' && (
                <span className="text-red-400">
                  &#x2715; Something went wrong. Please try again.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
