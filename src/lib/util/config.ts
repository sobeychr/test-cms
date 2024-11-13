const normalize = configs => Object.keys(configs).reduce((acc, key) => ({
  ...acc,
  [key]: +configs[key] || configs[key],
}), {});

const env = import.meta.env.ENV;

export const ENV = normalize(env);
export const GIT = import.meta.env.GIT;
export const VERSION = import.meta.env.VERSION;
