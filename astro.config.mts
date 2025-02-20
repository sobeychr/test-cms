import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';

const envConfigs = loadEnv('', process.cwd(), '');

export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  output: 'server',
  server: {
    host: envConfigs.SERVER_HOST,
    port: parseInt(envConfigs.SERVER_PORT, 10),
  },
  trailingSlash: 'never',
});
