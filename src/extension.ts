import * as vscode from 'vscode';

import { createMangoMapPanel } from './webview/panel';
import { runGenerateMap } from './generateMap';

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
      if (tree) {
        createMangoMapPanel(context.extensionUri, tree);
      }
    })
  );
}

export function deactivate(): void {}
