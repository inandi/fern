/**
 * Raw symbol from a single file (before building the tree).
 */
export interface SymbolInfo {
  label: string;
  type: 'class' | 'method' | 'property' | 'function';
  line: number;
  doc?: string;
}
