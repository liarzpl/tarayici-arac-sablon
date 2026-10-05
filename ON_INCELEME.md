# Şablon güvenlik ön inceleme

**Durum:** ONAY_ŞARTLI  
**Tarih:** 2026-10-05 (Europe/Istanbul)  
**Kapsam:** `/workspace/fikir-fabrikasi/sablon/tarayici-arac/` — gerçek proje BİTTİ değil.

## Özet
Kritik/yüksek yok. SheetJS 0.20.3, temel formül kaçırma, 10MB/50k, CSP iskeleti, XSS/ağ sızıntısı yok, IndexedDB varsayılan kapalı. `npm test` 23 geçti; `npm audit --omit=dev` 0 açık.

## Orta
1. `formula-guard.ts`: baştaki whitespace/NBSP, fullwidth `＝`, isteğe `|` eksik.
2. `vite.config.ts` CSP: `worker-src` / `font-src` prod header’larla hizasız.

## Düşük
1. `style-src 'unsafe-inline'`
2. SW her zaman kayıt (PWA bayrağından bağımsız)
3. README Vite 5 vs paket Vite 6
4. String `-12.5` → `'‑12.5` (bilinçli; dokümante et)

## İnşa düzeltme listesi
1. Formül kaçırmayı sertleştir + birim testler
2. Vite CSP hizası
3. Inline style → CSS; unsafe-inline kaldırmayı dene
4. README düzelt
5. (İsteğe bağlı) SW sürümleme / PWA bayrağı

Düzeltmelerden sonra Test ve Güvenlik’e tekrar bildir.
