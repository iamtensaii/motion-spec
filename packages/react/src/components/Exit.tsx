import React from "react"
import { Motion } from "./Motion"
import type { MotionProps } from "./Motion"

type ExitVariant = "default" | "dismiss" | "replace" | "immediate"

interface ExitProps extends Omit<MotionProps, "intent"> {
  intent?: ExitVariant
}

/**
 * Animate an element leaving a space.
 *
 * @example
 * <Exit intent="dismiss">
 *   <Toast>...</Toast>
 * </Exit>
 */
export function Exit({ intent = "default", ...props }: ExitProps) {
  return <Motion intent={`exit/${intent}`} {...props} />
}
