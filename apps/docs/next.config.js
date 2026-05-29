const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@motion-spec/tokens": path.resolve(__dirname, "../../packages/tokens/src/index.ts"),
      "@motion-spec/react":  path.resolve(__dirname, "../../packages/react/src/index.ts"),
    }
    return config
  },
}

module.exports = nextConfig
