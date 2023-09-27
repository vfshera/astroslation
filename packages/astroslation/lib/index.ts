import type { AstroIntegration } from "astro";

import type { i18nConfig } from "./types";
import { PACKAGE_NAME, TRANSLATIONS_DIR } from "./constants";
import {
  createFile,
  getCredits,
  getLanguage,
  getPath,
  getTranslationFunctions,
} from "./utils";
import path from "path";

export {
  type Translation,
  type Language,
  getLangFromUrl,
  useTranslation,
  defaultLang,
  languages,
} from "./translations";

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
      "astro:config:setup": async ({ config }) => {
        const projectTraslationPath = path.resolve(
          config.root.pathname,
          "src",
          TRANSLATIONS_DIR
        );

        const langKeys = Object.keys(userConfig.languages);

        const translationsPath = getPath(
          new URL(
            `./node_modules/${PACKAGE_NAME}/lib/translations.ts`,
            config.root
          )
        );

        createFile(
          translationsPath.__filename,
          `
${getCredits()}

export type Language = ${langKeys.map((key) => `"${key}"`).join(" | ")}

/**
 * Supported languages object.
 */

${getLanguage(userConfig.languages)}

/**
 * Default language.
 */

export const defaultLang: Language = "en";


/**
 * Translations object containing translations for different languages.
 */

${getTranslationFunctions(
  langKeys,
  path.relative(translationsPath.__dirname, projectTraslationPath)
)}
 


export type Translation = typeof translations;



/**
 * Retrieves the language code from the URL path ie. Astro.url
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang ;
  return defaultLang;
}

/**
 * Loads json translations
 * 
 */
export const useTranslation = async (lang: Language) => translations[lang]();

        `
        );

        // updateConfig({
        //   vite: {
        //     plugins: [
        //       ViteRestart({
        //         restart: [translationsGlob.pathname],
        //         reload: [translationsGlob.pathname],
        //       }),
        //     ],
        //   },
        // });
      },
    },
  };
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
