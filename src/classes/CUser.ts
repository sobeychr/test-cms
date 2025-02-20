import type { CRequest } from '@classes/CRequest';

export class CUser {
  _id: string;

  isLoggedIn: boolean;
  name: string;

  constructor(request: CRequest) {
    // this.isLoggedIn = request.cookies.get('auth') === '1';
    this.isLoggedIn = request.cookies.has('auth');

    this.name = request.cookies.get('auth')?.value || 'lorem-ipsum';
  }
}
