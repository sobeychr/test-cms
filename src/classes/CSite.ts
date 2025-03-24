import { getParsedCollection, getParsedEntry } from '@utils/collection';

type CSiteParam = {
  countries: Array<string> | null;
  end: number | null;
  id: number;
  langs: Array<string> | null;
  name: string;
  region: Array<string> | null;
  start: number | null;
};

export class CSite implements CSiteParam {
  countries;
  end;
  id;
  langs;
  name;
  region;
  start;

  constructor(data: CSiteParam) {
    this.countries = data.countries || null;
    this.end = data.end || null;
    this.id = data.id;
    this.langs = data.langs || null;
    this.name = data.name;
    this.region = data.region || null;
    this.start = data.start || null;
  }

  static async getEntryFromCollection(id: number) {
    return await getParsedEntry('sites', id, data => new CSite(data));
  }

  static async getListFromCollection() {
    return await getParsedCollection('sites', ({ data }) => new CSite(data));
  }
}
