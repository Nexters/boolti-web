import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './i18n/ko.json';
import en from './i18n/en.json';

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
