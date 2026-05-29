/**
 * motion-spec → React Native Animated adapter
 *
 * Usage:
 *   import { Animated, Easing } from "react-native"
 *   import { toRNAnimated } from "@motion-spec/adapters/react-native"
 *
 *   const { style, start } = toRNAnimated("entrance/focus")
 *   // Use style on your Animated.View, call start() to trigger
 *
 *   <Animated.View style={style}><Dialog /></Animated.View>
 *   useEffect(() => { start() }, [])
 */

import type { MotionIntent } from "@motion-spec/tokens"
import { getTokens, buildFromState } from "./utils"

export interface RNAnimatedConfig {
  /** Animated.Value refs to attach to your Animated.View style */
  values: {
    opacity:    { value: number; toValue: number }
    translateY: { value: number; toValue: number }
    translateX: { value: number; toValue: number }
    scale:      { value: number; toValue: number }
  }
  /** Duration in ms */
  duration: number
  /** Easing description — map to RN Easing manually */
  easing: "out" | "in" | "inOut" | "spring" | "linear"
  /** Whether to use spring instead of timing */
  useSpring: boolean
  /** Spring config (if useSpring) */
  springConfig?: { tension: number; friction: number }
}

function toRNEasing(easing: string): RNAnimatedConfig["easing"] {
  if (easing.includes("0.34, 1.56")) return "spring"
  if (easing.includes("0.4, 0.0, 1.0")) return "in"
  if (easing.includes("0.4, 0.0, 0.2")) return "inOut"
  if (easing === "linear") return "linear"
  return "out"
}

export function toRNAnimated(intent: MotionIntent): RNAnimatedConfig {
  const tokens  = getTokens(intent)
  const from    = buildFromState(tokens)
  const rnEase  = toRNEasing(tokens.easing)
  const useSpring = rnEase === "spring"

  // exit intents — flip values
  if (intent.startsWith("exit/") || intent === "navigation/dismiss") {
    return {
      values: {
        opacity:    { value: 1, toValue: 0 },
        translateY: { value: 0, toValue: from.translateY as number },
        translateX: { value: 0, toValue: from.translateX as number },
        scale:      { value: 1, toValue: from.scale },
      },
      duration:    tokens.duration,
      easing:      rnEase,
      useSpring,
      ...(useSpring && { springConfig: { tension: 200, friction: 20 } }),
    }
  }

  return {
    values: {
      opacity:    { value: from.opacity,              toValue: 1 },
      translateY: { value: from.translateY as number, toValue: 0 },
      translateX: { value: from.translateX as number, toValue: 0 },
      scale:      { value: from.scale,                toValue: 1 },
    },
    duration: tokens.duration,
    easing:   rnEase,
    useSpring,
    ...(useSpring && { springConfig: { tension: 180, friction: 12 } }),
  }
}
