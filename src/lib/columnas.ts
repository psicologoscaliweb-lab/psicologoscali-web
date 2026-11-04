/**
 * Columnas para que las filas de tarjetas queden parejas (sin una fila final incompleta):
 * 6 → 3 + 3 · 8 → 4 + 4 · 3 → 3 · 4 → 4 · 9 → 3 + 3 + 3.
 * En tableta: 2 columnas si el total es par; si no, 1. En celular siempre 1 (lo pone el CSS).
 */
export function columnas(n: number) {
  const escritorio = n <= 4 ? Math.max(n, 1) : n % 3 === 0 ? 3 : n % 4 === 0 ? 4 : 3;
  const tableta = escritorio <= 2 ? escritorio : n % 2 === 0 ? 2 : 1;
  return `--cols:${escritorio};--cols-t:${tableta}`;
}
