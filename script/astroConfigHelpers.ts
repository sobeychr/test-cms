type getDetailsReturn = {
  nodeVersion: string;
  npmVersion: string;
  osName: 'Linux' | 'Mac' | 'Windows' | '!invalid';
};

export const getDetails = (userAgent: string): getDetailsReturn => {
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
  }
};
