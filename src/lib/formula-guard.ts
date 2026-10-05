/**
 * Formül enjeksiyonu koruması (CSV/Excel çıktı).
 *
 * =, +, -, @, TAB (\t) veya CR (\r) ile başlayan metin hücrelerinin
 * başına tek tırnak (') eklenir; böylece Excel bunları formül sanmaz.
 *
 * Saf sayısal değerler (number tipi veya sayıya parse edilebilen metin
 * değil — yalnızca gerçek number) sayı olarak kalır.
 *
 * Kaynak: OWASP CSV Injection / formula injection rehberi.
 */

const DANGEROUS_PREFIX = /^[=+\-@\t\r]/;

/**
 * Bir hücre değerini çıktı için güvenli hale getirir.
 * - number → olduğu gibi (Excel sayı tipi)
 * - boolean / null / undefined → string'e çevrilip kaçırılır gerekirse
 * - string → tehlikeli önek varsa başına ' eklenir
 */
export function escapeFormulaCell(value: unknown): string | number | boolean {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    // NaN / Infinity metin olarak kaçırılsın
    if (!Number.isFinite(value)) {
      return escapeString(String(value));
    }
    return value;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return escapeString(String(value));
}

function escapeString(text: string): string {
  if (text.length === 0) return text;
  if (DANGEROUS_PREFIX.test(text)) {
    return `'${text}`;
  }
  return text;
}

/**
 * Satır (dizi) içindeki tüm hücreleri kaçırır.
 */
export function escapeFormulaRow(
  row: unknown[],
): Array<string | number | boolean> {
  return row.map(escapeFormulaCell);
}

/**
 * Nesne satırındaki tüm değerleri kaçırır (anahtarlar korunur).
 */
export function escapeFormulaRecord<T extends Record<string, unknown>>(
  record: T,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, val] of Object.entries(record)) {
    out[key] = escapeFormulaCell(val);
  }
  return out;
}

/**
 * Değerin formül kaçırması gerekip gerekmediğini test eder (birim test yardımcısı).
 */
export function needsFormulaEscape(value: unknown): boolean {
  if (typeof value === 'number' && Number.isFinite(value)) return false;
  if (typeof value === 'boolean') return false;
  if (value === null || value === undefined) return false;
  return DANGEROUS_PREFIX.test(String(value));
}
