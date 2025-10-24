/**
 * Application Paths Constants
 *
 * @description Centralized path management for the application
 * All paths are defined here to make it easy to change routes in the future
 */

// Auth paths
export const AUTH_PATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
} as const;

// App paths
export const APP_PATHS = {
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  DEMO: "/demo",
} as const;

// Public paths
export const PUBLIC_PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
} as const;

// All paths combined
export const PATHS = {
  ...AUTH_PATHS,
  ...APP_PATHS,
  ...PUBLIC_PATHS,
} as const;

// Helper functions for path generation with locale
export const getLocalizedPath = (path: string, locale: string) => {
  return `/${locale}${path}`;
};

export const getAuthPath = (path: keyof typeof AUTH_PATHS, locale: string) => {
  return getLocalizedPath(AUTH_PATHS[path], locale);
};

export const getAppPath = (path: keyof typeof APP_PATHS, locale: string) => {
  return getLocalizedPath(APP_PATHS[path], locale);
};

export const getPublicPath = (path: keyof typeof PUBLIC_PATHS, locale: string) => {
  return getLocalizedPath(PUBLIC_PATHS[path], locale);
};
