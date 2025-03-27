import { lodashGet } from '@utils/data';
import { getRandomInt, parseSize } from '@utils/number';

export const autoReplace = (str: string, entries: object): string => str.replace(/\{[\w\.]+}/g, replaceStr => {
  const key = replaceStr.substring(1, replaceStr.length - 1);
  const value = lodashGet(entries, key, '');
  return value;
});

const SIZE_PRETTY = 2;
const SIZE_THRESHHOLD = 0.8;
export const byteToSizeString = (bytes: number): string => {
  const { kb, mb, gb } = parseSize(bytes);

  if (gb > SIZE_THRESHHOLD) {
    return `${gb.toFixed(SIZE_PRETTY)} GB`;
  }

  if (mb > SIZE_THRESHHOLD) {
    return `${mb.toFixed(SIZE_PRETTY)} MB`;
  }

  return `${kb.toFixed(SIZE_PRETTY)} KB`;
};


export const isHtml = (text: string): boolean => /^\</.test(text) && /\>$/.test(text);

export const isJson = (text: string): boolean => /^(\[|\{)/.test(text) && /(\]|\})$/.test(text);

export const maxLength = (str: string, maxLength: number): string => str.substring(0, Math.min(maxLength, str.length));

export const multiReplace = (str: string, entries: object): string => Object.keys(entries).reduce((_acc, key) => str.replace(key, entries[key]), str);

const RANDOM_STR = 'Lorem ipsum odor amet consectetuer adipiscing elit Habitasse tortor justo ex imperdiet nostra rutrum Fringilla tellus class suspendisse finibus pretium Varius aliquet ultricies rhoncus tempus suscipit turpis iaculis magna Volutpat morbi sapien pulvinar turpis scelerisque lectus et venenatis Ipsum ornare nostra vestibulum potenti diam pellentesque Magna id posuere conubia cubilia sodales ornare ullamcorper Dui ad varius viverra pretium eros iaculis urna ut facilisi';
const RANDOM_LENGTH = RANDOM_STR.length;
export const randomString = (minLength: number = 1, maxLength: number = 10) => {
  const length = getRandomInt(minLength, maxLength);
  const end = getRandomInt(length, RANDOM_LENGTH);
  const start = end - length;
  return RANDOM_STR.substring(start, end);
};

export const printCleanArray = (str: string, splitPrint: string = ', ', splitValue: string = ',') => toCleanArray(str, splitValue).join(splitPrint);

export const toCleanArray = (str: string, split: string = ',') => str.split(split).map(entry => entry.trim()).filter(String);
