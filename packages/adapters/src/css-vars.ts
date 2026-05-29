/**
 * motion-spec → CSS custom properties adapter
 *
 * Usage (vanilla JS / any framework):
 *   import { toCSSVars } from "@motion-spec/adapters/css-vars"
 *
 *   const vars = toCSSVars("entrance/focus")
 *   Object.assign(element.style, vars)
 *   element.setAttribute("data-motion", "entrance/focus")
 *
 * Works with @motion-spec/css — the CSS keyframes read these variables.
 */

import type { MotionIntent } from "@motion-spec/tokens"
import { resolveIntent } from "@motion-spec/tokens"

export function toCSSVars(intent: MotionIntent): Record<string, string> {
  const { tokens } = resolveIntent(intent)
  return {
    "--ms-duration":     `${tokens.duration}ms`,
    "--ms-easing":       tokens.easing,
    "--ms-translate-y":  tokens.translateY ?? "0px",
    "--ms-translate-x":  tokens.translateX ?? "0px",
    "--ms-scale":        tokens.scale?.split("→")[0] ?? "1",
    "--ms-opacity-from": tokens.opacity?.split("→")[0] ?? "0",
  }
}
