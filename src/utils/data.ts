import { getCollection } from 'astro:content';

export const formDataToObj = (data: FormData) => {
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getParsedCollection = async (collectionName: string, parser: Function) => {
  const list = await getCollection(collectionName);
  return list.map(parser);
};

export const parseJwt = (token: string) => {
  const [, payload] = token.split('.');
  if (!payload) {
    return null;
  }
  return JSON.parse(atob(payload));
};
