import type { AstroIntegration, AstroConfig } from "astro";
import ViteRestart from "vite-plugin-restart";
import type { i18nConfig } from "./types";
import { PACKAGE_NAME, TRANSLATIONS_DIR } from "./constants";

export default function createIntegration(
  userConfig: i18nConfig
): AstroIntegration {
  validateConfig(userConfig);
  /**
   * READ CONFIG
   *
   * READ TRANSLATIONS
   *
   * MOVE ROUTES TO [lang] and create an index for redirect
   *
   * IF static generate getStaticPaths
   */

  return {
    name: PACKAGE_NAME,
    hooks: {
      "astro:config:setup": async ({
        config,
        addWatchFile,
        updateConfig,
        injectRoute,
      }) => {
        /**
         * Restart when translations change
         */
        const translationsGlob = new URL(
          `./src/${TRANSLATIONS_DIR}/**/*.json`,
          config.root
        );

        updateConfig({
          vite: {
            plugins: [
              ViteRestart({
                restart: [translationsGlob.pathname],
                reload: [translationsGlob.pathname],
              }),
            ],
          },
        });

        injectRoute({
          pattern: "/main",
          entryPoint: getRedirectPage(config.output),
        });
      },
    },
  };
}

function getRedirectPage(outputType: AstroConfig["output"]) {
  return outputType === "server"
    ? `${PACKAGE_NAME}/ssr.astro`
    : `${PACKAGE_NAME}/static.astro`;
}

function validateConfig(config: i18nConfig) {
  const { languages, defaultLang } = config;
  const langKeys = Object.keys(languages);

  if (!langKeys.includes(defaultLang)) {
    throw new Error(
      `Default Language ${defaultLang} is not a valid language key, Try ${langKeys}`
    );
  }
}
