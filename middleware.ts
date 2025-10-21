import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // URL luôn có prefix /vi, /en
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
