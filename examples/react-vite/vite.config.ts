import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@motion-spec/tokens": path.resolve(__dirname, "../../packages/tokens/src/index.ts"),
      "@motion-spec/css":    path.resolve(__dirname, "../../packages/css/src/motion-spec.css"),
    },
  },
})
