import { TreeNode } from './types';
import { ScannedFile } from './scanner';
import { extractFileAsNode } from './extractors';

function getOrCreateFolder(parent: TreeNode[], segment: string): TreeNode {
  let folder = parent.find((n) => n.type === 'folder' && n.label === segment);
  if (!folder) {
    folder = { label: segment, type: 'folder', children: [] };
    parent.push(folder);
  }
  if (!folder.children) folder.children = [];
  return folder;
}

/**
 * Builds folder > file > class > method hierarchy from scanned files.
 */
export async function buildTree(
  files: ScannedFile[],
  onProgress?: (current: number, total: number, file: string) => void
): Promise<TreeNode[]> {
  const root: TreeNode[] = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    onProgress?.(i + 1, total, f.relativePath);
    const fileNode = await extractFileAsNode(f);
    const parts = f.relativePath.split(/[/\\]/);
    const dirs = parts.slice(0, -1);

    let current = root;
    for (const segment of dirs) {
      const folder = getOrCreateFolder(current, segment);
      current = folder.children!;
    }
    current.push(fileNode);
  }

  return root;
}
