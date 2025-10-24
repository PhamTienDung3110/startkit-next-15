/**
 * Root Layout - Locale-specific
 *
 * @description Layout chung cho toàn bộ app với i18n support
 * - Wrapped trong [locale] folder → dynamic routing (/vi, /en, /jp)
 * - Chỉ chứa ThemeProvider, Toaster và i18n setup
 * - Không có Sidebar/Header (được xử lý bởi route groups)
 *
 * Structure:
 * html → body → ThemeProvider → {children}
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { Locale, locales } from "@/i18n";
import { notFound } from "next/navigation";
import { defaultMetadata } from "@/constants";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Font configuration - Geist Sans (primary font)
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable cho Tailwind
  subsets: ["latin"],
});

// Font configuration - Geist Mono (code/monospace font)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable cho Tailwind
  subsets: ["latin"],
});

/** SEO Metadata - import từ constants */
export const metadata: Metadata = defaultMetadata;

/**
 * Generate Static Params
 *
 * @description Next.js sẽ pre-render các static paths này lúc build time
 * Generate 3 paths: /vi, /en, /jp
 *
 * Note: Cast to string vì Next.js expect params.locale là string
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale as string }));
}

/**
 * Root Layout Component
 *
 * @param children - Page content
 * @param params - Route params với locale (Promise trong Next.js 15+)
 *
 * Flow:
 * 1. Await params để lấy locale
 * 2. Validate locale - nếu invalid → 404
 * 3. Render HTML với:
 *    - Font variables (Geist Sans + Mono)
 *    - ThemeProvider (dark mode support)
 *    - SidebarProvider (sidebar state management)
 *    - AppSidebar (global sidebar)
 *    - SiteHeader (global header)
 *    - Toaster (notifications)
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Promise vì Next.js 15+
}>) {
  // Await params để lấy locale
  const { locale } = await params;

  // Validate locale - nếu không hợp lệ → 404 page
  if (!locales.includes(locale as Locale)) notFound();

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning // Bắt buộc cho next-themes (tránh hydration mismatch)
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* NextIntl Provider - i18n support */}
        <NextIntlClientProvider messages={messages}>
          {/* Theme Provider - Dark mode support */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Page Content - Render từng page cụ thể */}
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Toast Notifications - Global */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
