import type { MotionIntent, MotionTokens } from "./types"

const REDUCED: MotionTokens = {
  duration: 150,
  easing: "ease-out",
  opacity: "0→1",
}

export const INTENTS: Record<MotionIntent, { tokens: MotionTokens; reducedMotionTokens: MotionTokens }> = {

  // ─── Entrance ─────────────────────────────────────────────────────────────

  "entrance/default": {
    tokens: { duration: 250, easing: "cubic-bezier(0,0,0.2,1)", translateY: "8px", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "entrance/focus": {
    tokens: { duration: 350, easing: "cubic-bezier(0,0,0.2,1)", translateY: "12px", scale: "0.97→1", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "entrance/hero": {
    tokens: { duration: 700, easing: "cubic-bezier(0,0,0.2,1)", translateY: "24px", scale: "0.95→1", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "entrance/subtle": {
    tokens: { duration: 150, easing: "cubic-bezier(0,0,0.2,1)", translateY: "4px", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "entrance/immediate": {
    tokens: { duration: 100, easing: "cubic-bezier(0,0,0.2,1)", opacity: "0→1" },
    reducedMotionTokens: { duration: 100, easing: "linear", opacity: "0→1" },
  },

  // ─── Exit ─────────────────────────────────────────────────────────────────

  "exit/default": {
    tokens: { duration: 150, easing: "cubic-bezier(0.4,0,1,1)", translateY: "0→-8px", opacity: "1→0" },
    reducedMotionTokens: { duration: 150, easing: "ease-in", opacity: "1→0" },
  },
  "exit/dismiss": {
    tokens: { duration: 250, easing: "cubic-bezier(0.4,0,1,1)", scale: "1→0.95", opacity: "1→0" },
    reducedMotionTokens: { duration: 150, easing: "ease-in", opacity: "1→0" },
  },
  "exit/replace": {
    tokens: { duration: 350, easing: "cubic-bezier(0.4,0,0.2,1)", translateX: "0→-24px", opacity: "1→0" },
    reducedMotionTokens: { duration: 150, easing: "ease-in", opacity: "1→0" },
  },
  "exit/immediate": {
    tokens: { duration: 100, easing: "linear", opacity: "1→0" },
    reducedMotionTokens: { duration: 100, easing: "linear", opacity: "1→0" },
  },

  // ─── Feedback ─────────────────────────────────────────────────────────────

  "feedback/success": {
    tokens: { duration: 500, easing: "cubic-bezier(0.34,1.56,0.64,1)", scale: "0.9→1.05→1", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "feedback/error": {
    tokens: { duration: 250, easing: "cubic-bezier(0.34,1.56,0.64,1)", translateX: "shake" },
    reducedMotionTokens: { duration: 150, easing: "ease-out", opacity: "0.6→1" },
  },
  "feedback/warning": {
    tokens: { duration: 350, easing: "cubic-bezier(0,0,0.2,1)", translateY: "4px→0", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "feedback/loading": {
    tokens: { duration: 1200, easing: "linear", iteration: "infinite" },
    reducedMotionTokens: { duration: 1200, easing: "linear", iteration: 1, opacity: "0.5→1" },
  },
  "feedback/confirm": {
    tokens: { duration: 150, easing: "cubic-bezier(0.34,1.56,0.64,1)", scale: "1→0.94→1" },
    reducedMotionTokens: { duration: 100, easing: "ease-out", opacity: "0.7→1" },
  },

  // ─── Navigation ───────────────────────────────────────────────────────────

  "navigation/forward": {
    tokens: { duration: 350, easing: "cubic-bezier(0.4,0,0.2,1)", translateX: "30%→0", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "navigation/back": {
    tokens: { duration: 350, easing: "cubic-bezier(0.4,0,0.2,1)", translateX: "-30%→0", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "navigation/lateral": {
    tokens: { duration: 250, easing: "cubic-bezier(0.4,0,0.2,1)", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "navigation/modal": {
    tokens: { duration: 350, easing: "cubic-bezier(0,0,0.2,1)", translateY: "32px→0", scale: "0.96→1", opacity: "0→1" },
    reducedMotionTokens: REDUCED,
  },
  "navigation/dismiss": {
    tokens: { duration: 250, easing: "cubic-bezier(0.4,0,1,1)", translateY: "0→48px", opacity: "1→0" },
    reducedMotionTokens: { duration: 150, easing: "ease-in", opacity: "1→0" },
  },

  // ─── Stagger ──────────────────────────────────────────────────────────────

  "stagger/list":    { tokens: { duration: 250, easing: "cubic-bezier(0,0,0.2,1)", staggerDelay: 40,  maxStaggerDelay: 400, translateY: "8px", opacity: "0→1" }, reducedMotionTokens: { ...REDUCED, staggerDelay: 0 } },
  "stagger/grid":    { tokens: { duration: 250, easing: "cubic-bezier(0,0,0.2,1)", staggerDelay: 30,  maxStaggerDelay: 500, translateY: "8px", opacity: "0→1" }, reducedMotionTokens: { ...REDUCED, staggerDelay: 0 } },
  "stagger/cascade": { tokens: { duration: 250, easing: "cubic-bezier(0,0,0.2,1)", staggerDelay: 60,  maxStaggerDelay: 400, translateY: "8px", opacity: "0→1" }, reducedMotionTokens: { ...REDUCED, staggerDelay: 0 } },
  "stagger/random":  { tokens: { duration: 250, easing: "cubic-bezier(0,0,0.2,1)", staggerDelay: 80,  maxStaggerDelay: 600, translateY: "8px", opacity: "0→1" }, reducedMotionTokens: { ...REDUCED, staggerDelay: 0 } },

  // ─── Loading ──────────────────────────────────────────────────────────────

  "loading/skeleton": { tokens: { duration: 2000, easing: "linear", iteration: "infinite", opacity: "0.5→1" }, reducedMotionTokens: { duration: 2000, easing: "linear", iteration: 1, opacity: "0.7→1" } },
  "loading/spinner":  { tokens: { duration: 800,  easing: "linear", iteration: "infinite" }, reducedMotionTokens: { duration: 800, easing: "linear", iteration: 1 } },
  "loading/progress": { tokens: { duration: 300,  easing: "cubic-bezier(0,0,0.2,1)" }, reducedMotionTokens: { duration: 150, easing: "linear" } },
  "loading/pulse":    { tokens: { duration: 1500, easing: "linear", iteration: "infinite", opacity: "0.4→1" }, reducedMotionTokens: { duration: 1500, easing: "linear", iteration: 1, opacity: "0.7→1" } },

  // ─── Celebration ──────────────────────────────────────────────────────────

  "celebration/milestone": { tokens: { duration: 700, easing: "cubic-bezier(0.34,1.56,0.64,1)", scale: "0.5→1.1→1", opacity: "0→1" }, reducedMotionTokens: REDUCED },
  "celebration/reward":    { tokens: { duration: 500, easing: "cubic-bezier(0.34,1.56,0.64,1)", scale: "0.8→1.15→1", opacity: "0→1" }, reducedMotionTokens: REDUCED },
  "celebration/subtle":    { tokens: { duration: 150, easing: "cubic-bezier(0.34,1.56,0.64,1)", scale: "1→1.08→1" }, reducedMotionTokens: { duration: 100, easing: "ease-out", opacity: "0.8→1" } },
}
