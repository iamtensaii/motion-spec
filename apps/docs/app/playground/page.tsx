"use client"

import { useState } from "react"
import { getAllIntents } from "@motion-spec/tokens"
import type { MotionIntent } from "@motion-spec/tokens"

const INTENT_CODE: Record<string, string> = {
  "entrance/default":   `<Entrance intent="default">\n  <Card />\n</Entrance>`,
  "entrance/focus":     `<Entrance intent="focus">\n  <Dialog />\n</Entrance>`,
  "entrance/hero":      `<Entrance intent="hero">\n  <HeroSection />\n</Entrance>`,
  "entrance/subtle":    `<Entrance intent="subtle">\n  <Tooltip />\n</Entrance>`,
  "feedback/success":   `<Feedback intent="success">\n  <Toast>Done!</Toast>\n</Feedback>`,
  "feedback/error":     `<Feedback intent="error">\n  <Banner>Failed</Banner>\n</Feedback>`,
  "feedback/confirm":   `<Feedback intent="confirm">\n  <Button />\n</Feedback>`,
  "navigation/modal":   `<NavigationTransition intent="modal">\n  <Sheet />\n</NavigationTransition>`,
  "navigation/forward": `<NavigationTransition intent="forward">\n  <DetailPage />\n</NavigationTransition>`,
  "stagger/list":       `<Stagger intent="list">\n  {items.map(i => <Row key={i.id} />)}\n</Stagger>`,
  "celebration/milestone": `<Celebration intent="milestone">\n  <Complete />\n</Celebration>`,
  "celebration/subtle": `<Celebration intent="subtle">\n  <HeartIcon />\n</Celebration>`,
}

export default function Playground() {
  const [active, setActive] = useState<MotionIntent>("entrance/focus")
  const [key, setKey] = useState(0)

  const allIntents = getAllIntents()

  function replay(intent: MotionIntent) {
    setActive(intent)
    setKey(k => k + 1)
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <div data-motion="entrance/subtle">
        <a href="/" className="text-zinc-500 hover:text-zinc-300 text-sm mb-8 inline-block">← motion-spec</a>
        <h1 className="text-3xl font-bold mb-2">Playground</h1>
        <p className="text-zinc-400 mb-12">Click any intent to see it animate live.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        {/* Intent list */}
        <nav className="space-y-6">
          {Object.entries(allIntents).map(([category, intents]) => (
            <div key={category}>
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{category}</p>
              <div className="space-y-1">
                {intents.map(intent => (
                  <button
                    key={intent}
                    onClick={() => replay(intent)}
                    className={[
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors",
                      active === intent
                        ? "bg-indigo-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                    ].join(" ")}
                  >
                    {intent}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Preview */}
        <div className="space-y-6">
          {/* Live demo */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 min-h-[240px] flex items-center justify-center relative overflow-hidden">
            <button
              onClick={() => replay(active)}
              className="absolute top-4 right-4 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 rounded px-2 py-1"
            >
              ↺ replay
            </button>
            <div
              key={key}
              data-motion={active}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 max-w-xs w-full"
            >
              <div className="h-3 bg-zinc-600 rounded mb-3 w-2/3" />
              <div className="h-3 bg-zinc-700 rounded mb-3 w-full" />
              <div className="h-3 bg-zinc-700 rounded w-4/5" />
            </div>
          </div>

          {/* Code */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono text-sm">
            <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">React</p>
            <pre className="text-zinc-300 whitespace-pre-wrap">
              {INTENT_CODE[active] ?? `<Motion intent="${active}">\n  <YourComponent />\n</Motion>`}
            </pre>
          </div>

          {/* CSS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono text-sm">
            <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">HTML + CSS</p>
            <pre className="text-zinc-300">
              {`<div data-motion="${active}">\n  ...\n</div>`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
