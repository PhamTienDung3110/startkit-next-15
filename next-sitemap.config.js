/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  // Exclude admin/private pages
  exclude: ["/api/*", "*/dashboard*", "*/demo*", "/server-sitemap.xml"],
  // Alternate language pages cho SEO
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
      hreflang: "vi",
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/en`,
      hreflang: "en",
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/jp`,
      hreflang: "ja",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/dashboard", "/*/demo"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/sitemap.xml`,
    ],
  },
};
