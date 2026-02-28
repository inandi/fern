# Language and Project Scope

The extension is scoped by **language** and **project type**. Support is structured so that adding a new stack is a matter of registering a scope and implementing (or plugging in) an extractor.

---

## Current scope (active)

| Scope   | Primary use       | Extensions        | Extractor   |
|---------|-------------------|-------------------|-------------|
| **PHP** | Laravel, Magento, etc. | `.php`, `.phtml`, `.tpl` | AST (php-parser); classes, methods, properties, docblocks |
| **JavaScript** | Scripts, legacy JS | `.js` | Regex; functions, ES6 classes, methods |
| **HTML** | Markup            | `.html`, `.htm`   | File-level only |
| **CSS**  | Styles            | `.css`            | File-level only |

**PHP is the primary focus** for Phase 1. JS, HTML, and CSS are supported at the level above; deeper extraction (e.g. HTML IDs/classes) is Phase 2.

---

## Planned scope (later)

These are **registered in the language registry** with status `planned`. Enabling one means implementing its extractor and setting status to `active`.

| Scope    | Typical projects   | Extensions (planned)     | Notes |
|----------|---------------------|---------------------------|--------|
| **Node.js** | Backend, tooling   | `.js`, `.mjs`, `.cjs`     | Modules, exports; may overlap or replace current JS scope |
| **React**   | Front-end SPA      | `.jsx`, `.tsx`, `.js`, `.ts` | Components, hooks |
| **ASP.NET** | Web API, MVC, Blazor | `.cs`, `.cshtml`, `.razor` | C# types, Razor components |
| **C/C++**   | Native, embedded   | `.c`, `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp` | Functions, classes, namespaces |
| **Python**  | Scripts, Django, Flask, etc. | `.py`, `.pyi` | Classes, functions, docstrings; stubs for type hints |

Exclusions (e.g. `node_modules`, `vendor`, `__pycache__`, `.venv`, `bin/obj`, `build/out`) are defined per scope in the registry.

---

## Code structure

- **`src/languages/`** — Language scope types and registry. Add or edit entries in `registry.ts`; scanner and extractors use `getGlobPatterns()`, `getExclusions()`, and `getExtractorKeyForExtension()`.
- **`src/extractors/`** — One module per extractor (e.g. `php.ts`, `js.ts`). The main `index.ts` dispatches by extractor key; when adding Node, React, ASP, C++, or Python, add a new extractor and a branch in `extractSymbols()` / `extractFileAsNode()` (or a shared dispatcher).
- **`src/scanner.ts`** — Uses the language registry for glob patterns and exclusions only; no hard-coded file lists.

Adding a new language or project type: (1) add or update the scope in `languages/registry.ts`, (2) implement the extractor in `extractors/<key>.ts`, (3) wire the key in `extractors/index.ts`.
