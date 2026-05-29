import "@motion-spec/css"
import { useState } from "react"

/**
 * Self-contained proof-of-concept demo.
 * Shows all major intents working in a real Vite + React app.
 * Run: npm install && npm run dev
 */
export default function App() {
  const [count, setCount] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [feedbackKey, setFeedbackKey] = useState(0)
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null)

  function triggerFeedback(type: "success" | "error") {
    setFeedback(type)
    setFeedbackKey(k => k + 1)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#fafafa", padding: "48px 24px", fontFamily: "system-ui" }}>
      <div data-motion="entrance/hero" style={{ maxWidth: 600, margin: "0 auto" }}>

        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>motion-spec demo</h1>
        <p style={{ color: "#a1a1aa", marginBottom: 48 }}>Every intent, running live in React + Vite.</p>

        {/* Entrance variants */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", marginBottom: 16 }}>Entrance</h2>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            {(["default", "focus", "subtle", "hero"] as const).map((v, i) => (
              <div
                key={v}
                data-motion={`entrance/${v}`}
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: "16px",
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <p style={{ fontSize: 12, color: "#6366f1", marginBottom: 4, fontFamily: "monospace" }}>entrance/{v}</p>
                <p style={{ fontSize: 14, color: "#d4d4d8" }}>Element arriving</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", marginBottom: 16 }}>Feedback</h2>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <button
              onClick={() => triggerFeedback("success")}
              style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}
            >
              Trigger success
            </button>
            <button
              onClick={() => triggerFeedback("error")}
              style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}
            >
              Trigger error
            </button>
          </div>
          {feedback && (
            <div
              key={feedbackKey}
              data-motion={`feedback/${feedback}`}
              style={{
                background: feedback === "success" ? "#14532d" : "#450a0a",
                border: `1px solid ${feedback === "success" ? "#16a34a" : "#dc2626"}`,
                borderRadius: 12,
                padding: "16px 20px",
                fontFamily: "monospace",
                fontSize: 14,
              }}
            >
              feedback/{feedback} ← {feedback === "success" ? "spring bounce" : "horizontal shake"}
            </div>
          )}
        </section>

        {/* Stagger */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", marginBottom: 16 }}>Stagger list</h2>
          <div>
            {["First item", "Second item", "Third item", "Fourth item", "Fifth item"].map((item, i) => (
              <div
                key={item}
                className="ms-stagger-item"
                style={{
                  "--ms-stagger-delay": `${i * 40}ms`,
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 8,
                  fontSize: 14,
                  color: "#d4d4d8",
                } as React.CSSProperties}
              >
                {item} — delay {i * 40}ms
              </div>
            ))}
          </div>
        </section>

        {/* Celebration */}
        <section>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", marginBottom: 16 }}>Celebration</h2>
          <button
            onClick={() => setCount(c => c + 1)}
            data-motion="feedback/confirm"
            style={{
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Click me ({count})
          </button>
          {count >= 5 && (
            <div
              key={count}
              data-motion="celebration/milestone"
              style={{
                marginTop: 16,
                background: "#1e1b4b",
                border: "1px solid #6366f1",
                borderRadius: 12,
                padding: "20px",
                textAlign: "center",
              }}
            >
              🎉 celebration/milestone — you made it to {count}!
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
