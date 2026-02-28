import { LanguageScope } from './types';

/**
 * All language/project scopes. PHP is primary; others are planned for later.
 * Add new entries here when adding Node, React, ASP, C++, Python support.
 */
export const LANGUAGE_SCOPES: LanguageScope[] = [
  {
    id: 'php',
    name: 'PHP',
    status: 'active',
    extensions: ['.php', '.phtml', '.tpl'],
    exclusions: ['**/vendor/**'],
    extractorKey: 'php',
  },
  {
    id: 'js',
    name: 'JavaScript',
    status: 'active',
    extensions: ['.js'],
    exclusions: ['**/node_modules/**'],
    extractorKey: 'js',
  },
  {
    id: 'html',
    name: 'HTML',
    status: 'active',
    extensions: ['.html', '.htm'],
    extractorKey: 'file-only',
  },
  {
    id: 'css',
    name: 'CSS',
    status: 'active',
    extensions: ['.css'],
    extractorKey: 'file-only',
  },
  // --- Planned: add extractors and enable when ready ---
  {
    id: 'node',
    name: 'Node.js',
    status: 'planned',
    extensions: ['.js', '.mjs', '.cjs'],
    exclusions: ['**/node_modules/**'],
    extractorKey: 'node',
  },
  {
    id: 'react',
    name: 'React',
    status: 'planned',
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    exclusions: ['**/node_modules/**'],
    extractorKey: 'react',
  },
  {
    id: 'asp',
    name: 'ASP.NET',
    status: 'planned',
    extensions: ['.cs', '.cshtml', '.razor'],
    exclusions: ['**/bin/**', '**/obj/**'],
    extractorKey: 'asp',
  },
  {
    id: 'cpp',
    name: 'C/C++',
    status: 'planned',
    extensions: ['.c', '.cpp', '.cc', '.cxx', '.h', '.hpp'],
    exclusions: ['**/build/**', '**/out/**'],
    extractorKey: 'cpp',
  },
  {
    id: 'python',
    name: 'Python',
    status: 'planned',
    extensions: ['.py', '.pyi'],
    exclusions: ['**/__pycache__/**', '**/.venv/**', '**/venv/**'],
    extractorKey: 'python',
  },
];
