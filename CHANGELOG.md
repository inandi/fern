# Release v2.1.1 - 2026-04-07

## Improvements
- Expanded release automation to publish to both Visual Studio Marketplace and Open VSX Registry.
- Added package metadata updates to support preview publishing mode.

## Bug Fixes
- Added release-time validation against `package.json` to prevent publishing with mismatched metadata.
- Improved error handling when required publishing tokens are missing.

---

# Release v1.1.5 - 2026-03-01

## Improvements
- **Rebrand to Fern**: Project name updated from Mango to **Fern** across the codebase and documentation.
- **Version**: Bumped to **v1.1.5** (package.json, package-lock.json).
- **Commands and UI**: Command id set to `fern.generateMap`; status bar and Command Palette title set to "Fern: Generate Map"; webview panel title set to "Fern Map".
- **Code**: Extension module header, webview panel function (`createFernMapPanel`), and all user-facing messages (generateMap) now use Fern.
- **Docs**: README, docs index, architecture, phase 1 features, data flow, and challenges docs updated to Fern; repository link set to github.com/iNandi/fern.

---

# Release v1.1.4 - 2026-03-01

## Improvements

- **Package identity**: Renamed package to `mango-inandi` and set version to **v1.1.3** (package.json, package-lock.json).
- **.gitignore**: Removed duplicate entries; improved exclusion patterns for OS files and logs; consistent handling of Cursor directory.
- **Project setup**: Added LICENSE, CHANGELOG.md, release management files (release.md, release.sh, samples), and `.publish-secrets.sample`; introduced `.vscodeignore` for publishing.
- **README**: Expanded with installation steps, first steps, and usage instructions.
- **Documentation**: File-header comments and JSDoc added across all TypeScript modules (extension, scanner, types, generateMap, treeBuilder, extractors, languages, webview panel).

---

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

