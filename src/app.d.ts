// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

interface ImportMeta {
  readonly ENV: {
    SERVER_HOST: string;
    SERVER_PORT: number;
  };

  readonly GIT: {
    branch: string;
    date: Date;
    hash: string;
    tag: string;
  };
}

export {};
