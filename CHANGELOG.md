# Release v1.1.2 - 2026-03-01

## New Features
- **Mango: Generate Map** command and status bar entry to trigger indexing on demand.
- **Interactive map tab** (Webview): folder → file → class → method tree with expand/collapse.
- **Workspace scanner** using the language registry: glob patterns and exclusions (e.g. `vendor`, `node_modules`) for PHP, JS, HTML, and CSS.
- **PHP symbol extraction** (AST via php-parser): classes, methods, properties, top-level functions, and PHPDoc from `.php`, `.phtml`, `.tpl`.
- **JavaScript symbol extraction** (regex): functions, ES6 classes, and methods from `.js`.
- **HTML/CSS** file-level visibility (`.html`, `.htm`, `.css`) with no ID/class expansion in Phase 1.
- **Docblock preview** on hover for classes and methods (PHPDoc/JSDoc in a small panel).
- **Click-to-navigate**: open file and reveal symbol at the correct line from any tree node.
- **Progress notification** during indexing with file count and current file path.
- **Language scope registry**: active scopes (PHP, JS, HTML, CSS); planned scopes (Node, React, ASP.NET, C/C++, Python) for future extractors.

## Improvements
- Initial release (v1.1.1). Scan-once, navigate-often model; single panel reuse when generating a new map.

---

