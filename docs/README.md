# Project Mango — Design Documentation

**Project Mango** is a productivity extension for VS Code that turns a sprawling codebase into a clean, interactive map. It focuses on cross-file logic—especially in PHP—using filesystem traversal and Abstract Syntax Tree (AST) parsing.

The extension follows a **"Scan once, navigate often"** model: indexing is triggered manually (e.g. via "Mango: Generate Map"), and the resulting tree is used for fast navigation and docblock previews without re-parsing on every keystroke.

---

## Document index

Read in this order for a full design overview:

| Document | Description |
|----------|-------------|
| [01-architecture.md](01-architecture.md) | Core architecture: scan-once model, provider options (TreeDataProvider vs Webview), parser, and in-memory state. |
| [02-phase1-features.md](02-phase1-features.md) | Phase 1 feature breakdown: manual trigger, visual hierarchy, iconography, docblock preview, active navigation. |
| [03-data-flow.md](03-data-flow.md) | Data flow: Workspace Scanner → Symbol Extractor → UI Renderer, with a diagram. |
| [04-tree-structure.md](04-tree-structure.md) | Tree data shape (JSON) and supported file types for Phase 1 (PHP, JS, CSS/HTML). |
| [05-challenges-and-mitigations.md](05-challenges-and-mitigations.md) | Performance, deep linking, and Phase 2 ideas (references, call graphs, richer HTML/CSS). |
| [06-language-scope.md](06-language-scope.md) | Language and project scope: PHP first; Node, React, ASP, C++ planned; registry and extractor structure. |
