import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import { getDetails, getGitLog } from './script/astroConfigHelpers';
import packageJson from './package.json';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const envConfigs = loadEnv('', process.cwd(), '');

const {
  npm_config_user_agent: userAgent = '',
  LOGS_DIR,
  SERVER_HOST = 'localhost.local',
  SERVER_PORT = '3000',
} = envConfigs;

const { npmVersion, nodeVersion, osName } = getDetails(userAgent);
const gitLog = getGitLog();
const { version = '0.0.1' } = packageJson;

const SRC_DIR = resolve(process.cwd(), './src/') + '/';

if (LOGS_DIR) {
  const logDir = resolve(process.cwd(), LOGS_DIR) + '/';
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }
}

const details = [
  `on ${osName}`,
  `v${version}`,
  `tag ${gitLog.tag}`,
  `shortHash ${gitLog.shortHash}`,
  `Node v${nodeVersion}`,
  `NPM v${npmVersion}`,
];
console.log(`> Running Test-CMS ${details.join(', ')}`);

export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  integrations: [solidJs()],
  output: 'server',
  server: {
    host: SERVER_HOST,
    port: parseInt(SERVER_PORT, 10),
  },
  trailingSlash: 'never',
  vite: {
    define: {
      'import.meta.env.GIT': JSON.stringify(gitLog),
      'import.meta.env.VERSION': JSON.stringify(version),
    },
    resolve: {
      alias: {
        '@t-components/': `${SRC_DIR}components/`,
        '@t-styles/': `${SRC_DIR}styles/`,
      },
    },
  },
});
