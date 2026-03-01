/**
 * Language Scope Index
 *
 * Public API for the language layer: getGlobPatterns, getExclusions, getActiveScopes,
 * getPlannedScopes, getExtractorKeyForExtension, getSupportedExtensions. Used by the
 * scanner and extractors to resolve which files to scan and which extractor to run.
 *
 * @author Gobinda Nandi <gobinda.nandi.public@gmail.com>
 * @since 1.1.1 [01-03-2026]
 * @version 1.1.1
 * @copyright (c) 2026 Gobinda Nandi
 */

import { LANGUAGE_SCOPES } from './registry';
import type { LanguageScope, LanguageId } from './types';

export type { LanguageScope, LanguageId, ScopeStatus } from './types';
export { LANGUAGE_SCOPES } from './registry';

/** Glob patterns for all active scopes. */
export function getGlobPatterns(): string[] {
  return LANGUAGE_SCOPES.filter((s) => s.status === 'active')
    .flatMap((s) => s.extensions.map((ext) => '**/*' + ext));
}

/** Merged exclusions for all active scopes, plus global exclusions. */
const GLOBAL_EXCLUDES = ['**/node_modules/**', '**/.git/**'];

export function getExclusions(): string[] {
  const fromScopes = LANGUAGE_SCOPES
    .filter((s) => s.status === 'active' && s.exclusions?.length)
    .flatMap((s) => s.exclusions!);
  return [...new Set([...GLOBAL_EXCLUDES, ...fromScopes])];
}

/** Active scopes only (PHP, JS, HTML, CSS for now). */
export function getActiveScopes(): LanguageScope[] {
  return LANGUAGE_SCOPES.filter((s) => s.status === 'active');
}

/** Planned scopes (Node, React, ASP, C++, Python) for docs and future implementation. */
export function getPlannedScopes(): LanguageScope[] {
  return LANGUAGE_SCOPES.filter((s) => s.status === 'planned');
}

/** Resolve extractor key for a file extension (e.g. '.php' -> 'php'). */
export function getExtractorKeyForExtension(ext: string): string | null {
  const lower = ext.toLowerCase();
  const scope = LANGUAGE_SCOPES.find(
    (s) => s.status === 'active' && s.extensions.includes(lower)
  );
  return scope?.extractorKey ?? null;
}

/** All extensions supported by active scopes (e.g. ['.php', '.phtml', '.js']). */
export function getSupportedExtensions(): string[] {
  return [...new Set(getActiveScopes().flatMap((s) => s.extensions))];
}
