import { resolveIntent } from "@motion-spec/tokens"
import type { MotionIntent, MotionTokens } from "@motion-spec/tokens"

/** Parse "8px" → 8, "30%" → "30%", undefined → 0 */
export function parsePx(val: string | undefined): number {
  if (!val) return 0
  return parseFloat(val)
}

/** Parse "30%" → "30%" (keep as string for transforms that need %) */
export function parseTranslate(val: string | undefined): number | string {
  if (!val) return 0
  if (val.includes("%")) return val.split("→")[0] ?? val
  return parseFloat(val.split("→")[0] ?? val)
}

/** ms → seconds */
export function msToS(ms: number): number {
  return ms / 1000
}

/** Parse a cubic-bezier string into [n,n,n,n] array */
export function parseEasing(easing: string): [number, number, number, number] | string {
  const match = easing.match(/cubic-bezier\(([^)]+)\)/)
  if (match) {
    const [a, b, c, d] = match[1].split(",").map(Number)
    return [a, b, c, d]
  }
  return easing
}

/** Get tokens for an intent, with automatic reduced-motion handling */
export function getTokens(intent: MotionIntent): MotionTokens {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  const resolved = resolveIntent(intent)
  return prefersReduced ? resolved.reducedMotionTokens : resolved.tokens
}

/** Build the "from" state values for an intent */
export function buildFromState(tokens: MotionTokens) {
  return {
    opacity:    tokens.opacity?.startsWith("0") ? 0 : 1,
    translateY: parseTranslate(tokens.translateY),
    translateX: parseTranslate(tokens.translateX),
    scale:      tokens.scale ? parseFloat(tokens.scale.split("→")[0]) : 1,
  }
}

/** Build the "to" state values for an intent */
export function buildToState(tokens: MotionTokens) {
  return {
    opacity:    tokens.opacity?.endsWith("1") ? 1 : 0,
    translateY: 0,
    translateX: 0,
    scale:      1,
  }
}
