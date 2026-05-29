/**
 * motion-spec → Anime.js adapter
 *
 * Usage:
 *   import anime from "animejs"
 *   import { toAnime } from "@motion-spec/adapters/anime"
 *
 *   anime({ targets: ".dialog", ...toAnime("entrance/focus") })
 *
 *   // Stagger:
 *   anime({ targets: ".item", ...toAnimeStagger("stagger/list") })
 */

import type { MotionIntent } from "@motion-spec/tokens"
import { getTokens, buildFromState, msToS } from "./utils"

export interface AnimeParams {
  opacity?:      number | number[]
  translateY?:   number | number[] | string[]
  translateX?:   number | number[] | string[]
  scale?:        number | number[]
  duration:      number
  easing:        string
  delay?:        number | ((el: Element, i: number) => number)
  loop?:         boolean
  direction?:    string
  keyframes?:    Record<string, unknown>[]
}

function toAnimeEase(easing: string): string {
  const map: Record<string, string> = {
    "cubic-bezier(0.0, 0.0, 0.2, 1.0)":    "easeOutQuad",
    "cubic-bezier(0.4, 0.0, 1.0, 1.0)":    "easeInQuad",
    "cubic-bezier(0.4, 0.0, 0.2, 1.0)":    "easeInOutQuad",
    "cubic-bezier(0.34, 1.56, 0.64, 1.0)": "spring(1, 80, 10, 0)",
    "linear":                               "linear",
  }
  return map[easing] ?? "easeOutQuad"
}

export function toAnime(intent: MotionIntent, options: { delay?: number } = {}): AnimeParams {
  const tokens = getTokens(intent)
  const from   = buildFromState(tokens)
  const easing = toAnimeEase(tokens.easing)
  const dur    = tokens.duration

  // feedback/error — shake
  if (intent === "feedback/error") {
    return {
      translateX: [0, -6, 6, -4, 4, 0],
      duration: dur,
      easing: "easeInOutSine",
    }
  }

  // feedback/confirm / celebration/subtle — scale pulse
  if (intent === "feedback/confirm") {
    return { scale: [1, 0.94, 1], duration: dur, easing }
  }
  if (intent === "celebration/subtle") {
    return { scale: [1, 1.08, 1], duration: dur, easing }
  }

  // loading — loop
  if (intent.startsWith("loading/") || intent === "feedback/loading") {
    return { opacity: [0.4, 1], duration: dur, easing: "linear", loop: true, direction: "alternate" }
  }

  // exit intents
  if (intent.startsWith("exit/") || intent === "navigation/dismiss") {
    const params: AnimeParams = { opacity: [1, 0], duration: dur, easing }
    if (from.translateY !== 0) params.translateY = [0, from.translateY as number]
    if (from.translateX !== 0) params.translateX = [0, from.translateX as number]
    if (from.scale !== 1)      params.scale = [1, from.scale]
    if (options.delay)         params.delay = options.delay
    return params
  }

  // entrance / feedback / navigation
  const params: AnimeParams = { opacity: [from.opacity, 1], duration: dur, easing }
  if (from.translateY !== 0) params.translateY = [from.translateY as number, 0]
  if (from.translateX !== 0) params.translateX = [from.translateX as number, 0]
  if (from.scale !== 1)      params.scale = [from.scale, 1]
  if (options.delay)         params.delay = options.delay

  return params
}

/**
 * Stagger helper
 *
 * Usage:
 *   import anime from "animejs"
 *   anime({ targets: ".list-item", ...toAnimeStagger("stagger/list") })
 */
export function toAnimeStagger(
  intent: "stagger/list" | "stagger/grid" | "stagger/cascade" | "stagger/random"
): AnimeParams {
  const tokens  = getTokens(intent)
  const perItem = tokens.staggerDelay ?? 40
  return {
    opacity:    [0, 1],
    translateY: [8, 0],
    duration:   tokens.duration,
    easing:     "easeOutQuad",
    delay:      (_el: Element, i: number) => i * perItem,
  }
}
