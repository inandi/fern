/**
 * Symbol Info Type (Extractors)
 *
 * Raw symbol from a single file before building the tree. Used by PHP and JS extractors
 * to return class, method, property, and function entries with label, type, line, and
 * optional doc (PHPDoc/JSDoc).
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

export interface SymbolInfo {
  label: string;
  type: 'class' | 'method' | 'property' | 'function';
  line: number;
  doc?: string;
}
