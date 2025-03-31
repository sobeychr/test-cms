
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

export const totalFromObjectValues = (obj: object) => Object.values(obj).reduce((acc, value) => (acc += value), 0);
