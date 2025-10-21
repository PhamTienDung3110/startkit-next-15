import { getRequestConfig } from "next-intl/server";
import { locales, Locale } from "@/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "vi";
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
