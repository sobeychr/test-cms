
const LODASH_GET_LIMIT = 50;
export const lodashGet = (data: object, keys: Array<string> | string, fallback: string = ''): number | object | string | null | undefined => {
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
