/**
 * JavaScript Symbol Extractor
 *
 * Extracts functions and ES6 classes (and their methods) from JS files via line-based
 * regex. Phase 1 only; no full AST. Returns SymbolInfo[] for consumption by the
 * extractors index. Handles .js (via registry).
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import * as vscode from 'vscode';
import { SymbolInfo } from './symbols';

/**
 * Extract functions and ES6 classes (and their methods) via regex. Phase 1 only.
 */
export async function extractJS(uri: vscode.Uri): Promise<SymbolInfo[]> {
  const doc = await vscode.workspace.openTextDocument(uri);
  const text = doc.getText();
  const symbols: SymbolInfo[] = [];
  const lines = text.split('\n');

  // Standalone function: function name( or name = function( or name(
  const functionRe = /^\s*(?:async\s+)?function\s+(\w+)\s*\(/;
  const assignFunctionRe = /^\s*(?:(\w+)\s*=\s*)(?:async\s+)?function\s*\(/;
  // Class and method
  const classRe = /^\s*class\s+(\w+)/;
  const methodRe = /^\s*(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{/;
  const getSetRe = /^\s*(?:get|set)\s+(\w+)\s*\(/;

  let inClass = false;
  let classLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const l = line.trim();

    const classMatch = l.match(classRe);
    if (classMatch) {
      symbols.push({ label: classMatch[1], type: 'class', line: i + 1 });
      inClass = true;
      classLine = i + 1;
      continue;
    }

    if (inClass) {
      if (l.startsWith('}') && l.length < 3) {
        inClass = false;
        continue;
      }
      const methodMatch = l.match(methodRe) || l.match(getSetRe);
      if (methodMatch && !l.includes('=>')) {
        symbols.push({
          label: methodMatch[1] + '()',
          type: 'method',
          line: i + 1,
        });
        continue;
      }
    }

    const fnMatch = l.match(functionRe) || l.match(assignFunctionRe);
    if (fnMatch && !inClass) {
      const name = fnMatch[1];
      symbols.push({ label: name + '()', type: 'function', line: i + 1 });
    }
  }

  return symbols;
}
