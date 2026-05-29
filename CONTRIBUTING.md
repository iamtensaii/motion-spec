# Contributing to motion-spec

Thank you for contributing. motion-spec grows through community additions — new intents, new platform adapters, better token values.

## What you can contribute

- **New intents** — Propose new semantic intents with clear use cases (`spec/v1/vocabulary.md`)
- **Platform adapters** — Add output for new runtimes (React Native, Vue, Svelte, SwiftUI, Jetpack Compose)
- **Token refinements** — Better duration/easing values backed by UX research
- **Examples** — Real apps using motion-spec
- **Docs** — Clearer explanations, more use cases

## How to contribute

1. Fork and clone the repo
2. Install dependencies: `pnpm install`
3. Create a branch: `git checkout -b feat/your-intent-name`
4. Make changes
5. Run checks: `pnpm typecheck && pnpm lint`
6. Open a PR with a clear description

## Adding a new intent

1. Add the intent to `spec/v1/vocabulary.md` with:
   - Intent name (`category/variant`)
   - Description
   - When to use
   - Token profile (duration, easing, transforms)

2. Add token values to `spec/v1/tokens.json`

3. Update `spec/v1/schema.json` enum

4. Implement in `packages/tokens/src/intents/`

5. Add React component in `packages/react/src/components/`

6. Add CSS keyframes in `packages/css/src/`

## Code style

- TypeScript for all packages
- Tailwind CSS for the docs site
- No default exports — named exports only
- Every public API needs JSDoc

## Commit format

```
feat(intent): add celebration/confetti
fix(react): correct stagger delay calculation
docs(spec): clarify navigation/modal use case
```

## Need help?

Open a GitHub Discussion — not an Issue — for questions.
Issues are for confirmed bugs and accepted proposals only.
