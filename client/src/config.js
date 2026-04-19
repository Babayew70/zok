const IS_PROD = process.env.NODE_ENV === 'production';
const isBrowser = typeof window !== 'undefined';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value = '') => (value.startsWith('/') ? value : `/${value}`);

const toAbsoluteUrl = (value) => {
    if (!value || typeof value !== 'string') return '';

    const trimmed = value.trim();
    if (!trimmed) return '';

    if (/^https?:\/\//i.test(trimmed)) {
        return trimTrailingSlash(trimmed);
    }

    if (isBrowser) {
        return trimTrailingSlash(new URL(ensureLeadingSlash(trimmed), window.location.origin).toString());
    }

    return trimTrailingSlash(ensureLeadingSlash(trimmed));
};

const DEFAULT_API_URL = IS_PROD ? '/api' : 'http://localhost:5002/api';

const API_URL = toAbsoluteUrl(
    process.env.REACT_APP_API_URL || DEFAULT_API_URL
);

export const BASE_URL = toAbsoluteUrl(
    process.env.REACT_APP_API_BASE_URL || API_URL.replace(/\/api$/i, '')
);

export const UPLOADS_URL = BASE_URL ? `${BASE_URL}/uploads` : '/uploads';

export default API_URL;
