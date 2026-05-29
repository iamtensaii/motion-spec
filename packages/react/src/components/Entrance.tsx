import React from "react"
import { Motion } from "./Motion"
import type { MotionProps } from "./Motion"

type EntranceVariant = "default" | "focus" | "hero" | "subtle" | "immediate"

interface EntranceProps extends Omit<MotionProps, "intent"> {
  intent?: EntranceVariant
}

/**
 * Animate an element entering a space.
 *
 * @example
 * <Entrance intent="focus">
 *   <Dialog>...</Dialog>
 * </Entrance>
 */
export function Entrance({ intent = "default", ...props }: EntranceProps) {
  return <Motion intent={`entrance/${intent}`} {...props} />
}
