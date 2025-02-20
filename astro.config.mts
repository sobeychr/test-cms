import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';
import { getDetails } from './script/astroConfigHelpers';

const envConfigs = loadEnv('', process.cwd(), '');

const {
  npm_config_user_agent: userAgent = '',
  SERVER_HOST = 'localhost.local',
  SERVER_PORT = '3000',
} = envConfigs;

const { npmVersion, nodeVersion, osName } = getDetails(userAgent)

console.log(`> Running Test-CMS on ${osName}, Node v${nodeVersion}, NPM v${npmVersion}`);

export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  output: 'server',
  server: {
    host: SERVER_HOST,
    port: parseInt(SERVER_PORT, 10),
  },
  trailingSlash: 'never',
});
