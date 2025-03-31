import { getRandomInt } from '@utils/number';

export const hasIntersection = (arr1: Array<number | string>, arr2: Array<number | string>): boolean => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return set1.intersection(set2).size > 0;
};

type parserFunction = (entry: number | object | string) => number | object | string | null;
export const generateRandomArray = (
  fromArray: Array<number | object | string>,
  length: number,
  parser: parserFunction | null,
) => {
  const newArray = [];
  const max = getRandomInt(0, length);

  for (let i = 0; i < max; i++) {
    const entry = getRandomEntry(fromArray);
    const parsed = typeof parser === 'function' && parser(entry);
    newArray.push(parsed || entry);
  }

  return newArray;
};

export const getRandomEntry = (arr: Array<number | object | string>): number | object | string => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const PERC_SHUFFLE = 0.8; // shuffle only 80% of array
export const shuffle = (arr: Array<number | object | string>): Array<number | object | string> => {
  const newArr = [...arr];
  let index = newArr.length * PERC_SHUFFLE;
  while (index > 0) {
    const rand = Math.floor(Math.random() * index);
    index--;
    [newArr[index], newArr[rand]] = [newArr[rand], newArr[index]];
  }
  return newArr;
};
