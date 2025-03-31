
declare namespace App {
  import type { CLogger } from '@classes/CLogger';
  import type { CRequest } from '@classes/CRequest';
  import type { CUser } from '@classes/CUser';

  interface Locals {
    logger: CLogger;
    request: CRequest;
    user: CUser;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

interface GitInterface {
  readonly shortHash: string;
  readonly tag: string;
  readonly timestamp: number;
}

interface ImportMetaEnv {
  readonly GIT: GitInterface;
  readonly NODE_ENV: string;
  readonly SERVER_HOST: string;
  readonly SERVER_PORT: number;
  readonly VERSION: string;
}
