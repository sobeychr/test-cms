import { lodashGet } from '@utils/data';
import { parseSize } from '@utils/number';

export const autoReplace = (str: string, entries: object) => str.replace(/\{[\w\.]+}/g, replaceStr => {
  const key = replaceStr.substring(1, replaceStr.length - 1);
  const value = lodashGet(entries, key, '');
  return value;
});

const SIZE_PRETTY = 2;
const SIZE_THRESHHOLD = 0.8;
export const byteToSizeString = (bytes: number) => {
  const { kb, mb, gb } = parseSize(bytes);

  if (gb > SIZE_THRESHHOLD) {
    return `${gb.toFixed(SIZE_PRETTY)} GB`;
  }

  if (mb > SIZE_THRESHHOLD) {
    return `${mb.toFixed(SIZE_PRETTY)} MB`;
  }

  return `${kb.toFixed(SIZE_PRETTY)} KB`;
};


export const isHtml = (text: string) => /^\</.test(text) && /\>$/.test(text);

export const isJson = (text: string) => /^(\[|\{)/.test(text) && /(\]|\})$/.test(text);

export const maxLength = (str: string, maxLength: number) => str.substring(0, Math.min(maxLength, str.length));

export const multiReplace = (str: string, entries: object) => Object.keys(entries).reduce((acc, key) => str.replace(key, entries[key]), str);
