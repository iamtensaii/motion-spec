/**
 * motion-spec → GSAP adapter
 *
 * Usage:
 *   import gsap from "gsap"
 *   import { toGSAP } from "@motion-spec/adapters/gsap"
 *
 *   const { from, vars } = toGSAP("entrance/focus")
 *   gsap.fromTo(element, from, vars)
 *
 *   // Or with timeline:
 *   const tl = gsap.timeline()
 *   tl.fromTo(".dialog", ...toGSAPArgs("entrance/focus"))
 */

import type { MotionIntent } from "@motion-spec/tokens"
import { getTokens, buildFromState, msToS } from "./utils"

export interface GSAPVars {
  opacity?:     number
  y?:           number | string
  x?:           number | string
  scale?:       number
  duration:     number
  ease:         string
  delay?:       number
  keyframes?:   Record<string, unknown>[]
  repeat?:      number
  yoyo?:        boolean
}

export interface GSAPFromTo {
  from: Omit<GSAPVars, "duration" | "ease" | "delay">
  vars: GSAPVars
}

/** Convert a DTCG cubic-bezier to GSAP ease string */
function toGSAPEase(easing: string): string {
  const map: Record<string, string> = {
    "cubic-bezier(0.0, 0.0, 0.2, 1.0)":   "power2.out",
    "cubic-bezier(0.4, 0.0, 1.0, 1.0)":   "power2.in",
    "cubic-bezier(0.4, 0.0, 0.2, 1.0)":   "power2.inOut",
    "cubic-bezier(0.34, 1.56, 0.64, 1.0)": "back.out(1.7)",
    "linear":                               "none",
  }
  return map[easing] ?? "power2.out"
}

export function toGSAP(intent: MotionIntent, options: { delay?: number } = {}): GSAPFromTo {
  const tokens = getTokens(intent)
  const from   = buildFromState(tokens)
  const ease   = toGSAPEase(tokens.easing)
  const dur    = msToS(tokens.duration)

  // feedback/error — shake keyframes
  if (intent === "feedback/error") {
    return {
      from: { x: 0 },
      vars: {
        keyframes: [{ x: -6 }, { x: 6 }, { x: -4 }, { x: 4 }, { x: 0 }],
        duration: dur,
        ease: "none",
      },
    }
  }

  // loading intents — loop
  if (intent.startsWith("loading/") || intent === "feedback/loading") {
    return {
      from: { opacity: 0.5 },
      vars: { opacity: 1, duration: dur, ease: "none", repeat: -1, yoyo: true },
    }
  }

  // exit intents — reverse direction
  if (intent.startsWith("exit/") || intent === "navigation/dismiss") {
    const toVars: GSAPVars = { opacity: 0, duration: dur, ease }
    if (from.translateY !== 0) toVars.y = from.translateY
    if (from.translateX !== 0) toVars.x = from.translateX
    if (from.scale !== 1)      toVars.scale = from.scale
    if (options.delay)         toVars.delay = options.delay / 1000
    return { from: { opacity: 1, y: 0, x: 0, scale: 1 }, vars: toVars }
  }

  // entrance / feedback / navigation intents
  const fromVars: Omit<GSAPVars, "duration" | "ease" | "delay"> = { opacity: from.opacity }
  if (from.translateY !== 0) fromVars.y = from.translateY
  if (from.translateX !== 0) fromVars.x = from.translateX
  if (from.scale !== 1)      fromVars.scale = from.scale

  const vars: GSAPVars = { opacity: 1, y: 0, x: 0, scale: 1, duration: dur, ease }
  if (options.delay) vars.delay = options.delay / 1000

  return { from: fromVars, vars }
}

/** Convenience: returns spread args for gsap.fromTo(el, ...toGSAPArgs(intent)) */
export function toGSAPArgs(
  intent: MotionIntent,
  options?: { delay?: number }
): [Omit<GSAPVars, "duration" | "ease" | "delay">, GSAPVars] {
  const { from, vars } = toGSAP(intent, options)
  return [from, vars]
}

/**
 * Stagger helper
 *
 * Usage:
 *   gsap.from(".item", toGSAPStagger("stagger/list"))
 */
export function toGSAPStagger(intent: "stagger/list" | "stagger/grid" | "stagger/cascade" | "stagger/random") {
  const tokens = getTokens(intent)
  return {
    opacity: 0,
    y: 8,
    duration: 0.25,
    ease: "power2.out",
    stagger: (tokens.staggerDelay ?? 40) / 1000,
  }
}
