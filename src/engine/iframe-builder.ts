import type { ImportMap } from '../types.js';

/**
 * Escapes backticks and ${} for safe embedding inside JS template literals.
 */
export function escTpl(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

/**
 * Serialises an ImportMap to a <script type="importmap"> tag string.
 */
export function importMapTag(map: ImportMap): string {
  return `<script type="importmap">${JSON.stringify(map, null, 2)}<\/script>`;
}

/**
 * Wraps user JS in a blob URL dynamic import pattern.
 * Used by React, Vue and Angular where the component is imported at runtime.
 */
export function blobImportScript(safeJs: string, mountCode: string): string {
  return `
const __blob = new Blob([\`${safeJs}\`], { type: 'text/javascript' });
const __url  = URL.createObjectURL(__blob);
import(__url).then(module => {
  ${mountCode}
}).catch(err => {
  document.body.innerHTML = '<pre style="color:red;padding:1rem">' + err + '</pre>';
});`;
}
