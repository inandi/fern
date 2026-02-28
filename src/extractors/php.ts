import * as vscode from 'vscode';
import { SymbolInfo } from './symbols';

// php-parser: program.children[]; class.body[] (method, property, etc.); nodes have loc, leadingComments
interface PHPPosition {
  line: number;
}
interface PHPLoc {
  start?: PHPPosition;
}
interface PHPComment {
  kind: string;
  value: string;
}
interface PHPNode {
  kind: string;
  name?: string | { name: string };
  loc?: PHPLoc;
  leadingComments?: PHPComment[];
  body?: PHPNode[];
  children?: PHPNode[];
}

function getDoc(node: PHPNode): string | undefined {
  const comments = node.leadingComments;
  if (!comments?.length) return undefined;
  const doc = comments.find((c: PHPComment) => c.kind === 'commentblock' && c.value && /\/\*\*/.test(c.value));
  if (!doc) return undefined;
  return String(doc.value).replace(/^\s*\/\*\*?|\*\/\s*$/g, '').replace(/^\s*\*\s?/gm, '').trim();
}

function getLine(node: PHPNode): number {
  return node.loc?.start?.line ?? 1;
}

function getName(node: PHPNode): string {
  const n = node.name;
  if (typeof n === 'string') return n;
  return (n && typeof n === 'object' && 'name' in n) ? (n as { name: string }).name : '?';
}

export async function extractPHP(uri: vscode.Uri): Promise<SymbolInfo[]> {
  const doc = await vscode.workspace.openTextDocument(uri);
  const text = doc.getText();
  if (!text.trim()) return [];

  try {
    const engine = require('php-parser');
    const parser = new engine({
      parser: { extractDoc: true },
      ast: { withPositions: true },
    });
    const ast = parser.parseCode(text) as PHPNode;

    const symbols: SymbolInfo[] = [];
    const visit = (node: PHPNode) => {
      if (!node || typeof node.kind !== 'string') return;
      if (node.kind === 'class' || node.kind === 'interface' || node.kind === 'trait') {
        const name = getName(node);
        symbols.push({
          label: name,
          type: 'class',
          line: getLine(node),
          doc: getDoc(node),
        });
        const body = node.body;
        if (Array.isArray(body)) {
          for (const m of body) {
            if (m.kind === 'method') {
              symbols.push({
                label: getName(m) + '()',
                type: 'method',
                line: getLine(m),
                doc: getDoc(m),
              });
            } else if (m.kind === 'property' || m.kind === 'propertystatement') {
              const pName = 'name' in m && typeof (m as PHPNode).name !== 'undefined'
                ? getName(m as PHPNode)
                : '?';
              symbols.push({
                label: pName,
                type: 'property',
                line: getLine(m as PHPNode),
                doc: getDoc(m as PHPNode),
              });
            }
          }
        }
        return;
      }
      if (node.kind === 'function') {
        const name = getName(node);
        symbols.push({
          label: name + '()',
          type: 'function',
          line: getLine(node),
          doc: getDoc(node),
        });
        return;
      }
      if (node.children && Array.isArray(node.children)) {
        for (const c of node.children) visit(c as PHPNode);
      }
    };
    visit(ast);
    return symbols;
  } catch {
    return [];
  }
}
