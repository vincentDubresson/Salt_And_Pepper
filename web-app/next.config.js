// https://nextjs.org/docs/api-reference/next.config.js/introduction
const path = require('path');

/** 
 * es-lint error is due to vscode extension
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
