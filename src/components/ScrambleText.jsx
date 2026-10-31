import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/'

export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  speed = 30,
  trigger = 'view',
}) {
  const [display, setDisplay] = useState(text)
  const containerRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    let intervalId = null
    let timeoutId = null
    let observer = null

    const playDecode = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      timeoutId = setTimeout(() => {
        let frame = 0
        intervalId = setInterval(() => {
          frame += 1
          const lockedCount = Math.floor(frame / 2)

          if (lockedCount >= text.length) {
            setDisplay(text)
            clearInterval(intervalId)
            return
          }

          let output = ''
          for (let i = 0; i < text.length; i += 1) {
            if (text[i] === ' ') {
              output += ' '
            } else if (i < lockedCount) {
              output += text[i]
            } else {
              output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }
          }
          setDisplay(output)
        }, speed)
      }, delay)
    }

    if (trigger === 'mount') {
      playDecode()
    } else {
      const el = containerRef.current
      if (el) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              playDecode()
              observer.disconnect()
            }
          },
          { threshold: 0.4 },
        )
        observer.observe(el)
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      if (observer) observer.disconnect()
    }
  }, [text, delay, speed, trigger])

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
