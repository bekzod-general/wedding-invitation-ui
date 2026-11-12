import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './locales/uz.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

const STORAGE_KEY = 'wedding_invitation_lang';
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const initialLanguage = (savedLanguage === 'uz' || savedLanguage === 'ru' || savedLanguage === 'en')
  ? savedLanguage
  : 'uz';

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

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

if (typeof window !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

export default i18n;
