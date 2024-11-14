const normalize = configs => Object.keys(configs).reduce((acc, key) => ({
  ...acc,
  [key]: +configs[key] || configs[key],
}), {});

const env = import.meta.env.ENV;

export const CONFIG = {
  COOKIE_DURATION: 60 * 60 * 24,
  COOKIE_TOKEN: 'authtoken',

  PAGE_LOGIN: '/login',
  PAGE_HOME: '/',

  LOGIN_PASSWORD: 'test1234',
  LOGIN_USERNAME: 'test1234',
};
export const ENV = normalize(env);
export const GIT = import.meta.env.GIT;
export const VERSION = import.meta.env.VERSION;
