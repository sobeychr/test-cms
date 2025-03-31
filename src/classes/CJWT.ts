export class CJWT {

  // https://jwt.io/introduction
  static generateMock(data: object): string {
    const header = btoa(JSON.stringify({ alg: 'mocked', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(data));
    const signature = btoa('some-mocked-signature');
    return [header, payload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');
  }

  static parseJwt(token: string): object | null {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }
    return JSON.parse(atob(payload));
  }
}
