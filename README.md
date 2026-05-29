# motion-spec

**AI can build your UI. It still doesn't know how things should move.**

motion-spec is an open semantic animation specification for the web — the intent layer that W3C left unfinished. It gives developers, design systems, and AI code generation tools a shared vocabulary for motion.

---

## The Problem

Open any app built with v0, Lovable, or Cursor.

It works. It's clean. It looks right.

But it *feels* dead.

Every button fades the same way. Every modal appears the same way. `transition: all 0.3s ease` copy-pasted ten thousand times across ten thousand apps.

Not because developers don't care about motion. Because **there was never a language for it.**

W3C Design Tokens gives you values — `duration: 300ms`, `easing: ease-out`.  
Nobody defined the meaning — *"this element is entering a space for the first time."*

motion-spec is that meaning.

---

## The Gap

```
┌─────────────────────────────────────────────────────────┐
│                  The Motion Stack                       │
├─────────────────────────────────────────────────────────┤
│  INTENT LAYER    ← motion-spec fills this               │
│  "entrance/focus"  "feedback/success"  "stagger/list"  │
├─────────────────────────────────────────────────────────┤
│  TOKEN LAYER     ← W3C DTCG (partial, draft module)     │
│  duration: 300ms   easing: ease-out   delay: 0ms        │
├─────────────────────────────────────────────────────────┤
│  EXECUTION LAYER ← CSS / Framer Motion / Flutter / RN   │
│  @keyframes   animate()   AnimationController           │
└─────────────────────────────────────────────────────────┘
```

Material Design, IBM Carbon, Apple HIG — they all documented motion values.  
None of them built an open, machine-readable **semantic intent layer**.

motion-spec fills that gap.

---

## Quick Start

### React (copy-paste — you own the code)

```bash
npx motion-spec add entrance
```

```tsx
import { Entrance } from "@/components/motion/entrance"

// "entrance/focus" — element demanding attention
<Entrance intent="focus">
  <Dialog>...</Dialog>
</Entrance>

// "stagger/list" — items appearing in sequence
<Stagger intent="list">
  {items.map(item => <Card key={item.id} {...item} />)}
</Stagger>

// "feedback/success" — action confirmed
<Feedback intent="success">
  <Toast>Payment complete</Toast>
</Feedback>
```

### CSS (zero JS)

```css
@import "@motion-spec/css";
```

```html
<div data-motion="entrance/focus">...</div>
<ul data-motion="stagger/list">
  <li>...</li>
  <li>...</li>
</ul>
```

### With AI tools (v0, Cursor, Claude Code)

Add to your prompt:
```
Use motion-spec semantics for all animations.
Refer to: https://motion-spec.dev/ai/llms.txt
```

AI generates:
```tsx
// Instead of: className="transition-opacity duration-300"
<Entrance intent="focus">
  <Dialog />
</Entrance>
```

---

## The Vocabulary

| Intent | What it means | Compiles to |
|--------|--------------|-------------|
| `entrance/default` | Standard element appearance | `translateY(8px→0) + fade` |
| `entrance/focus` | Element demanding attention | `scale(0.97→1) + translateY + fade` |
| `entrance/hero` | Full-scale arrival | `scale(0.95→1) + translateY(24px) + fade` |
| `exit/dismiss` | User-initiated removal | `scale(1→0.95) + fade` |
| `feedback/success` | Positive outcome | `scale(0.9→1.05→1) spring` |
| `feedback/error` | Something went wrong | Horizontal shake |
| `feedback/confirm` | Action registered | `scale(1→0.94→1) pulse` |
| `navigation/forward` | Moving deeper | Slide left |
| `navigation/modal` | Opening an overlay | `translateY(32px→0) + scale` |
| `stagger/list` | Items appearing in sequence | 40ms per item delay |
| `celebration/milestone` | Major achievement | `scale(0.5→1.1→1) spring` |
| `loading/skeleton` | Content loading | Shimmer pulse loop |

Full vocabulary → [`spec/v1/vocabulary.md`](./spec/v1/vocabulary.md)

---

## Multi-Platform

Same intent, every target:

```ts
import { resolveIntent } from "@motion-spec/tokens"

const tokens = resolveIntent("entrance/focus")

// → CSS keyframes
// → Framer Motion { initial, animate, transition }
// → React Native Animated values
// → Flutter AnimationController config
// → Lottie JSON
```

---

## Why Not Just Use Framer Motion / GSAP?

They're execution layers. Excellent ones.

motion-spec is an **intent layer** — it sits above execution and compiles down to whatever runtime you use. Like how TypeScript compiles to JavaScript, motion-spec compiles to CSS, Framer Motion, Flutter, or React Native.

You choose the runtime. motion-spec provides the semantics.

---

## Packages

| Package | Description | Install |
|---------|-------------|---------|
| `@motion-spec/tokens` | Token definitions + intent resolver | `npm i @motion-spec/tokens` |
| `@motion-spec/react` | Copy-paste React components | `npx motion-spec add [intent]` |
| `@motion-spec/css` | Pure CSS keyframes | `npm i @motion-spec/css` |
| `motion_spec` | Flutter package | `flutter pub add motion_spec` |

---

## Reduced Motion

motion-spec respects `prefers-reduced-motion` by default. Every intent has a reduced variant that uses opacity-only transitions. No configuration needed.

---

## Spec

- [`spec/v1/vocabulary.md`](./spec/v1/vocabulary.md) — Human-readable intent definitions
- [`spec/v1/tokens.json`](./spec/v1/tokens.json) — W3C DTCG-compatible token values
- [`spec/v1/schema.json`](./spec/v1/schema.json) — JSON Schema for validation

---

## AI Integration

- [`ai/llms.txt`](./ai/llms.txt) — Machine-readable spec summary for LLMs
- [`ai/prompts/`](./ai/prompts/) — Prompt templates for v0, Cursor, Claude Code

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). All intents, platforms, and framework adapters welcome.

---

## License

MIT — motion-spec contributors
