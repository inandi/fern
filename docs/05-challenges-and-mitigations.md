# Challenges and Mitigations

Anticipated risks for Phase 1 and how to handle them, plus a short Phase 2 outlook.

---

## Performance

**Challenge:** Large PHP projects (e.g. Laravel, Magento) can have thousands of files. Scanning and parsing everything can be slow and block the UI.

**Mitigations:**

- **Loading / progress indicator** — Show a progress bar or “Indexing…” state so the user knows the extension is working.
- **Default exclusions** — Skip folders like `vendor`, `node_modules`, and similar by default; allow the user to customize exclusions later if needed.
- **Scan once, navigate often** — Avoid re-indexing on every keystroke; only index when the user runs “Mango: Generate Map” (or an equivalent trigger).

---

## Deep linking

**Challenge:** Tracking “where everything goes”—call hierarchies, references, who calls which method—is complex and requires more than definition parsing.

**Approach:**

- **Phase 1:** Map **definitions** only (where classes and methods are defined). Clicking a node opens the file and goes to that line. No reference or call-graph data yet.
- **Phase 2:** Introduce **references** and **call hierarchy** (which method calls which), possibly with a different UX (e.g. “Find references”, “Call graph”).

---

## Phase 2 ideas

A brief roadmap beyond Phase 1:

- **References** — Show or navigate to where a symbol is used across the codebase.
- **Call graphs / call hierarchy** — “Which methods call this?” and “What does this method call?”
- **CSS/HTML expansion** — Show IDs and classes inside CSS and HTML files in the tree.
- **Persistence** — Optional: cache the tree to disk so reopening the workspace can show the last map until the user regenerates it.

These stay out of scope for Phase 1 but help keep the design document useful as a lightweight roadmap.
