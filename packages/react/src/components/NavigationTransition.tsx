import React from "react"
import { Motion } from "./Motion"
import type { MotionProps } from "./Motion"

type NavigationVariant = "forward" | "back" | "lateral" | "modal" | "dismiss"

interface NavigationTransitionProps extends Omit<MotionProps, "intent"> {
  intent: NavigationVariant
}

/**
 * Animate a navigation transition between views.
 *
 * @example
 * <NavigationTransition intent="forward">
 *   <DetailPage />
 * </NavigationTransition>
 *
 * <NavigationTransition intent="modal">
 *   <Sheet>...</Sheet>
 * </NavigationTransition>
 */
export function NavigationTransition({ intent, ...props }: NavigationTransitionProps) {
  return <Motion intent={`navigation/${intent}`} {...props} />
}
