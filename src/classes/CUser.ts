import type { CRequest } from '@classes/CRequest';
import { COOKIE_AUTH } from '@utils/configs';

export class CUser {
  _id: string;

  isLoggedIn: boolean;
  name: string;

  constructor(request: CRequest) {
    // this.isLoggedIn = request.cookies.get('auth') === '1';
    this.isLoggedIn = request.cookies.has(COOKIE_AUTH);

    this.name = request.cookies.get(COOKIE_AUTH)?.value || 'lorem-ipsum';
  }
}
