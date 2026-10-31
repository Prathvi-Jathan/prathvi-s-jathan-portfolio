import { personalInfo, heroContent } from './data/portfolioData'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-bone font-sans hud-grid flex items-center justify-center p-6">
      <div className="hud-frame bg-panel border border-bone/10 p-8 max-w-xl w-full">
        <div className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
          {heroContent.eyebrow}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-bone mb-1">
          {personalInfo.name}
        </h1>
        <p className="font-mono text-sm text-dim mb-4">{personalInfo.role} // {personalInfo.city}</p>
        <p className="text-bone/80 text-base mb-6 leading-relaxed">
          {heroContent.intro}
        </p>
        <div className="border-t border-bone/10 pt-4 space-y-2">
          <div className="font-mono text-xs text-dim uppercase tracking-wider">HUD Status:</div>
          {heroContent.statusLines.map((line) => (
            <div key={line} className="font-mono text-xs text-signal flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-signal rounded-full"></span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
