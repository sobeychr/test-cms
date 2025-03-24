import { getCollection, getEntry } from 'astro:content';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getParsedCollection = async (collectionName: string, parser: Function): Promise<Array<object>> => {
  const list = await getCollection(collectionName);
  return list.map(parser);
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getParsedEntry = async (collectionName: string, id: number, parser: Function) => {
  const entry = await getEntry(collectionName, id);
  return parser(entry.data);
};
