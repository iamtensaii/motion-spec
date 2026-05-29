# motion-spec Vocabulary — v1

## Overview

The motion-spec vocabulary defines animation **intent** — the *why* behind a motion, not just the *how*.

W3C Design Tokens give you values: `duration: 300ms`, `easing: ease-out`.  
motion-spec gives you meaning: `entrance/focus`, `feedback/success`, `navigation/forward`.

---

## Intent Namespace

All intents follow the pattern: `{category}/{variant}`

---

## Categories

### `entrance` — Something arriving in a space

| Intent | Description | When to use |
|--------|-------------|-------------|
| `entrance/default` | Standard element appearance | General mounting |
| `entrance/focus` | Element demanding attention | Dialogs, alerts, spotlights |
| `entrance/hero` | Large-scale entrance, full page | Landing sections, hero elements |
| `entrance/subtle` | Quiet arrival, no interruption | Sidebars, tooltips, secondary content |
| `entrance/immediate` | Near-instant, respects reduced motion | Error states, critical info |

**Token profile:**
- Duration: `150ms` (subtle) → `600ms` (hero)
- Easing: `ease-out` family — things decelerate as they arrive
- Transform: upward Y movement (`translateY(8px → 0)`) or scale (`0.96 → 1`)

---

### `exit` — Something leaving a space

| Intent | Description | When to use |
|--------|-------------|-------------|
| `exit/default` | Standard element disappearance | General unmounting |
| `exit/dismiss` | User-initiated removal | Closing toasts, dismissing cards |
| `exit/replace` | Leaving to make room for something new | Route transitions, step wizards |
| `exit/immediate` | Near-instant removal | Error recovery, urgent updates |

**Token profile:**
- Duration: `100ms` (immediate) → `300ms` (replace)
- Easing: `ease-in` family — things accelerate as they leave
- Transform: downward Y movement or scale down (`1 → 0.96`)

---

### `feedback` — Response to a user action

| Intent | Description | When to use |
|--------|-------------|-------------|
| `feedback/success` | Positive outcome confirmed | Form submitted, payment complete |
| `feedback/error` | Something went wrong | Validation failure, API error |
| `feedback/warning` | Caution, needs attention | Unsaved changes, rate limits |
| `feedback/loading` | Work in progress | Async operations, fetching |
| `feedback/confirm` | Action registered by the system | Button press, toggle, selection |

**Token profile:**
- Duration: `150ms` (confirm) → `500ms` (success)
- Easing: `spring` for confirm/success (bouncy, alive), `ease-out` for error/warning
- Transform: scale pulse for confirm, vertical shake for error

---

### `navigation` — Moving between views or states

| Intent | Description | When to use |
|--------|-------------|-------------|
| `navigation/forward` | Moving deeper into hierarchy | Clicking a list item, drill-down |
| `navigation/back` | Returning up in hierarchy | Back button, breadcrumb |
| `navigation/lateral` | Switching between siblings | Tab change, bottom nav |
| `navigation/modal` | Opening an overlay context | Sheet, drawer, dialog |
| `navigation/dismiss` | Closing an overlay context | Swiping down a sheet |

**Token profile:**
- Duration: `250ms` → `400ms`
- Easing: `ease-in-out` — smooth, purposeful
- Transform: X-axis slide for forward/back/lateral; Y-axis for modal/dismiss

---

### `stagger` — Choreographing a group

| Intent | Description | When to use |
|--------|-------------|-------------|
| `stagger/list` | Items appearing in sequence | Feed, search results, inbox |
| `stagger/grid` | Items appearing in 2D grid order | Card gallery, photo grid |
| `stagger/cascade` | Parent leads, children follow | Menu opening, accordion |
| `stagger/random` | Organic, non-sequential appearance | Creative layouts, portfolios |

**Token profile:**
- Per-item delay: `30ms` (dense lists) → `80ms` (featured cards)
- Base duration: same as `entrance/default` per item
- Max total stagger time: `500ms` (truncated for long lists)

---

### `loading` — Communicating pending state

| Intent | Description | When to use |
|--------|-------------|-------------|
| `loading/skeleton` | Content placeholder while fetching | Page load, data refresh |
| `loading/spinner` | Indeterminate activity | Background tasks |
| `loading/progress` | Determinate progress known | Upload, multi-step process |
| `loading/pulse` | Subtle aliveness indicator | Live data, real-time updates |

**Token profile:**
- Duration: `1000ms` → `2000ms` cycles (looping)
- Easing: `ease-in-out` for smooth loops
- Opacity range: `0.4 → 1.0` for pulse/skeleton shimmer

---

### `celebration` — Marking significant moments

| Intent | Description | When to use |
|--------|-------------|-------------|
| `celebration/milestone` | Major achievement reached | Onboarding complete, first action |
| `celebration/reward` | Smaller positive reinforcement | Streak, badge, points |
| `celebration/subtle` | Quiet delight, non-disruptive | Like, save, bookmark |

**Token profile:**
- Duration: `400ms` (subtle) → `1200ms` (milestone)
- Easing: `spring` — high energy, playful
- Scale: goes above 1.0 (e.g., `1 → 1.15 → 1`) for reward feel

---

## Reduced Motion

All intents degrade gracefully when `prefers-reduced-motion: reduce` is set:
- All transforms removed; opacity-only transitions used
- Durations capped at `150ms`
- Looping animations (loading) stop after one cycle

---

## Intent Composition

Intents can be composed for complex scenarios:

```
navigation/forward  →  exit/replace (outgoing) + entrance/default (incoming)
navigation/modal    →  entrance/focus (dialog)  + loading/skeleton (content)
feedback/success    →  celebration/subtle + exit/dismiss (after 3s)
```

---

## Versioning

This is `spec/v1`. Breaking changes increment the major version.  
Additive changes (new intents, new variants) are non-breaking within a major version.
