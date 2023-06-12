import { defineAstroI18nConfig } from "astro-i18n";

export default defineAstroI18nConfig({
  defaultLangCode: "en",
  supportedLangCodes: ["br"],
  showDefaultLangCode: true,
  translations: {
    br: {
      About: "Sobre",
      Flags: "Bandeiras",
      Home: "Início",
    },
  },
  routeTranslations: {
    br: {
      about: "sobre",
      flags: "bandeiras",
      home: "inicio",
    },
  },
});
