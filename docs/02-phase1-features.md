# Phase 1 Feature Breakdown

Phase 1 focuses on **definitions only**: mapping where symbols (classes, methods, properties, functions) are defined. **References** and **call hierarchy** (which method calls which) are deferred to Phase 2.

---

## Feature table

| Feature | Description |
|---------|-------------|
| **Manual Trigger** | A status bar button or Command Palette entry **"Mango: Generate Map"** starts the indexing job. No automatic scan on keystroke. |
| **Visual Hierarchy** | **Folder** → **Sub-folder** → **File** → **Class** → **Method/Property**. The tree is recursive and reflects workspace structure plus symbol nesting. |
| **Iconography** | Use VS Code’s **ThemeIcon** set: folder, file, and language-specific icons so the map is recognizable at a glance. |
| **Docblock Preview** | Hovering or clicking a method (or other documented symbol) shows a mini-panel with **PHPDoc** or **JSDoc** content. |
| **Active Navigation** | Clicking any element in the tree **opens the file** and **scrolls to the specific line/symbol** (e.g. method at line 42). |

---

## Scope summary

- **In scope for Phase 1:** Definitions (where classes, methods, properties, functions live); manual scan; tree view; docblock preview; go-to-line/symbol on click.
- **Out of scope for Phase 1:** References, call graphs, and “who calls this method” — those are Phase 2 goals.
