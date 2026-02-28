/**
 * Language/project scope for the map.
 * PHP is primary for now; Node, React, ASP, C++, Python are scoped for later.
 */
export type LanguageId =
  | 'php'
  | 'js'
  | 'html'
  | 'css'
  | 'node'
  | 'react'
  | 'asp'
  | 'cpp'
  | 'python';

export type ScopeStatus = 'active' | 'planned';

export interface LanguageScope {
  id: LanguageId;
  name: string;
  status: ScopeStatus;
  /** File extensions this scope handles (e.g. ['.php', '.phtml']). */
  extensions: string[];
  /**
   * Extra glob exclusions for this scope (e.g. PHP: vendor).
   * Merged with global exclusions in the scanner.
   */
  exclusions?: string[];
  /**
   * Extractor key used to look up the extractor in the extractors registry.
   * Use 'file-only' for file-level visibility only (e.g. HTML/CSS in Phase 1).
   */
  extractorKey: 'php' | 'js' | 'file-only' | 'node' | 'react' | 'asp' | 'cpp' | 'python';
}
