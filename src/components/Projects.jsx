import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrambleText from './ScrambleText'
import { projects } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Load all project images dynamically from assets
const projectImages = import.meta.glob('../assets/projects/*.(png|jpg|jpeg|webp|svg)', {
  eager: true,
  import: 'default',
})

const getProjectCover = (id) => {
  const match = Object.keys(projectImages).find((path) => path.includes(`/${id}.`))
  return match ? projectImages[match] : null
}

function ProjectCard({ project }) {
  const coverSrc = getProjectCover(project.id)

  return (
    <article
      data-cursor="hot"
      className="group border border-bone/10 bg-panel/60 w-full md:w-[min(560px,42vw)] shrink-0 flex flex-col justify-between transition-colors hover:border-bone/25"
    >
      <div>
        {/* Cover Image Area */}
        <div className="aspect-[16/10] md:aspect-[16/8] border-b border-bone/10 bg-ink overflow-hidden relative">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-104 transition-all duration-700 ease-out select-none"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full hud-grid flex items-center justify-center p-6 select-none">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
                [ {project.id} ]
              </span>
            </div>
          )}

          {/* Number & Year Badge */}
          <div className="absolute top-3 left-3 bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-signal border border-bone/10 z-10">
            {project.number} / {project.year}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-bone group-hover:text-signal transition-colors mb-3">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-bone/70 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 md:p-8 pt-0 flex flex-wrap gap-3 mt-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-signal text-ink hover:bg-bone transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 inline-flex items-center gap-1.5"
          >
            <span>Live</span>
            <span aria-hidden="true">&nearr;</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-bone/30 text-bone hover:border-signal hover:text-signal transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 inline-flex items-center gap-1.5"
          >
            <span>Code</span>
            <span aria-hidden="true">&nearr;</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const section = sectionRef.current
      const progress = progressRef.current
      if (!track || !section) return

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 80

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.set(progress, { scaleX: self.progress })
            }
          },
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full overflow-hidden py-24 md:h-screen md:flex md:flex-col md:justify-center md:pt-20 md:pb-6 bg-ink relative"
    >
      {/* Header Row */}
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <ScrambleText
            text="02 / Selected work"
            trigger="view"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block mb-2"
          />
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-bone">
            Projects
          </h2>
        </div>
        <div className="hidden md:block font-mono text-xs text-dim uppercase tracking-[0.2em]">
          {projects.length} projects &middot; scroll &rarr;
        </div>
      </div>

      {/* Projects Track (Vertical on mobile, horizontal row on desktop) */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-5 md:px-10 md:flex-row md:w-max md:gap-8 items-stretch"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Desktop Progress Line */}
      <div className="hidden md:block w-full max-w-[1440px] mx-auto px-10 mt-8">
        <div className="h-0.5 w-full bg-bone/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-signal origin-left w-full scale-x-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

