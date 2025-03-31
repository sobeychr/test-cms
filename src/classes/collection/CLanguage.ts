import { getParsedCollection, getParsedEntry } from '@utils/collection';

type CLanguageParam = {
  id: number;
  name: string;
  iso: string;
};

export class CLanguage implements CLanguageParam {
  id;
  name;
  iso;

  constructor(data: CLanguageParam) {
    this.id = data.id;
    this.name = data.name;
    this.iso = data.iso;
  }

  static async getEntryFromCollection(id: number): Promise<CLanguage> {
    return await getParsedEntry('languages', id, data => new CLanguage(data));
  }

  static async getListFromCollection(): Promise<Array<CLanguage>> {
    return await getParsedCollection('languages', ({ data }) => new CLanguage(data));
  }
}
