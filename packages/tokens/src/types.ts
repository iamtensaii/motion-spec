export type MotionIntent =
  | "entrance/default"
  | "entrance/focus"
  | "entrance/hero"
  | "entrance/subtle"
  | "entrance/immediate"
  | "exit/default"
  | "exit/dismiss"
  | "exit/replace"
  | "exit/immediate"
  | "feedback/success"
  | "feedback/error"
  | "feedback/warning"
  | "feedback/loading"
  | "feedback/confirm"
  | "navigation/forward"
  | "navigation/back"
  | "navigation/lateral"
  | "navigation/modal"
  | "navigation/dismiss"
  | "stagger/list"
  | "stagger/grid"
  | "stagger/cascade"
  | "stagger/random"
  | "loading/skeleton"
  | "loading/spinner"
  | "loading/progress"
  | "loading/pulse"
  | "celebration/milestone"
  | "celebration/reward"
  | "celebration/subtle"

export interface MotionTokens {
  duration: number          // ms
  easing: string            // CSS cubic-bezier or named
  translateX?: string       // e.g. "8px" or "0→-8px"
  translateY?: string
  scale?: string            // e.g. "0.97→1" or "0.9→1.05→1"
  opacity?: string          // e.g. "0→1"
  iteration?: number | "infinite"
  staggerDelay?: number     // ms per child (stagger intents)
  maxStaggerDelay?: number  // ms total cap (stagger intents)
}

export interface ResolvedIntent {
  intent: MotionIntent
  tokens: MotionTokens
  reducedMotionTokens: MotionTokens
  cssClass: string          // e.g. "ms-entrance-focus"
  dataAttr: string          // e.g. "entrance/focus"
}

export type ReducedMotionMode = "auto" | "force-reduce" | "force-full"
