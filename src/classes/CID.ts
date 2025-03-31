import shortHash from 'shorthash2';
import { v4 as uuid } from 'uuid';

export class CID {
  static shortHash(): string {
    return shortHash(this.uuid());
  }

  static uuid(): string {
    return uuid();
  }
}
