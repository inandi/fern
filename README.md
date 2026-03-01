<div align="center">
  <h1>Mango [Beta]</h1>
  <p><strong>Interactive Codebase Map</strong></p>
</div>

Tired of losing track of where classes and methods live? Mango turns your project into a clean, navigable map. **Scan once, navigate often.**

## What is Project Mango?

Project Mango is a VS Code extension that indexes your codebase and shows a tree of **folders → files → classes → methods**. It supports PHP (primary), JavaScript, HTML, and CSS. Click any symbol to open the file and jump to the line; hover for PHPDoc or JSDoc. The map lives in a dedicated tab so you can browse structure without leaving the editor.

## Why Use Mango?

- **See the Big Picture**: One view of folders, files, classes, and methods—no more hunting through tabs
- **Scan Once, Navigate Often**: Generate the map on demand; use it for fast navigation until you regenerate
- **PHP-First**: Built for Laravel, Magento, and plain PHP—classes, methods, properties, and docblocks
- **JS and More**: Functions and ES6 classes in `.js`; file-level visibility for HTML/CSS (Phase 1)
- **Docblock Preview**: Hover over a method or class to see its PHPDoc or JSDoc in a small panel
- **Click to Go**: Click any node to open the file and reveal the symbol at the correct line
- **Extensible**: Language scope is centralized; Node, React, ASP.NET, C++, and Python are planned

## Getting Started

### Installation

1. Open VS Code or Cursor
2. Go to the Extensions view
3. Search for **Project Mango** or **Mango**
4. Click Install

### First Steps

1. **Open a folder** that contains PHP, JS, HTML, or CSS files
2. Click **Mango: Generate Map** in the status bar (left) or run it from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P` → “Mango: Generate Map”)
3. Wait for indexing to finish (progress appears in the notification area)
4. The map opens in a new tab. Expand folders and files; click a class or method to open the file and go to that line. Hover for docblocks.

## How It Works

### Data Flow

1. **Workspace scan** – Finds `*.php`, `*.js`, `*.html`, `*.css` (and variants); skips `vendor`, `node_modules`, etc. by default
2. **Symbol extraction** – PHP is parsed with an AST (php-parser); JS uses regex for functions and classes. Each file yields a list of symbols (class, method, property, function) with line and optional doc
3. **Tree build** – Symbols are arranged into folder → file → class → method. The result is kept in memory and shown in the map tab
4. **Navigate** – Clicking a node opens the file and reveals the line; hovering shows the docblock

### Supported File Types (Phase 1)

| Type    | Extensions   | What’s extracted                          |
|---------|--------------|-------------------------------------------|
| PHP     | `.php`, `.phtml`, `.tpl` | Classes, methods, properties, top-level functions, PHPDoc |
| JS      | `.js`        | Functions, ES6 classes, methods           |
| HTML    | `.html`, `.htm` | File-level only (no ID/class expansion yet) |
| CSS     | `.css`       | File-level only                           |

Planned: Node.js, React, ASP.NET, C/C++, Python (see [docs/06-language-scope.md](docs/06-language-scope.md)).

### Design Docs

For architecture, Phase 1 features, data flow, tree structure, and challenges, see the [docs/](docs/) folder.

## Development

```bash
npm install
npm run compile
```

Press **F5** to launch the Extension Development Host. Open a folder with PHP or JS files, then run **Mango: Generate Map**.

## Support the Project

If Mango helps your workflow, you can support the project (no pressure):

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/igobinda)

## Need Help?

- **Design & scope**: See the [docs/](docs/) folder (architecture, language scope, tree structure)
- **Issues**: Found a bug or have an idea? Open an issue on GitHub
- **Repository**: [github.com/iNandi/mango](https://github.com/iNandi/mango)

## License

This project is licensed under the MIT License.

---

**Made with ❤️ by Gobinda Nandi**
