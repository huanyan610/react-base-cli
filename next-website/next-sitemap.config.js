/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://card-game.xingzheai.cn',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
  alternateRefs: [
    {
      href: 'https://card-game.xingzheai.cn',
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
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [await config.transform(config, '/additional-page')],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
};
