/**
 * Extractors Index / Dispatcher
 *
 * Dispatches symbol extraction by file extension using the language registry. Converts
 * raw SymbolInfo arrays into TreeNode arrays with class nesting (symbolsToTree). Exports
 * extractSymbols and extractFileAsNode for use by the tree builder. PHP and JS active;
 * Node, React, ASP, C++, Python planned.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import { TreeNode } from '../types';
import { SymbolInfo } from './symbols';
import { getExtractorKeyForExtension } from '../languages';
import type { ScannedFile } from '../scanner';
import { extractPHP } from './php';
import { extractJS } from './js';

export type { SymbolInfo } from './symbols';

function symbolsToTree(symbols: SymbolInfo[], filePath: string): TreeNode[] {
  const children: TreeNode[] = [];
  let classNode: TreeNode | null = null;
  for (const s of symbols) {
    if (s.type === 'class') {
      classNode = { label: s.label, type: 'class', line: s.line, path: filePath, children: [] };
      if (s.doc) classNode.doc = s.doc;
      children.push(classNode);
    } else if ((s.type === 'method' || s.type === 'property') && classNode?.children) {
      classNode.children.push({
        label: s.label,
        type: s.type,
        line: s.line,
        path: filePath,
        doc: s.doc,
      });
    } else {
      children.push({
        label: s.label,
        type: s.type,
        line: s.line,
        path: filePath,
        doc: s.doc,
      });
    }
  }
  return children;
}

export async function extractSymbols(file: ScannedFile): Promise<TreeNode[]> {
  const path = file.uri.fsPath;
  const key = getExtractorKeyForExtension(file.ext);
  if (!key || key === 'file-only') return [];

  if (key === 'php') {
    const symbols = await extractPHP(file.uri);
    return symbolsToTree(symbols, path);
  }
  if (key === 'js') {
    const symbols = await extractJS(file.uri);
    return symbolsToTree(symbols, path);
  }
  // When Node, React, ASP, C++, Python are added: dispatch to the corresponding extractor.
  return [];
}

export async function extractFileAsNode(file: ScannedFile): Promise<TreeNode> {
  const path = file.uri.fsPath;
  const name = file.relativePath.split(/[/\\]/).pop() ?? path;
  const key = getExtractorKeyForExtension(file.ext);

  if (!key || key === 'file-only') {
    return { label: name, type: 'file', path, children: [] };
  }

  const children = await extractSymbols(file);
  return { label: name, type: 'file', path, children: children.length ? children : undefined };
}
