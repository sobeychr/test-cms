declare namespace App {
  import type { CRequest } from '@classes/CRequest';
  import type { CUser } from '@classes/CUser';

  interface Locals {
    request: CRequest;
    user: CUser;

    alpha: string;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly SERVER_HOST: string;
  readonly SERVER_PORT: number;
}
