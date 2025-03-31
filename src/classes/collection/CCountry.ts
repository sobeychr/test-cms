import { getParsedCollection, getParsedEntry } from '@utils/collection';

type CCountryParam = {
  cca2: string;
  cca3: string;
  id: string;
  name: string;
  region: string;
};

export class CCountry implements CCountryParam {
  cca2;
  cca3;
  id;
  name;
  region;

  constructor(data: CCountryParam) {
    this.cca2 = data.cca2;
    this.cca3 = data.cca3;
    this.id = data.id;
    this.name = data.name;
    this.region = data.region;
  }

  static async getEntryFromCollection(id: string): Promise<CCountry> {
    return await getParsedEntry('countries', id, data => new CCountry(data));
  }

  static async getListFromCollection(): Promise<Array<CCountry>> {
    return await getParsedCollection('countries', ({ data }) => new CCountry(data));
  }
};
