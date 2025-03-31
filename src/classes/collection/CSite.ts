import { getParsedCollection, getParsedEntry } from '@utils/collection';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type CSiteParam = {
  countries: Array<string> | null;
  end: number | null;
  id: number;
  langs: Array<string> | null;
  name: string;
  region: Array<string> | null;
  slug: string;
  start: number | null;
};

export class CSite implements CSiteParam {
  countries;
  end;
  id;
  langs;
  name;
  region;
  slug;
  start;

  constructor(data: CSiteParam) {
    this.countries = data.countries || null;
    this.end = data.end || null;
    this.id = data.id;
    this.langs = data.langs || null;
    this.name = data.name;
    this.region = data.region || null;
    this.slug = data.slug || data.id || null;
    this.start = data.start || null;
  }

  writeFile() {
    const filepath = resolve('./src/collections/sites/', `mocks/${this.id}.json`);
    const data = JSON.stringify(this);
    writeFileSync(filepath, data);
  }

  static async getEntryFromCollection(id: number): Promise<CSite> {
    return await getParsedEntry('sites', id, data => new CSite(data)).catch(() => null);
  }

  static async getListFromCollection(): Promise<Array<CSite>> {
    return await getParsedCollection('sites', ({ data }) => new CSite(data)).catch(() => []);
  }

  static sortById(a: CSite, b: CSite): number {
    return a.id > b.id ? 1 : -1;
  }

  static sortByName(a: CSite, b: CSite): number {
    return a.name.localeCompare(b.name);
  }
}
