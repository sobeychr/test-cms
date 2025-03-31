import { getParsedCollection, getParsedEntry } from '@utils/collection';

type CRegionParam = {
  id: number;
  name: string;
};

export class CRegion implements CRegionParam {
  id;
  name;

  constructor(data: CRegionParam) {
    this.id = data.id;
    this.name = data.name;
  }

  static async getEntryFromCollection(id: number): Promise<CRegion> {
    return await getParsedEntry('regions', id, data => new CRegion(data));
  }

  static async getListFromCollection(): Promise<Array<CRegion>> {
    return await getParsedCollection('regions', ({ data }) => new CRegion(data));
  }
}
