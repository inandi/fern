/**
 * Generate Map Orchestrator
 *
 * Runs the full "Mango: Generate Map" flow: checks workspace, scans files via the scanner,
 * builds the tree with progress reporting, and returns the root nodes. Shows notifications
 * when no folder is open or no supported files are found.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import * as vscode from 'vscode';
import { TreeNode } from './types';
import { scanWorkspace } from './scanner';
import { buildTree } from './treeBuilder';

export async function runGenerateMap(): Promise<TreeNode[] | null> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders?.length) {
    vscode.window.showWarningMessage('Mango: Open a folder first.');
    return null;
  }

  return vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Mango',
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: 'Scanning workspace…' });
      const files = await scanWorkspace();
      if (files.length === 0) {
        vscode.window.showInformationMessage('Mango: No supported files found.');
        return [];
      }
      progress.report({ message: `Indexing ${files.length} files…` });
      const tree = await buildTree(files, (current, total, file) => {
        progress.report({ message: `[${current}/${total}] ${file}`, increment: (100 / total) * 0.1 });
      });
      return tree;
    }
  );
}
