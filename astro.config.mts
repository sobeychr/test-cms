import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';
import { getDetails, getGitLog } from './script/astroConfigHelpers';
import packageJson from './package.json';

const envConfigs = loadEnv('', process.cwd(), '');

const {
  npm_config_user_agent: userAgent = '',
  SERVER_HOST = 'localhost.local',
  SERVER_PORT = '3000',
} = envConfigs;

const { npmVersion, nodeVersion, osName } = getDetails(userAgent);
const gitLog = getGitLog();
const { version = '0.0.1' } = packageJson;

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
  },
});
