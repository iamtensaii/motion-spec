import React from "react"
import { Motion } from "./Motion"
import type { MotionProps } from "./Motion"

type FeedbackVariant = "success" | "error" | "warning" | "loading" | "confirm"

interface FeedbackProps extends Omit<MotionProps, "intent"> {
  intent: FeedbackVariant
}

/**
 * Animate a response to a user action.
 *
 * @example
 * <Feedback intent="success">
 *   <Toast>Payment complete</Toast>
 * </Feedback>
 *
 * <Feedback intent="error">
 *   <Banner>Something went wrong</Banner>
 * </Feedback>
 */
export function Feedback({ intent, ...props }: FeedbackProps) {
  return <Motion intent={`feedback/${intent}`} {...props} />
}
