import { INTENTS } from "./intents"
import type { MotionIntent, ResolvedIntent, ReducedMotionMode } from "./types"

/**
 * Resolves a semantic motion intent into concrete token values.
 * Respects prefers-reduced-motion by default.
 */
export function resolveIntent(
  intent: MotionIntent,
  options: {
    reducedMotion?: ReducedMotionMode
    delay?: number
    durationOverride?: number
  } = {}
): ResolvedIntent {
  const { reducedMotion = "auto", delay, durationOverride } = options
  const definition = INTENTS[intent]

  const prefersReduced =
    reducedMotion === "force-reduce" ||
    (reducedMotion === "auto" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false)

  const tokens = prefersReduced ? definition.reducedMotionTokens : definition.tokens

  return {
    intent,
    tokens: {
      ...tokens,
      ...(durationOverride !== undefined && { duration: durationOverride }),
      ...(delay !== undefined && { delay }),
    },
    reducedMotionTokens: definition.reducedMotionTokens,
    cssClass: intentToCssClass(intent),
    dataAttr: intent,
  }
}

/**
 * Returns CSS custom properties string for inline style application.
 */
export function intentToCssVars(intent: MotionIntent): Record<string, string> {
  const resolved = resolveIntent(intent)
  const t = resolved.tokens
  return {
    "--ms-duration": `${t.duration}ms`,
    "--ms-easing": t.easing,
    ...(t.translateY && { "--ms-translate-y": t.translateY }),
    ...(t.translateX && { "--ms-translate-x": t.translateX }),
    ...(t.scale && { "--ms-scale": t.scale }),
    ...(t.opacity && { "--ms-opacity": t.opacity }),
  }
}

function intentToCssClass(intent: MotionIntent): string {
  return "ms-" + intent.replace("/", "-")
}

/** Validate that a string is a known motion intent */
export function isValidIntent(value: string): value is MotionIntent {
  return value in INTENTS
}

/** Get all available intents grouped by category */
export function getAllIntents(): Record<string, MotionIntent[]> {
  const all = Object.keys(INTENTS) as MotionIntent[]
  return all.reduce<Record<string, MotionIntent[]>>((acc, intent) => {
    const [category] = intent.split("/")
    if (!acc[category]) acc[category] = []
    acc[category].push(intent)
    return acc
  }, {})
}
