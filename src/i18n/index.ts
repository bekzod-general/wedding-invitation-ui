import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './locales/uz.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

export const SUPPORTED_LANGUAGES = ['uz', 'ru', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = 'wedding_invitation_lang';

/**
 * Extracts language code ('uz', 'ru', 'en') from pathname.
 * Handles /ru, /ru/, /ru#venue, /ru?param=1, /RU, etc.
 */
export const getLanguageFromPath = (pathname: string): SupportedLanguage | null => {
  const match = pathname.match(/^\/([a-z]{2})(?:\/.*)?$/i);
  if (match) {
    const lang = match[1].toLowerCase() as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      return lang;
    }
  }
  return null;
};

/**
 * Updates URL path to reflect new language without reloading the page.
 * Replaces leading /<lang> or prepends /<newLang>, preserving hash (#venue) and query (?param=1).
 */
export const updatePathForLanguage = (newLang: SupportedLanguage) => {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  const search = window.location.search;

  const currentPathLang = getLanguageFromPath(currentPath);
  let newPathname: string;

  if (currentPathLang) {
    newPathname = currentPath.replace(new RegExp(`^/${currentPathLang}(?=/|$)`, 'i'), `/${newLang}`);
  } else {
    // If at root '/' or un-prefixed
    if (currentPath === '' || currentPath === '/') {
      newPathname = `/${newLang}`;
    } else {
      newPathname = `/${newLang}${currentPath}`;
    }
  }

  // Clean up trailing slash on bare language routes: e.g. /ru/ -> /ru
  if (newPathname.endsWith('/') && newPathname.length > 1) {
    newPathname = newPathname.slice(0, -1);
  }

  const newUrl = `${newPathname}${search}${hash}`;
  const currentUrl = `${window.location.pathname}${search}${hash}`;

  if (currentUrl !== newUrl) {
    window.history.pushState({ lang: newLang }, '', newUrl);
  }
};

const determineInitialLanguage = (): SupportedLanguage => {
  if (typeof window !== 'undefined') {
    // 1. Check URL path first (e.g. /ru, /uz, /en)
    const pathLang = getLanguageFromPath(window.location.pathname);
    if (pathLang) {
      localStorage.setItem(STORAGE_KEY, pathLang);
      return pathLang;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      return saved;
    }
  }
  return 'uz';
};

const initialLanguage = determineInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: initialLanguage,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false, // React already escapes XSS
    },
  });

// Synchronize language changes to localStorage, document lang, and URL path
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    const validLang = (SUPPORTED_LANGUAGES.includes(lng as SupportedLanguage) ? lng : 'uz') as SupportedLanguage;
    localStorage.setItem(STORAGE_KEY, validLang);
    document.documentElement.lang = validLang;
    updatePathForLanguage(validLang);
  }
});

// Set document element lang on startup and listen for browser navigation
if (typeof window !== 'undefined') {
  document.documentElement.lang = initialLanguage;

  // Listen to browser Back/Forward (popstate)
  window.addEventListener('popstate', () => {
    const urlLang = getLanguageFromPath(window.location.pathname);
    if (urlLang && urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
  });
}

export default i18n;
