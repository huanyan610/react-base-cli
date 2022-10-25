/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://ting.xingzheai.cn/',
  changefreq: 'weekly',
  priority: 0.3,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
  alternateRefs: [
    {
      href: 'https://ting.xingzheai.cn/',
      hreflang: 'zh',
    },
  ],
  sourceDir: 'dist',
  outDir: 'public',
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod
        ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // additionalPaths: async (config) => [await config.transform(config, '/additional-page')],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://ting.xingzheai.cn/sitemap-0.xml'],
  },
};
