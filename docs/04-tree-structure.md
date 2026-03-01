# Tree Structure and File Types

The parser produces a **JSON-like tree** that the UI consumes. This document defines the data shape and the file types supported in Phase 1.

---

## Data shape

Each node has:

- **label** — Display name (e.g. file name, class name, `methodName()`).
- **type** — One of: `file`, `class`, `method`, `property`, or folder-level types as needed.
- **doc** — Optional; PHPDoc or JSDoc content for classes/methods.
- **line** — Optional; 1-based line number for navigation.
- **children** — Optional; array of child nodes (recursive).

Example from the blueprint:

```json
{
  "label": "UserController.php",
  "type": "file",
  "children": [
    {
      "label": "UserController",
      "type": "class",
      "doc": "Handles user authentication",
      "children": [
        { "label": "login()", "type": "method", "line": 42 }
      ]
    }
  ]
}
```

This structure is **what the parser outputs** and **what the UI renders** (sidebar or Webview). Keeping it consistent keeps the UI responsive and the design clear.

---

## Supported file types (Phase 1)

Driven by the **language scope registry** (see [06-language-scope.md](06-language-scope.md)). Active scopes:

| Language / extension | Extracted in Phase 1 | Notes |
|----------------------|----------------------|--------|
| **PHP / PHTML / TPL** | Class names, methods, variables (properties) | Primary focus; use AST (e.g. php-parser) for classes, methods, docblocks. |
| **JS** | Functions, ES6 classes (and their methods) | AST or regex for `function`, `class`, method definitions. |
| **CSS / HTML** | File-level only | Show the file as a single node; no ID/class expansion in Phase 1. |

Node, React, ASP.NET, and C/C++ are scoped for later; the structure is set up so they can be added by registering a scope and an extractor.
