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

export const parseJwt = (token: string) => {
  const [, payload] = token.split('.');
  if (!payload) {
    return null;
  }
  return JSON.parse(atob(payload));
};
