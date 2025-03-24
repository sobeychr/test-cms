import { getCollection } from 'astro:content';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const getParsedCollection = async (collectionName: string, parser: Function): Promise<Array<object>> => {
  const list = await getCollection(collectionName);
  return list.map(parser);
};
