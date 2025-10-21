export const locales = ["vi", "en", "jp"] as const;
export const defaultLocale = "vi";

export type Locale = (typeof locales)[number];
