import i18n from "i18next";
import en from "./en/translation.json";
import fr from "./fr/translation.json";
import ar from "./ar/translation.json";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(initReactI18next).init({
  lng: "fr",
  ns: ["ns1", "ns2"],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
