export const isHtml = (text: string) => /^\</.test(text) && /\>$/.test(text);

export const isJson = (text: string) => /^(\[|\{)/.test(text) && /(\]|\})$/.test(text);
