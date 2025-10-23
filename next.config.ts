/**
 * Next.js Configuration
 *
 * @description Cấu hình Next.js với next-intl plugin
 * - Plugin next-intl: i18n support cho App Router
 * - Request config: ./i18n/request.ts (load messages based on locale)
 *
 * Note: withNextIntl wrap nextConfig để inject i18n functionality
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Tạo next-intl plugin với request config path
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Next.js config object
const nextConfig: NextConfig = {
  /* Thêm config options tại đây nếu cần:
   * - images: Image optimization config
   * - redirects: URL redirects
   * - headers: Custom headers
   * - etc.
   */
};

// Export config đã được wrap bởi next-intl plugin
export default withNextIntl(nextConfig);
