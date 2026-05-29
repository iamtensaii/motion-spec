/**
 * motion-spec + Framer Motion
 * Run: already works if you have framer-motion installed
 */
import { motion, AnimatePresence } from "framer-motion"
import { toFramerMotion, toFramerStagger } from "@motion-spec/adapters/framer"

// ─── Entrance ────────────────────────────────────────────────────────────────

export function Dialog({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...toFramerMotion("entrance/focus")}
          exit={toFramerMotion("exit/dismiss").animate}
          className="dialog"
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export function SuccessToast() {
  return (
    <motion.div {...toFramerMotion("feedback/success")}>
      ✓ Payment complete
    </motion.div>
  )
}

export function ErrorBanner() {
  return (
    <motion.div {...toFramerMotion("feedback/error")}>
      Something went wrong
    </motion.div>
  )
}

// ─── Stagger list ─────────────────────────────────────────────────────────────

export function Feed({ items }: { items: string[] }) {
  const { containerVariants, itemVariants } = toFramerStagger("stagger/list")

  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="show">
      {items.map(item => (
        <motion.li key={item} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export function PageForward({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...toFramerMotion("navigation/forward")}>
      {children}
    </motion.div>
  )
}

// ─── Celebration ──────────────────────────────────────────────────────────────

export function MilestoneReached() {
  return (
    <motion.div {...toFramerMotion("celebration/milestone")}>
      🎉 Onboarding complete!
    </motion.div>
  )
}
