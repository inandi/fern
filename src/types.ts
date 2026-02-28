/**
 * Tree node shape consumed by the UI (design: docs/04-tree-structure.md).
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
