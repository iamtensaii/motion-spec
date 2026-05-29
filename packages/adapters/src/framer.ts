/**
 * motion-spec → Framer Motion adapter
 *
 * Usage:
 *   import { motion } from "framer-motion"
 *   import { toFramerMotion } from "@motion-spec/adapters/framer"
 *
 *   const anim = toFramerMotion("entrance/focus")
 *   <motion.div {...anim}><Dialog /></motion.div>
 *
 *   // Or with AnimatePresence for exit:
 *   const anim = toFramerMotion("exit/dismiss")
 *   <motion.div exit={anim.animate} initial={anim.initial} animate={anim.animate} />
 */

import type { MotionIntent } from "@motion-spec/tokens"
import { getTokens, buildFromState, buildToState, msToS, parseEasing } from "./utils"

export interface FramerMotionProps {
  initial:    Record<string, number | string>
  animate:    Record<string, number | string>
  exit?:      Record<string, number | string>
  transition: {
    duration: number
    ease:     [number, number, number, number] | string
    delay?:   number
  }
}

export function toFramerMotion(
  intent: MotionIntent,
  options: { delay?: number } = {}
): FramerMotionProps {
  const tokens = getTokens(intent)
  const from   = buildFromState(tokens)
  const to     = buildToState(tokens)
  const easing = parseEasing(tokens.easing)

  const initial: Record<string, number | string> = { opacity: from.opacity }
  const animate: Record<string, number | string> = { opacity: to.opacity }

  if (from.translateY !== 0) { initial.y = from.translateY; animate.y = 0 }
  if (from.translateX !== 0) { initial.x = from.translateX; animate.x = 0 }
  if (from.scale !== 1)      { initial.scale = from.scale; animate.scale = 1 }

  // feedback/error — shake uses keyframes
  if (intent === "feedback/error") {
    return {
      initial:    { x: 0 },
      animate:    { x: [0, -6, 6, -4, 4, 0] },
      transition: { duration: msToS(tokens.duration), ease: "easeInOut" },
    }
  }

  // feedback/confirm — scale pulse
  if (intent === "feedback/confirm") {
    return {
      initial:    { scale: 1 },
      animate:    { scale: [1, 0.94, 1] },
      transition: { duration: msToS(tokens.duration), ease: easing },
    }
  }

  // celebration/subtle — scale bounce
  if (intent === "celebration/subtle") {
    return {
      initial:    { scale: 1 },
      animate:    { scale: [1, 1.08, 1] },
      transition: { duration: msToS(tokens.duration), ease: easing },
    }
  }

  // exit intents — flip from/to
  if (intent.startsWith("exit/") || intent === "navigation/dismiss") {
    return {
      initial:    animate,
      animate:    initial,
      exit:       initial,
      transition: {
        duration: msToS(tokens.duration),
        ease:     easing,
        ...(options.delay !== undefined && { delay: msToS(options.delay) }),
      },
    }
  }

  return {
    initial,
    animate,
    transition: {
      duration: msToS(tokens.duration),
      ease:     easing,
      ...(options.delay !== undefined && { delay: msToS(options.delay) }),
    },
  }
}

/**
 * Stagger helper — returns per-item delay for use in Framer Motion staggerChildren
 *
 * Usage:
 *   const { containerVariants, itemVariants } = toFramerStagger("stagger/list")
 *   <motion.ul variants={containerVariants} initial="hidden" animate="show">
 *     {items.map(i => <motion.li variants={itemVariants} />)}
 *   </motion.ul>
 */
export function toFramerStagger(intent: "stagger/list" | "stagger/grid" | "stagger/cascade" | "stagger/random") {
  const tokens = getTokens(intent)
  const staggerDelay = (tokens.staggerDelay ?? 40) / 1000

  return {
    containerVariants: {
      hidden: {},
      show:   { transition: { staggerChildren: staggerDelay } },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 8 },
      show:   { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] } },
    },
  }
}
