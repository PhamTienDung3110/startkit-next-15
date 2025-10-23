/**
 * Theme Provider Wrapper
 *
 * @description Wrapper component cho next-themes
 * - Wrap NextThemesProvider để dễ customize sau này
 * - Quản lý theme state (light/dark/system)
 * - Persist vào localStorage
 * - Sync theme across tabs
 *
 * Usage: Đã wrap sẵn trong app/[locale]/layout.tsx
 *
 * Props:
 * - attribute: "class" (thêm class dark vào html element)
 * - defaultTheme: "system" (theo system preference)
 * - enableSystem: true (detect system dark mode)
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
