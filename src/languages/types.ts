/**
 * Language Scope Type Definitions
 *
 * Defines LanguageId, ScopeStatus, and LanguageScope for the language registry. PHP is
 * primary; Node, React, ASP, C++, Python are scoped for later. Used by registry and
 * languages index.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
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
