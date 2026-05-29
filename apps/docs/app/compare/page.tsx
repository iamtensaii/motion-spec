"use client"

import { useState } from "react"

const EXAMPLES = [
  {
    label: "Dialog / Modal",
    without: { css: "opacity: 0 → 1, transition: 0.3s ease", feel: "flat, clinical" },
    with: { intent: "entrance/focus", feel: "purposeful, draws attention" },
    dataMotion: "entrance/focus",
  },
  {
    label: "Success Toast",
    without: { css: "opacity: 0 → 1, transition: 0.3s ease", feel: "same as everything else" },
    with: { intent: "feedback/success", feel: "spring bounce — alive, confirming" },
    dataMotion: "feedback/success",
  },
  {
    label: "List / Feed",
    without: { css: "all items fade in at once", feel: "wall of content appearing" },
    with: { intent: "stagger/list", feel: "items cascade in naturally, 40ms apart" },
    dataMotion: "stagger/list",
  },
  {
    label: "Page Forward",
    without: { css: "opacity: 0 → 1, transition: 0.3s", feel: "no spatial relationship" },
    with: { intent: "navigation/forward", feel: "slides in from right — you went deeper" },
    dataMotion: "navigation/forward",
  },
]

export default function ComparePage() {
  const [keys, setKeys] = useState<Record<number, number>>({})

  function replay(idx: number) {
    setKeys(k => ({ ...k, [idx]: (k[idx] ?? 0) + 1 }))
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <div data-motion="entrance/subtle">
        <a href="/" className="text-zinc-500 hover:text-zinc-300 text-sm mb-8 inline-block">← motion-spec</a>
        <h1 className="text-3xl font-bold mb-2">Before / After</h1>
        <p className="text-zinc-400 mb-12">
          Same component. Same purpose. The difference is intent.
        </p>
      </div>

      <div className="space-y-12">
        {EXAMPLES.map((ex, idx) => (
          <div key={ex.label} className="border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="font-medium">{ex.label}</h2>
              <button
                onClick={() => replay(idx)}
                className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 rounded px-2 py-1"
              >
                ↺ replay both
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">

              {/* Without */}
              <div className="p-8">
                <p className="text-xs uppercase tracking-widest text-red-400/70 mb-4">Without motion-spec</p>
                <div
                  key={`without-${keys[idx] ?? 0}`}
                  style={{
                    opacity: 0,
                    animation: `fadeOnly 300ms ease forwards`,
                  }}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5"
                >
                  <div className="h-3 bg-zinc-600 rounded mb-3 w-2/3" />
                  <div className="h-3 bg-zinc-700 rounded mb-2 w-full" />
                  <div className="h-3 bg-zinc-700 rounded w-4/5" />
                </div>
                <p className="mt-3 text-xs text-zinc-600 font-mono">{ex.without.css}</p>
                <p className="mt-1 text-xs text-zinc-500 italic">"{ex.without.feel}"</p>
              </div>

              {/* With */}
              <div className="p-8">
                <p className="text-xs uppercase tracking-widest text-indigo-400/70 mb-4">With motion-spec</p>
                <div
                  key={`with-${keys[idx] ?? 0}`}
                  data-motion={ex.dataMotion}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5"
                >
                  <div className="h-3 bg-zinc-600 rounded mb-3 w-2/3" />
                  <div className="h-3 bg-zinc-700 rounded mb-2 w-full" />
                  <div className="h-3 bg-zinc-700 rounded w-4/5" />
                </div>
                <p className="mt-3 text-xs text-indigo-500/70 font-mono">intent="{ex.with.intent}"</p>
                <p className="mt-1 text-xs text-zinc-400 italic">"{ex.with.feel}"</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeOnly {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </main>
  )
}
