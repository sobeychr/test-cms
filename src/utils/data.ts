import { isJson } from '@utils/string';

export const incrementObject = (obj: object, key: string) => {
  if (typeof obj[key] === 'number') {
    obj[key]++;
  }
  else {
    obj[key] = 1;
  }
};

export const iteratorToObj = (data: Iterator): object => {
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  return obj;
};

// https://jwt.io/introduction
export const generateMockJwt = (data: object) => {
  const header = btoa(JSON.stringify({ alg: 'mocked', typ: 'JWT' }));
  const payload = btoa(JSON.stringify(data));
  const signature = btoa('some-mocked-signature');
  return [header, payload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');
};

const LODASH_GET_LIMIT = 50;
export const lodashGet = (data: object, keys: Array<string> | string, fallback: string = '') => {
  const keyPath = Array.isArray(keys) ? keys : keys.split('.');

  let index = 0;
  let val = data;
  const length = keyPath.length;
  while (val !== null && val !== undefined && index < length) {
    val = val[keyPath[index++]];

    if (index >= LODASH_GET_LIMIT) {
      break;
    }
  }

  return val === undefined ? fallback : val;
};

export const logStrToArray = (filestring: string): Array<object> => filestring.split('\n').filter(isJson).map(line => JSON.parse(line));

export const parseJwt = (token: string) => {
  const [, payload] = token.split('.');
  if (!payload) {
    return null;
  }
  return JSON.parse(atob(payload));
};
