# motion-spec for Claude Code

Add to your `CLAUDE.md`:

```markdown
## Animation

Use motion-spec semantics for all UI animations.

```bash
npx motion-spec add entrance
npx motion-spec add feedback  
npx motion-spec add stagger
```

Intent reference:
- entrance/focus    → dialogs, modals, anything demanding attention
- entrance/default  → standard component mounting
- exit/dismiss      → toast dismissal, card removal
- feedback/success  → form submit, payment, save confirmed
- feedback/error    → validation failure, API error (horizontal shake)
- feedback/confirm  → button press acknowledgement (scale pulse)
- navigation/modal  → sheets, drawers, overlays
- stagger/list      → any list or feed of items
- celebration/subtle → likes, saves, reactions

Full spec: spec/v1/vocabulary.md
```
