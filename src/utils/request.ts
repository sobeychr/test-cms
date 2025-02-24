type useRequestParam = {
  asJson: boolean;
  getData: object;
  method: 'get' | 'post';
  postData: object;
  postDelay?: number;
  preDelay?: number;
  timeout?: number;
  url: string;
};

export const useRequest = async (params: useRequestParam) => {
  const {
    asJson = true,
    getData = {},
    method: methodParam,
    postData = {},
    postDelay = 0,
    preDelay = 0,
    timeout = 1100,
    url,
  } = params;

  const control = new AbortController();
  setTimeout(() => control.abort(), preDelay + postDelay + timeout);

  const method = methodParam || Object.keys(postData).length > 0 && 'post' || 'get';
  const query = new URLSearchParams(getData);
  const queryString = query.size === 0 ? '' : `?${query.toString()}`;
  const newUrl = url.concat(queryString);

  const options = {
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    signal: control.signal,
  };

  const response = await new Promise(resolve => setTimeout(() => resolve(true), preDelay))
    .then(() => fetch(newUrl, options))
    .then(resp => new Promise(resolve => setTimeout(() => resolve(resp), postDelay)))
    .catch(err => err);

  const respJson = await response?.json().catch(() => null);
  const respText = await response?.text().catch(() => null);
  const resp = asJson && respJson || respText;

  if (!response.ok || !resp) {
    console.error(
      '[useRequest] unable to return proper value',
      newUrl,
      respJson,
      respText,
    );
  }

  return resp;
};
