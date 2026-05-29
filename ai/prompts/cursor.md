# motion-spec prompt for Cursor

Add this to your `.cursorrules` file or system prompt:

```
When generating UI animations, use motion-spec semantics instead of raw CSS classes or inline durations.

Import components from @motion-spec/react:
  import { Entrance, Exit, Feedback, Stagger, Celebration } from "@motion-spec/react"

Use intent strings to communicate purpose:
  - entrance/focus    for dialogs, modals, alerts (demands attention)
  - entrance/default  for standard element mounting
  - exit/dismiss      for user-initiated closing
  - feedback/success  for positive outcomes
  - feedback/error    for failures (uses shake animation)
  - feedback/confirm  for button/action acknowledgement
  - navigation/modal  for sheets, drawers, overlays
  - navigation/forward / navigation/back for route transitions
  - stagger/list      for lists and feeds (40ms per item)
  - celebration/subtle for likes, saves, bookmarks

Full reference: https://raw.githubusercontent.com/iamtensaii/motion-spec/main/ai/llms.txt

Do NOT use:
  className="transition-all duration-300 ease-in-out"  ← no semantic meaning
  style={{ transition: "opacity 0.3s" }}               ← no semantic meaning

DO use:
  <Entrance intent="focus"><Dialog /></Entrance>
  <Feedback intent="success"><Toast>Done!</Toast></Feedback>
```
