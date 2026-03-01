/**
 * Project Mango Extension Main Module
 *
 * VS Code extension for generating an interactive codebase map. Indexes PHP, JS, HTML, and CSS
 * (PHP primary); supports folder > file > class > method hierarchy, docblock preview, and
 * click-to-navigate. Operates on a "Scan once, navigate often" model.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import * as vscode from 'vscode';

import { createMangoMapPanel } from './webview/panel';
import { runGenerateMap } from './generateMap';

/**
 * Activates the extension: registers status bar item and "Mango: Generate Map" command.
 */
export function activate(context: vscode.ExtensionContext): void {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.command = 'mango.generateMap';
  statusBar.text = '$(map) Mango: Generate Map';
  statusBar.tooltip = 'Generate codebase map';
  statusBar.show();
  context.subscriptions.push(statusBar);

  context.subscriptions.push(
    vscode.commands.registerCommand('mango.generateMap', async () => {
      const tree = await runGenerateMap();
      if (tree && tree.length > 0) {
        createMangoMapPanel(context.extensionUri, tree);
      }
    })
  );
}

/** Called when the extension is deactivated. */
export function deactivate(): void {}
