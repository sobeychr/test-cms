type useRequestParam = {
  asJson: boolean;
  method: 'get' | 'post';
  preDelay?: number;
  postDelay?: number;
  timeout?: number;
  url: string;
};

export const useRequest = async (params: useRequestParam) => {
  const {
    asJson = true,
    method,
    preDelay = 0,
    postDelay = 0,
    timeout = 1100,
    url,
  } = params;

  const control = new AbortController();
  setTimeout(() => control.abort(), preDelay + postDelay + timeout);

  const response = await new Promise(resolve => setTimeout(() => resolve(true), preDelay))
    .then(() => fetch(url, { method, signal: control.signal }))
    .then(resp => new Promise(resolve => setTimeout(() => resolve(resp), postDelay)))
    .catch(err => err);

  const respValue = await (asJson ? response?.json() : response?.text());

  return respValue;
};
