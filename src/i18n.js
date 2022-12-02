import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import lang_en from 'locales/en/translate.json'
import lang_es from 'locales/es/translate.json'
import lang_fr from 'locales/fr/translate.json'

const resources= {
    en: {
        translate: lang_en
    },
    es: {
        translate: lang_es
    },
    fr: {
        translate: lang_fr
    }
}

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "en", 
    //lng: "en",
    detection: resources,
    interpolation: {
      escapeValue: false 
    }
  })

i18n.changeLanguage()

export default i18n;