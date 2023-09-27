export type i18nConfig = {
  languages: Record<string, string>;
  defaultLang: keyof i18nConfig["languages"];
};
