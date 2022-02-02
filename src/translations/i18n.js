import i18n, {use} from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {en} from "./en";
import {pl} from "./pl";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            pl: {
                translation: pl
            }
        },
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;