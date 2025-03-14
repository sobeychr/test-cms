export const autoReplace = (str: string, entries: object) => str.replace(/\{\w+\}/g, replaceStr => {
  const objKey = replaceStr.substring(1, replaceStr.length - 1);
  return entries[objKey];
});

export const isHtml = (text: string) => /^\</.test(text) && /\>$/.test(text);

export const isJson = (text: string) => /^(\[|\{)/.test(text) && /(\]|\})$/.test(text);

export const multiReplace = (str: string, entries: object) => Object.keys(entries).reduce((acc, key) => str.replace(key, entries[key]), str);
