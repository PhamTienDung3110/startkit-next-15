// components/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme(); // resolvedTheme = "light" | "dark"
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme : undefined;

  return (
    <button
      className="inline-flex items-center gap-2 rounded border px-3 py-2"
      onClick={() => setTheme((current === "dark" ? "light" : "dark") as "light" | "dark")}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
      {/* chỉ hiển thị sau khi mounted để tránh mismatch */}
      <span suppressHydrationWarning>{current ?? "…"}</span>
    </button>
  );
}
