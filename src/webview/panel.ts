/**
 * Mango Map Webview Panel
 *
 * Creates and manages the Webview panel for the map tab. Renders the tree as a collapsible
 * hierarchy with icons, click-to-navigate (opens file and reveals line), and docblock
 * preview on hover. Reuses a single panel; postMessage setTree updates content when
 * generating a new map.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import * as vscode from 'vscode';
import { TreeNode } from '../types';

let currentPanel: vscode.WebviewPanel | undefined;

export function createMangoMapPanel(extensionUri: vscode.Uri, tree: TreeNode[]): void {
  const column = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;

  if (currentPanel) {
    currentPanel.reveal(column);
    currentPanel.webview.postMessage({ type: 'setTree', tree });
    return;
  }

  const panel = vscode.window.createWebviewPanel(
    'mangoMap',
    'Mango Map',
    column,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
    }
  );

  currentPanel = panel;
  panel.webview.html = getWebviewContent(panel.webview, extensionUri, tree);

  panel.webview.onDidReceiveMessage(
    async (message: { type: string; path?: string; line?: number }) => {
      if (message.type === 'navigate' && message.path && message.line) {
        const uri = vscode.Uri.file(message.path);
        const doc = await vscode.workspace.openTextDocument(uri);
        const editor = await vscode.window.showTextDocument(doc, { preview: false });
        const position = new vscode.Position(Math.max(0, message.line - 1), 0);
        editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
        editor.selection = new vscode.Selection(position, position);
      }
    },
    undefined,
    []
  );

  panel.onDidDispose(() => {
    currentPanel = undefined;
  });
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri, tree: TreeNode[]): string {
  const treeJson = JSON.stringify(tree);
  const script = `
    const vscode = acquireVsCodeApi();
    let treeData = ${treeJson};

    function getIcon(type) {
      const icons = {
        folder: '📁',
        file: '📄',
        class: '◇',
        method: '▸',
        property: '•',
        function: 'ƒ'
      };
      return icons[type] || '◦';
    }

    function renderNode(node, depth = 0) {
      const hasChildren = node.children && node.children.length > 0;
      const icon = getIcon(node.type);
      const line = node.line ? \` L\${node.line}\` : '';
      const el = document.createElement('div');
      el.className = 'node';
      el.dataset.path = node.path || '';
      el.dataset.line = (node.line || 0).toString();
      el.dataset.doc = (node.doc || '').replace(/"/g, '&quot;');
      el.style.paddingLeft = (depth * 12 + 8) + 'px';
      el.innerHTML = \`<span class="icon">\${icon}</span><span class="label">\${escapeHtml(node.label)}\${line}</span>\`;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (node.path && node.line) {
          vscode.postMessage({ type: 'navigate', path: node.path, line: node.line });
        } else if (node.path) {
          vscode.postMessage({ type: 'navigate', path: node.path, line: 1 });
        }
      });
      if (node.doc) {
        el.title = node.doc;
        el.addEventListener('mouseenter', () => showDoc(el, node.doc));
        el.addEventListener('mouseleave', () => hideDoc());
      }
      const wrap = document.createElement('div');
      wrap.className = 'node-wrap';
      wrap.appendChild(el);
      if (hasChildren) {
        const toggle = document.createElement('span');
        toggle.className = 'toggle';
        const children = document.createElement('div');
        children.className = 'children' + (depth < 2 ? ' open' : '');
        toggle.textContent = depth < 2 ? '▼' : '▶';
        toggle.style.marginLeft = '-16px';
        el.insertBefore(toggle, el.firstChild);
        node.children.forEach(c => children.appendChild(renderNode(c, depth + 1)));
        wrap.appendChild(children);
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          children.classList.toggle('open');
          toggle.textContent = children.classList.contains('open') ? '▼' : '▶';
        });
      }
      return wrap;
    }

    function escapeHtml(s) {
      const div = document.createElement('div');
      div.textContent = s;
      return div.innerHTML;
    }

    let docEl = null;
    function showDoc(sourceEl, doc) {
      if (docEl) docEl.remove();
      docEl = document.createElement('div');
      docEl.className = 'doc-preview';
      docEl.textContent = doc;
      document.body.appendChild(docEl);
      const rect = sourceEl.getBoundingClientRect();
      docEl.style.top = (rect.bottom + 4) + 'px';
      docEl.style.left = rect.left + 'px';
    }
    function hideDoc() {
      if (docEl) { docEl.remove(); docEl = null; }
    }

    window.addEventListener('message', (e) => {
      if (e.data.type === 'setTree') {
        treeData = e.data.tree;
        const container = document.getElementById('tree');
        container.innerHTML = '';
        treeData.forEach(node => container.appendChild(renderNode(node)));
      }
    });

    const container = document.getElementById('tree');
    treeData.forEach(node => container.appendChild(renderNode(node)));
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mango Map</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 12px;
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
    }
    h1 {
      margin: 0 0 12px 0;
      font-size: 1.1em;
      font-weight: 600;
      color: var(--vscode-editor-foreground);
    }
    .node-wrap { margin: 0; }
    .node {
      display: flex;
      align-items: center;
      padding: 2px 6px;
      cursor: pointer;
      border-radius: 4px;
      user-select: none;
    }
    .node:hover { background: var(--vscode-list-hoverBackground); }
    .icon { margin-right: 6px; opacity: 0.9; }
    .label { flex: 1; }
    .toggle { cursor: pointer; font-size: 0.7em; padding: 0 4px; }
    .children { display: none; }
    .children.open { display: block; }
    .doc-preview {
      position: fixed;
      max-width: 360px;
      padding: 10px 12px;
      background: var(--vscode-editorWidget-background);
      border: 1px solid var(--vscode-widget-border);
      border-radius: 6px;
      font-size: 12px;
      white-space: pre-wrap;
      word-break: break-word;
      z-index: 1000;
      box-shadow: var(--vscode-widget-shadow);
    }
  </style>
</head>
<body>
  <h1>Map</h1>
  <div id="tree"></div>
  <script>${script}</script>
</body>
</html>`;
}
