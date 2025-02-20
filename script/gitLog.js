import { getGitLog } from './astroConfigHelpers.js';

const log = getGitLog();

console.log('Git Log', log);
