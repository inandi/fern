---
name: Project Mango Design Docs
overview: Create design-phase documentation in a `docs/` folder that captures Project Mango's architecture, Phase 1 features, data flow, technical specs, and risks—without writing any extension code.
todos: []
isProject: false
---

# Project Mango: Design Documentation Plan

## Goal

Add design documentation under a new `**docs/**` folder so the blueprint (architecture, features, data flow, tree structure, file types, challenges) is captured before implementation. No code or extension scaffolding—design phase only.

---

## Documentation to Create

### 1. [docs/README.md](docs/README.md) — Docs index

- Short intro to Project Mango and the “Scan once, navigate often” idea.
- List of documents with one-line descriptions and suggested reading order.

### 2. [docs/01-architecture.md](docs/01-architecture.md) — Core architecture

- **Model:** “Scan once, navigate often” (index on demand, not on every keystroke).
- **Provider options:** `vscode.TreeDataProvider` (sidebar) vs **Webview Panel** (dedicated tab); note recommendation to use Webview for a “Mango-flavored” UI.
- **Parser:** JS-based PHP parsing (e.g. `php-parser`), extracting classes, methods, docblocks without executing code.
- **State:** In-memory JSON-like tree for the session; no persistence requirement for Phase 1.
- Optional: simple diagram (e.g. Mermaid) of components: Workspace → Scanner → Parser → State → UI.

### 3. [docs/02-phase1-features.md](docs/02-phase1-features.md) — Phase 1 feature breakdown

Table or list derived from the blueprint:


| Feature           | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| Manual Trigger    | Status bar button or Command Palette: “Mango: Generate Map” to start indexing. |
| Visual Hierarchy  | Folder → Sub-folder → File → Class → Method/Property.                          |
| Iconography       | VS Code `ThemeIcon` (folder, file, language-specific).                         |
| Docblock Preview  | Hover/click on method shows mini-panel with PHPDoc/JSDoc.                      |
| Active Navigation | Click tree node → open file and go to line/symbol.                             |


Keep scope explicit: definitions only in Phase 1; references/call hierarchy deferred to Phase 2.

### 4. [docs/03-data-flow.md](docs/03-data-flow.md) — Data flow

- Step-by-step flow:
  1. **Workspace Scanner** — iterate `*.php`, `*.js`, `*.html`, etc.
  2. **Symbol Extractor** — regex or AST for `class User`, `function save()`, etc.
  3. **UI Renderer** — map symbols to recursive tree view.
- One Mermaid diagram (flowchart or sequence) for: User action → Generate Map → Scanner → Extractor → Tree state → Renderer.

### 5. [docs/04-tree-structure.md](docs/04-tree-structure.md) — Tree structure and file types

- **Data shape:** Document the JSON tree (label, type, doc, line, children) with the exact example from the blueprint (file → class → method).
- **Supported file types (Phase 1):**
  - **PHP/PHTML/TPL:** Class names, methods, variables.
  - **JS:** Functions and ES6 classes.
  - **CSS/HTML:** File-level only (IDs/classes as Phase 2).
- Mention that this structure is what the parser produces and the UI consumes.

### 6. [docs/05-challenges-and-mitigations.md](docs/05-challenges-and-mitigations.md) — Risks and mitigations

- **Performance:** Large codebases (Laravel, Magento); loading/progress indicator; default exclusions (e.g. `vendor`).
- **Deep linking:** Phase 1 = definitions only; Phase 2 = references/call hierarchy.
- Brief “Phase 2 ideas” subsection (references, call graphs, CSS/HTML ID/class expansion) so the doc doubles as a lightweight roadmap.

---

## File and folder layout

```
mango/
  README.md          (existing)
  docs/
    README.md
    01-architecture.md
    02-phase1-features.md
    03-data-flow.md
    04-tree-structure.md
    05-challenges-and-mitigations.md
```

---

## Out of scope (per your note)

- No `extension.ts`, `package.json`, or any VS Code extension code.
- No implementation details beyond what’s needed to make the design clear (e.g. “use a Webview” is a design choice; “how to implement Webview” is implementation).

After you approve this plan, the next step is to add the `docs/` folder and the six markdown files with the content outlined above.