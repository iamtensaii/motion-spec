/**
 * motion-spec + GSAP
 * Run: requires gsap installed — npm i gsap
 */
import gsap from "gsap"
import { toGSAPArgs, toGSAPStagger } from "@motion-spec/adapters/gsap"

// ─── Entrance ────────────────────────────────────────────────────────────────

const dialog = document.querySelector(".dialog")!
gsap.fromTo(dialog, ...toGSAPArgs("entrance/focus"))

// ─── Feedback ─────────────────────────────────────────────────────────────────

const form = document.querySelector("form")!
form.addEventListener("submit", async () => {
  const result = await submitForm()

  if (result.ok) {
    const toast = document.querySelector(".toast")!
    gsap.fromTo(toast, ...toGSAPArgs("feedback/success"))
  } else {
    const banner = document.querySelector(".error")!
    gsap.fromTo(banner, ...toGSAPArgs("feedback/error"))
  }
})

// ─── Stagger list ─────────────────────────────────────────────────────────────

const items = document.querySelectorAll(".list-item")
gsap.from(items, toGSAPStagger("stagger/list"))

// ─── Timeline ─────────────────────────────────────────────────────────────────

const tl = gsap.timeline()

// Hero entrance, then stagger the content below it
tl.fromTo(".hero",    ...toGSAPArgs("entrance/hero"))
  .from(".card-list", toGSAPStagger("stagger/grid"), "-=0.3")

// ─── Exit on dismiss ──────────────────────────────────────────────────────────

document.querySelector(".close-btn")!.addEventListener("click", () => {
  gsap.fromTo(".modal", ...toGSAPArgs("exit/dismiss"))
})

// stub
async function submitForm(): Promise<{ ok: boolean }> { return { ok: true } }
