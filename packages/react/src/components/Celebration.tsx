import React from "react"
import { Motion } from "./Motion"
import type { MotionProps } from "./Motion"

type CelebrationVariant = "milestone" | "reward" | "subtle"

interface CelebrationProps extends Omit<MotionProps, "intent"> {
  intent?: CelebrationVariant
}

/**
 * Animate a significant moment — achievement, reward, or delight.
 *
 * @example
 * <Celebration intent="milestone">
 *   <OnboardingComplete />
 * </Celebration>
 *
 * <Celebration intent="subtle">
 *   <HeartIcon />
 * </Celebration>
 */
export function Celebration({ intent = "subtle", ...props }: CelebrationProps) {
  return <Motion intent={`celebration/${intent}`} {...props} />
}
