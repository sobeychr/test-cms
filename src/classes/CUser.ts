import { CJWT } from '@classes/CJWT';
import type { CRequest } from '@classes/CRequest';
import { COOKIE_AUTH_NAME } from '@utils/configs';

export class CUser {
  _id: string = '';

  displayName: string = '';
  email: string = '';
  isLoggedIn: boolean = false;

  constructor(request: CRequest) {
    const authToken = request.cookies.get(COOKIE_AUTH_NAME)?.value || '';
    const { email } = CJWT.parseJwt(authToken) || {};

    if (!!email) {
      const cutEmail = /(\w+)\@/.exec(email) || [];
      this.displayName = cutEmail[1] || email;
      this.email = email;
      this.isLoggedIn = true;
    }

    Object.freeze(this);
  }
}
