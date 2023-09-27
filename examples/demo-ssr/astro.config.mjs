import { defineConfig } from "astro/config";
import astroslation from "@vfshera/astroslation";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    astroslation({
      languages: {
        en: "English",
        fr: "Français",
      },
      defaultLang: "en",
    }),
  ],
});
