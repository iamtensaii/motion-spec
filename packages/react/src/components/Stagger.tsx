import React, { Children, cloneElement, isValidElement, CSSProperties } from "react"
import { resolveIntent } from "@motion-spec/tokens"

type StaggerVariant = "list" | "grid" | "cascade" | "random"

interface StaggerProps {
  intent?: StaggerVariant
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

/**
 * Choreograph a group of children entering in sequence.
 *
 * @example
 * <Stagger intent="list">
 *   {items.map(item => <Card key={item.id} {...item} />)}
 * </Stagger>
 */
export function Stagger({ intent = "list", children, className, as: Tag = "div" }: StaggerProps) {
  const resolved = resolveIntent(`stagger/${intent}`)
  const { staggerDelay = 40, maxStaggerDelay = 400 } = resolved.tokens

  return (
    // @ts-ignore — dynamic tag
    <Tag className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        const delay = Math.min(index * staggerDelay, maxStaggerDelay)
        return (
          <StaggerItem delay={delay}>
            {child}
          </StaggerItem>
        )
      })}
    </Tag>
  )
}

interface StaggerItemProps {
  delay: number
  children: React.ReactNode
}

/** Internal wrapper for each stagger child. Can also be used standalone. */
export function StaggerItem({ delay, children }: StaggerItemProps) {
  return (
    <div
      className="ms-stagger-item"
      data-motion="stagger/item"
      style={{ "--ms-stagger-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
