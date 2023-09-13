// const remarkGfm = require('remark-gfm');
// const remarkRehype = require('remark-rehype')
/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    appDir: true,
    mdxRs: true,
    serverActions: true,
  },
}

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
  extension: /\.(md|mdx)$/,
});
module.exports = withMDX(nextConfig);
