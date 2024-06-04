import { defineConfig } from "astro/config";
import astroslation from "astroslation";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es", "de"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
