/**
 * Proje ayarları — yeni projede burayı değiştirin.
 * Hassas varsayılanlar güvenlik kurallarına kilitlidir.
 */

/** Maksimum yükleme boyutu (bayt). Varsayılan 10 MB. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Maksimum satır sayısı (başlık hariç veri satırları). */
export const MAX_ROWS = 50_000;

/** Demo için zorunlu kolon başlıkları (görünen adlar). */
export const REQUIRED_COLUMNS = ['Ürün Adı', 'Adet', 'Fiyat'] as const;

/**
 * Yerel saklama (IndexedDB) varsayılan KAPALI.
 * Açmak için true yapın; localStorage'a hassas veri yazılmaz.
 */
export const LOCAL_STORAGE_ENABLED = false;

/** Yedek hatırlatması: son Excel yedeğinden bu kadar gün geçince uyarı. */
export const BACKUP_REMIND_DAYS = 7;

/** Uygulama görünen adı (manifest / başlık). */
export const APP_NAME = 'Excel/CSV Araç Şablonu';

/** Uygulama kısa adı (PWA). */
export const APP_SHORT_NAME = 'Excel Araç';
