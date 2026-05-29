/**
 * motion-spec + Anime.js
 * Run: requires animejs — npm i animejs
 */
import anime from "animejs"
import { toAnime, toAnimeStagger } from "@motion-spec/adapters/anime"

// ─── Entrance ────────────────────────────────────────────────────────────────

anime({ targets: ".dialog",  ...toAnime("entrance/focus") })
anime({ targets: ".sidebar", ...toAnime("entrance/subtle") })
anime({ targets: ".hero",    ...toAnime("entrance/hero") })

// ─── Feedback ─────────────────────────────────────────────────────────────────

// Success spring
anime({ targets: ".success-banner", ...toAnime("feedback/success") })

// Error shake
anime({ targets: ".error-field", ...toAnime("feedback/error") })

// Button press confirm
document.querySelector("button")?.addEventListener("click", (e) => {
  anime({ targets: e.currentTarget, ...toAnime("feedback/confirm") })
})

// ─── Stagger ──────────────────────────────────────────────────────────────────

// Feed items
anime({ targets: ".feed-item", ...toAnimeStagger("stagger/list") })

// Card grid
anime({ targets: ".card", ...toAnimeStagger("stagger/grid") })

// ─── Navigation ───────────────────────────────────────────────────────────────

// Page forward
anime({ targets: ".page-enter", ...toAnime("navigation/forward") })

// Sheet modal
anime({ targets: ".sheet", ...toAnime("navigation/modal") })

// Close sheet
document.querySelector(".close")?.addEventListener("click", () => {
  anime({ targets: ".sheet", ...toAnime("navigation/dismiss") })
})

// ─── Celebration ──────────────────────────────────────────────────────────────

anime({ targets: ".milestone-badge", ...toAnime("celebration/milestone") })

// Subtle like button
document.querySelector(".like-btn")?.addEventListener("click", (e) => {
  anime({ targets: e.currentTarget, ...toAnime("celebration/subtle") })
})
