import { spawnSync } from 'node:child_process';

const PRETTY = ['', '%h', '%ct', ''];
const SPLIT_CHAR = '\n';

const onCommand = command => {
  const git = spawnSync('git', command);
  const { stdout } = git;
  return stdout ? stdout.toString('utf8') : null;
}

export const onGit = () => {
  const gitLogs = onCommand(['log', '-l', 1, `--pretty="${PRETTY.join(SPLIT_CHAR)}"`]);
  const gitBranch = onCommand(['branch', '--show-current']);
  const gitTag = onCommand(['tag', '--contains', 'HEAD']);

  const [
    ,
    hash,
    timestamp,
  ] = gitLogs.split(SPLIT_CHAR);

  const date = new Date(timestamp * 1000);
  const data = {
    hash,
    date,
    branch: gitBranch.replace('\n', ''),
    tag: gitTag,
  };

  // console.log('onGit', data);
  return data;
};
