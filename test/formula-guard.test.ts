import { describe, expect, it } from 'vitest';
import {
  escapeFormulaCell,
  escapeFormulaRecord,
  escapeFormulaRow,
  needsFormulaEscape,
} from '../src/lib/formula-guard';

describe('escapeFormulaCell', () => {
  it('tehlikeli önekleri tek tırnak ile kaçırır', () => {
    expect(escapeFormulaCell('=HYPERLINK("http://evil")')).toBe(
      "'=HYPERLINK(\"http://evil\")",
    );
    expect(escapeFormulaCell('=cmd|\'/c calc\'!A0')).toBe(
      "'=cmd|'/c calc'!A0",
    );
    expect(escapeFormulaCell('+1+1')).toBe("'+1+1");
    expect(escapeFormulaCell('@SUM(A1:A2)')).toBe("'@SUM(A1:A2)");
    expect(escapeFormulaCell('\tGizli')).toBe("'\tGizli");
    expect(escapeFormulaCell('\rSatir')).toBe("'\rSatir");
    expect(escapeFormulaCell('-1+1')).toBe("'-1+1");
  });

  it('saf sayıları sayı tipinde bırakır (negatif dahil)', () => {
    expect(escapeFormulaCell(-12.5)).toBe(-12.5);
    expect(escapeFormulaCell(0)).toBe(0);
    expect(escapeFormulaCell(42)).toBe(42);
    expect(needsFormulaEscape(-12.5)).toBe(false);
  });

  it('güvenli metinleri değiştirmez', () => {
    expect(escapeFormulaCell('Ürün Adı')).toBe('Ürün Adı');
    expect(escapeFormulaCell('12.5')).toBe('12.5');
    expect(escapeFormulaCell('')).toBe('');
    expect(escapeFormulaCell(' normal')).toBe(' normal');
  });

  it('boolean ve boş değerleri doğru işler', () => {
    expect(escapeFormulaCell(true)).toBe(true);
    expect(escapeFormulaCell(false)).toBe(false);
    expect(escapeFormulaCell(null)).toBe('');
    expect(escapeFormulaCell(undefined)).toBe('');
  });

  it('NaN / Infinity metin olarak kaçırılmaz (önek yok) ama stringleşir', () => {
    expect(escapeFormulaCell(Number.NaN)).toBe('NaN');
    expect(escapeFormulaCell(Number.POSITIVE_INFINITY)).toBe('Infinity');
  });

  it('satır ve kayıt yardımcıları çalışır', () => {
    expect(escapeFormulaRow(['ok', '=A1', -3])).toEqual(['ok', "'=A1", -3]);
    expect(
      escapeFormulaRecord({ a: '+1', b: 5, c: 'x' }),
    ).toEqual({ a: "'+1", b: 5, c: 'x' });
  });
});
