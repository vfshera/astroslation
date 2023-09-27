import type { AstroConfig } from "astro";
import type { i18nConfig } from "./types";
import { PACKAGE_NAME } from "./constants";

export function defineConfig(config: i18nConfig) {
  return config;
}

export function getRedirectPage(outputType: AstroConfig["output"]) {
  return outputType === "server"
    ? `${PACKAGE_NAME}/pages/ssr.astro`
    : `${PACKAGE_NAME}/pages/static.astro`;
}

export function validateConfig(config: i18nConfig) {
  const { languages, defaultLang } = config;
  const langKeys = Object.keys(languages);

  if (!langKeys.includes(defaultLang)) {
    throw new Error(
      `Default Language ${defaultLang} is not a valid language key, Try ${langKeys}`
    );
  }
}
