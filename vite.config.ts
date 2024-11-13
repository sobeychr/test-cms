import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { onGit } from './script/onGit';
import packageJson from './package.json';

const git = onGit();
const { version = '' } = packageJson;

const envProcess = process.env || {};
const keyProcess = Object.keys(envProcess) || [];

const envFile = loadEnv('', process.cwd(), '') || {};
const customEnv = Object.keys(envFile).filter(key => !keyProcess.includes(key)).reduce((acc, key) => ({
  ...acc,
  [key]: envFile[key],
}), {});

const { SERVER_HOST, SERVER_PORT } = customEnv;

export default defineConfig({
  define: {
    'import.meta.env.ENV': JSON.stringify(customEnv),
    'import.meta.env.GIT': JSON.stringify(git),
    'import.meta.env.VERSION': JSON.stringify(version),
  },

  plugins: [sveltekit()],

  server: {
    host: SERVER_HOST,
    port: SERVER_PORT,
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
