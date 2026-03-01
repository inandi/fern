/**
 * Shared Type Definitions
 *
 * Tree node shape consumed by the UI (design: docs/04-tree-structure.md). Defines TreeNode
 * and the recursive folder/file/class/method structure used by the map and webview.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

export interface TreeNode {
  label: string;
  type: 'folder' | 'file' | 'class' | 'method' | 'property' | 'function';
  doc?: string;
  line?: number;
  /** Absolute file path; required for file nodes and their descendants for navigation. */
  path?: string;
  children?: TreeNode[];
}
