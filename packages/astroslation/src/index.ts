import type { AstroIntegration } from "astro";
import ViteRestart from "vite-plugin-restart";
import type { i18nConfig } from "./types";
import { getRedirectPage, validateConfig } from "./utils";
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

        // const configURL = new URL(`./${CONFIG_NAME}`, config.root);
        /**
         * Restart Server when config changes
         */
        // addWatchFile(configURL);

        // userConfig = (await load("i18n.config", {
        //   mustExist: true,
        //   cwd: fileURLToPath(config.root),
        //   filePath: fileURLToPath(configURL),
        // })) as i18nConfig;

        // console.log(usrcnfg);

        // userConfig = (await import(fileURLToPath(configURL)).then(
        //   (res) => res.default
        // )) as i18nConfig;

        injectRoute({
          pattern: "/main",
          entryPoint: getRedirectPage(config.output),
        });
      },
    },
  };
}
