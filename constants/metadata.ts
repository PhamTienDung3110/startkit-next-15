/**
 * SEO Metadata Configuration
 *
 * @module constants/metadata
 * @description Cấu hình metadata mặc định cho toàn bộ website.
 * Dùng Next.js Metadata API (App Router) thay vì next-seo.
 *
 * Features:
 * - Default title & description
 * - Open Graph tags cho social media
 * - Twitter Card tags
 * - Robots meta tags
 * - Canonical URLs với metadataBase
 *
 * Usage:
 * - Import trong app/[locale]/layout.tsx
 * - Override trong từng page nếu cần
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 *
 * @example
 * ```tsx
 * // app/[locale]/layout.tsx
 * import { defaultMetadata } from "@/constants"
 * export const metadata = defaultMetadata
 *
 * // Override trong specific page
 * export const metadata: Metadata = {
 *   title: "Custom Page Title",
 *   description: "Custom description",
 * }
 * ```
 */

import type { Metadata } from "next";

/**
 * Site Configuration
 * Thông tin cơ bản của website - dùng chung cho metadata
 */
export const siteConfig = {
  /** Tên website */
  name: "My App",
  /** Mô tả ngắn gọn về website */
  description: "Quản lý tài chính cá nhân nhanh, gọn, chính xác.",
  /** URL chính của website (production) */
  url: "https://myapp.com",
  /** Default Open Graph image */
  ogImage: "/og/default.jpg",
};

/**
 * Default Metadata
 * Metadata mặc định cho toàn bộ app
 *
 * Applied to: app/[locale]/layout.tsx
 * Override: Có thể override trong từng page nếu cần
 */
export const defaultMetadata: Metadata = {
  // Base URL cho canonical links và Open Graph
  metadataBase: new URL(siteConfig.url),

  // Title configuration
  title: {
    default: siteConfig.name, // Default title
    template: `%s — ${siteConfig.name}`, // Template cho các page: "Page Title — My App"
  },

  // Meta description
  description: siteConfig.description,

  // Open Graph tags (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "vi_VN", // Default locale
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage, // OG image khi share lên social
        width: 1200, // Recommended: 1200x630
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image", // Large image card
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // Robots meta tags
  robots: {
    index: true, // Cho phép Google index
    follow: true, // Cho phép Google follow links
  },
};
