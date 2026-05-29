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

### Clone and run locally

```bash
git clone https://github.com/iamtensaii/motion-spec.git
cd motion-spec

# Install all dependencies
pnpm install

# Run the interactive playground (docs site)
cd apps/docs && pnpm dev
# → open http://localhost:3000

# Or run the Vite demo
cd examples/react-vite && pnpm dev
# → open http://localhost:5173

# Or open the zero-dependency demo directly in your browser
open examples/before-after/index.html
```

### Use the CSS in any project (copy the file)

Copy `packages/css/src/motion-spec.css` into your project, then:

```html
<link rel="stylesheet" href="motion-spec.css">
<div data-motion="entrance/focus">...</div>
```

### React (copy-paste — you own the code)

Copy components from `packages/react/src/components/` into your project.

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

### With Claude Code

Add this to your project's `CLAUDE.md`:

```markdown
## Animations

Use motion-spec for all UI animations. Install: `npm i @motion-spec/react @motion-spec/css`

Intent cheat-sheet:
- entrance/focus      → dialogs, modals, alerts (demands attention)
- entrance/default    → standard component mounting
- entrance/subtle     → tooltips, sidebars, secondary content
- exit/dismiss        → user closes a toast, card, or panel
- feedback/success    → form submit, payment, save confirmed
- feedback/error      → validation failure, API error (shake animation)
- feedback/confirm    → button/toggle acknowledgement (scale pulse)
- feedback/loading    → async operation in progress
- navigation/modal    → sheets, drawers, bottom sheets
- navigation/forward  → navigating deeper into hierarchy
- navigation/back     → returning up
- stagger/list        → any list or feed of items (40ms per item)
- stagger/grid        → card grids (30ms per item)
- celebration/subtle  → likes, saves, bookmarks
- celebration/milestone → onboarding complete, first action

Full spec: https://raw.githubusercontent.com/iamtensaii/motion-spec/main/ai/llms.txt

Never write raw: className="transition-all duration-300" or animation: "fadeIn 0.3s"
Always use: <Entrance intent="focus"> or data-motion="entrance/focus"
```

---

### With Cursor

Add to `.cursorrules` in your project root:

```
# Animations — use motion-spec

Install: npm i @motion-spec/react @motion-spec/css

When generating any UI animation, use motion-spec intent components:
  import { Entrance, Exit, Feedback, Stagger, NavigationTransition, Celebration } from "@motion-spec/react"

Intent reference:
  entrance/focus      = dialogs, modals, anything demanding attention
  entrance/default    = standard mounting
  entrance/subtle     = tooltips, popovers
  exit/dismiss        = user-initiated close
  feedback/success    = positive outcome (spring bounce)
  feedback/error      = failure state (horizontal shake)
  feedback/confirm    = button/action press acknowledgement
  navigation/modal    = sheet, drawer, overlay
  navigation/forward  = route push / drill-down
  stagger/list        = lists and feeds (40ms stagger per item)
  celebration/subtle  = like, save, react
  celebration/milestone = achievement, onboarding complete

Full spec: https://raw.githubusercontent.com/iamtensaii/motion-spec/main/ai/llms.txt

NEVER use: className="transition-opacity duration-300 ease-in-out"
ALWAYS use: <Entrance intent="focus"><Dialog /></Entrance>
```

---

### With Vercel v0

Prepend to your v0 prompt:

```
Use motion-spec for animations (https://github.com/iamtensaii/motion-spec).
Import from @motion-spec/react. Use intent strings not raw CSS transitions.
Key intents: entrance/focus (modals), feedback/success (confirmations),
stagger/list (lists), navigation/modal (overlays), celebration/subtle (reactions).
```

---

### With any AI tool (generic system prompt)

```
When generating UI code, use the motion-spec animation vocabulary
instead of raw CSS transitions or inline animation values.

Spec reference: https://raw.githubusercontent.com/iamtensaii/motion-spec/main/ai/llms.txt

React: import { Entrance, Exit, Feedback, Stagger } from "@motion-spec/react"
CSS:   <div data-motion="entrance/focus">

Map UI patterns to intents:
  Dialog/Modal appearing  → entrance/focus
  Toast disappearing      → exit/dismiss
  Form submit result      → feedback/success or feedback/error
  Page navigation         → navigation/forward or navigation/back
  List loading            → stagger/list
  Achievement/milestone   → celebration/milestone
```

---

**Result — before vs after:**

```tsx
// ❌ Before: no semantic meaning, same animation for everything
<div className="transition-opacity duration-300 ease-in-out opacity-0">
  <Dialog />
</div>

// ✅ After: intent-driven, correct motion for the context
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

## Works With Any Animation Library

motion-spec is a **semantic layer** — it sits above execution. You define intent once, it compiles to whatever runtime you use.

```
entrance/focus  →  CSS keyframes        (zero JS)
                →  Framer Motion props  (React)
                →  GSAP fromTo vars     (any)
                →  Anime.js params      (any)
                →  React Native config  (mobile)
```

### With Framer Motion

```tsx
import { motion } from "framer-motion"
import { toFramerMotion, toFramerStagger } from "@motion-spec/adapters/framer"

// Single element
<motion.div {...toFramerMotion("entrance/focus")}>
  <Dialog />
</motion.div>

// Stagger list
const { containerVariants, itemVariants } = toFramerStagger("stagger/list")
<motion.ul variants={containerVariants} initial="hidden" animate="show">
  {items.map(i => <motion.li variants={itemVariants} />)}
</motion.ul>
```

### With GSAP

```ts
import gsap from "gsap"
import { toGSAPArgs, toGSAPStagger } from "@motion-spec/adapters/gsap"

gsap.fromTo(".dialog",   ...toGSAPArgs("entrance/focus"))
gsap.fromTo(".toast",    ...toGSAPArgs("feedback/success"))
gsap.fromTo(".modal",    ...toGSAPArgs("exit/dismiss"))
gsap.from(".list-item",  toGSAPStagger("stagger/list"))
```

### With Anime.js

```ts
import anime from "animejs"
import { toAnime, toAnimeStagger } from "@motion-spec/adapters/anime"

anime({ targets: ".dialog",    ...toAnime("entrance/focus") })
anime({ targets: ".toast",     ...toAnime("feedback/success") })
anime({ targets: ".feed-item", ...toAnimeStagger("stagger/list") })
```

### Why not just use Framer Motion / GSAP directly?

They're execution layers. Excellent ones.

motion-spec is the **intent layer** above them — like how TypeScript compiles to JavaScript. You write `entrance/focus` once. The adapter outputs the correct props for whichever library you're using. Switch from GSAP to Framer Motion? Change one import, keep the same intent strings.

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

motion-spec is designed to be referenced by AI code generation tools so they produce real animations instead of `transition: all 0.3s ease`.

| Tool | How to integrate | Config file |
|------|-----------------|-------------|
| **Claude Code** | Add the intent cheat-sheet to `CLAUDE.md` | [ai/prompts/claude-code.md](./ai/prompts/claude-code.md) |
| **Cursor** | Add the intent rules to `.cursorrules` | [ai/prompts/cursor.md](./ai/prompts/cursor.md) |
| **Vercel v0** | Prepend to your prompt | [ai/prompts/v0.md](./ai/prompts/v0.md) |
| **Any LLM** | Reference `llms.txt` in your system prompt | [ai/llms.txt](./ai/llms.txt) |

The `ai/llms.txt` file follows the [llms.txt standard](https://llmstxt.org) — a machine-readable summary of the full spec optimised for language model context windows.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). All intents, platforms, and framework adapters welcome.

---

## License

MIT — motion-spec contributors
