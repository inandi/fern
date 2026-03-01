/**
 * Workspace Scanner Module
 *
 * Iterates the workspace for relevant file types using the language registry. Produces
 * a list of ScannedFile entries with uri, relativePath, and ext. Exclusions (e.g. vendor,
 * node_modules) come from the registry.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { getGlobPatterns, getExclusions } from './languages';

export interface ScannedFile {
  uri: vscode.Uri;
  relativePath: string;
  ext: string;
}

/**
 * Iterates workspace for relevant file types from the language registry.
 * Exclusions (e.g. vendor, node_modules) come from the registry.
 */
export async function scanWorkspace(): Promise<ScannedFile[]> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders?.length) {
    return [];
  }

  const patterns = getGlobPatterns();
  const excludes = getExclusions();
  const excludePattern = `{${excludes.join(',')}}`;

  const files: ScannedFile[] = [];
  const rootFs = workspaceFolders[0].uri.fsPath;

  for (const pattern of patterns) {
    const found = await vscode.workspace.findFiles(pattern, excludePattern);
    for (const uri of found) {
      const relativePath = path.relative(rootFs, uri.fsPath);
      const ext = path.extname(uri.fsPath).toLowerCase();
      files.push({ uri, relativePath, ext });
    }
  }

  return files;
}
