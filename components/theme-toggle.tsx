/**
 * Theme Toggle Component
 *
 * @description Toggle button để chuyển đổi giữa light và dark mode
 * - Sử dụng next-themes để quản lý theme
 * - Tự động detect system preference
 * - Persist theme vào localStorage
 *
 * Note: Phải dùng mounted state để tránh hydration mismatch
 * (server render khác client render do localStorage)
 */

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme(); // resolvedTheme = "light" hoặc "dark" (computed)
  const [mounted, setMounted] = useState(false); // Track component đã mount chưa

  // Set mounted = true sau khi component mount
  // Để tránh hydration mismatch giữa server và client
  useEffect(() => setMounted(true), []);

  // Current theme - chỉ show sau khi mounted
  const current = mounted ? resolvedTheme : undefined;

  return (
    <button
      className="inline-flex items-center gap-2 rounded border px-3 py-2"
      onClick={() => setTheme((current === "dark" ? "light" : "dark") as "light" | "dark")}
    >
      {/* Sun icon - chỉ hiển thị trong light mode */}
      <Sun className="h-4 w-4 dark:hidden" />

      {/* Moon icon - chỉ hiển thị trong dark mode */}
      <Moon className="hidden h-4 w-4 dark:block" />

      {/* Theme text - suppressHydrationWarning vì có thể khác server/client */}
      <span suppressHydrationWarning>{current ?? "…"}</span>
    </button>
  );
}
