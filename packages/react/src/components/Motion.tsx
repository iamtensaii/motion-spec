import React, { useEffect, useRef, CSSProperties } from "react"
import { resolveIntent, intentToCssVars } from "@motion-spec/tokens"
import type { MotionIntent, ReducedMotionMode } from "@motion-spec/tokens"

export interface MotionProps {
  intent: MotionIntent
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  reducedMotion?: ReducedMotionMode
  as?: keyof JSX.IntrinsicElements
}

/**
 * The base motion-spec component. All semantic components build on this.
 *
 * Usage (copy this file into your project):
 *   <Motion intent="entrance/focus"><Dialog /></Motion>
 */
export function Motion({
  intent,
  children,
  className,
  style,
  delay,
  duration,
  reducedMotion = "auto",
  as: Tag = "div",
}: MotionProps) {
  const ref = useRef<HTMLElement>(null)

  const resolved = resolveIntent(intent, {
    reducedMotion,
    delay,
    durationOverride: duration,
  })

  const cssVars = intentToCssVars(intent) as Record<string, string>

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.animationPlayState = "paused"
    // Force a reflow so the animation restarts cleanly on re-mount
    void el.offsetHeight
    el.style.animationPlayState = "running"
  }, [intent])

  return (
    // @ts-ignore — dynamic tag
    <Tag
      ref={ref}
      className={[resolved.cssClass, className].filter(Boolean).join(" ")}
      data-motion={resolved.dataAttr}
      style={{ ...cssVars, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
