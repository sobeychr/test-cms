import type { CRequest } from '@classes/CRequest';
import { COOKIE_AUTH_NAME } from '@utils/configs';
import { parseJwt } from '@utils/data';

export class CUser {
  _id: string;

  email: string;
  isLoggedIn: boolean = false;

  constructor(request: CRequest) {
    const authToken = request.cookies.get(COOKIE_AUTH_NAME)?.value || '';
    const { email } = parseJwt(authToken) || {};

    if (!!email) {
      this.email = email;
      this.isLoggedIn = true;
    }
  }
}
