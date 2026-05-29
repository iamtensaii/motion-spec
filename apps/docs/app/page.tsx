import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">

      {/* Hero */}
      <div data-motion="entrance/hero" className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 text-zinc-400 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
          Open specification · v1.0
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
          motion-spec
        </h1>

        <p className="text-xl md:text-2xl text-zinc-400 mb-4 leading-relaxed">
          AI can build your UI.
          <br />
          <span className="text-white">It still doesn't know how things should move.</span>
        </p>

        <p className="text-zinc-500 max-w-xl mx-auto mb-12">
          An open semantic animation specification — the intent layer that W3C left unfinished.
          Give AI tools and design systems a shared vocabulary for motion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/playground"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            See it in action →
          </Link>
          <Link
            href="/compare"
            className="px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium transition-colors"
          >
            Before / After
          </Link>
          <a
            href="https://github.com/[owner]/motion-spec"
            className="px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* The gap diagram */}
      <div data-motion="entrance/subtle" className="mt-32 max-w-2xl w-full text-left">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">The gap</h2>
        <div className="font-mono text-sm border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-indigo-950/30 border-b border-zinc-800">
            <span className="text-indigo-400">INTENT LAYER</span>
            <span className="text-zinc-500 ml-4">← motion-spec fills this</span>
            <p className="text-zinc-300 mt-1 text-xs">"entrance/focus"  "feedback/success"  "stagger/list"</p>
          </div>
          <div className="px-6 py-4 border-b border-zinc-800">
            <span className="text-zinc-400">TOKEN LAYER</span>
            <span className="text-zinc-600 ml-4">← W3C DTCG (partial, draft)</span>
            <p className="text-zinc-600 mt-1 text-xs">duration: 300ms   easing: ease-out   delay: 0ms</p>
          </div>
          <div className="px-6 py-4">
            <span className="text-zinc-600">EXECUTION LAYER</span>
            <span className="text-zinc-700 ml-4">← CSS / Framer Motion / Flutter</span>
            <p className="text-zinc-700 mt-1 text-xs">@keyframes   animate()   AnimationController</p>
          </div>
        </div>
      </div>

      {/* Quick install */}
      <div data-motion="entrance/subtle" className="mt-20 max-w-lg w-full">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Quick start</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left font-mono text-sm">
          <p className="text-zinc-500 mb-3"># Install</p>
          <p className="text-white mb-6">npm install @motion-spec/react</p>
          <p className="text-zinc-500 mb-3"># Use</p>
          <p><span className="text-indigo-400">{"<Entrance"}</span> <span className="text-amber-300">intent</span><span className="text-white">="focus"</span><span className="text-indigo-400">{">"}</span></p>
          <p className="pl-4 text-zinc-400">{"<Dialog />"}</p>
          <p><span className="text-indigo-400">{"</Entrance>"}</span></p>
        </div>
      </div>

    </main>
  )
}
