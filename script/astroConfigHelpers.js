import { spawnSync } from 'node:child_process';

export const getDetails = userAgent => {
  const lower = userAgent.toLocaleLowerCase();

  const nodeValue = /node\/v(\d+\.\d+(\.d+)?)/.exec(lower) || [];
  const nodeVersion = nodeValue[1] || '!invalid';

  const npmValue = /npm\/(\d+\.\d+(\.\d+)?)/.exec(lower) || [];
  const npmVersion = npmValue[1] || '!invalid';

  const isLinux = lower.includes(' linux');
  // const isMac = false; // TODO: validate MacOS
  const isWindows = lower.includes(' win');

  return {
    nodeVersion,
    npmVersion,
    osName: isLinux && 'Linux' || isWindows && 'Windows' || '!invalid',
  };
};

export const getGitLog = () => {
  const execLog = commands => {
    const data = spawnSync(
      'git',
      commands,
      { encoding: 'utf-8', timeout: 2500 },
    );
    const str = String(data?.stdout) || '';
    return str.substring(0, str.length - 1);
  };

  const split = 'TTTT';
  const format = ['%h', '%ad'].join(split);
  const logs = execLog(['log', '--max-count=1', '--date=unix', `--pretty=${format}`]);
  const tag = execLog(['tag', '-l']);

  const logsArray = logs.split(split);

  return {
    shortHash: logsArray[0] || '!invalid',
    tag: tag || '!invalid',
    timestamp: parseInt(logsArray?.[1] || 0, 10) || '!invalid',
  };
};
