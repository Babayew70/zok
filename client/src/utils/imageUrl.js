import { BASE_URL } from '../config';

const LOCAL_HOST_PATTERN = /^(localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0)$/i;

const joinUrl = (base, path) => {
  if (!path) return '';
  if (!base) return path.startsWith('/') ? path : `/${path}`;

  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
};

/**
 * Возвращает URL картинки, пригодный для отображения на текущем домене.
 * Если в базе остался localhost, подменяет его на текущий BASE_URL.
 */
export function getImageUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const s = url.trim();
  if (!s) return '';

  if (s.startsWith('data:') || s.startsWith('blob:')) return s;

  if (s.startsWith('http://') || s.startsWith('https://')) {
    try {
      const parsed = new URL(s);
      if (LOCAL_HOST_PATTERN.test(parsed.hostname)) {
        return joinUrl(BASE_URL, `${parsed.pathname}${parsed.search}${parsed.hash}`);
      }
      return parsed.toString();
    } catch {
      return s;
    }
  }

  if (s.startsWith('/')) return joinUrl(BASE_URL, s);
  if (s.startsWith('uploads/')) return joinUrl(BASE_URL, s);

  return s;
}
