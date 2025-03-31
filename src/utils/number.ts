export const KB = 1024;
export const MB = KB * KB;
export const GB = MB * 1024;

export const getRandomInt = (min: number, max: number): number => Math.floor(getRandomNumber(min, max));

export const getRandomNumber = (min: number, max: number): number => min + Math.random() * (max - min);

export const parseSize = (bytes: number): object => ({
  gb: bytes / GB,
  kb: bytes / KB,
  mb: bytes / MB,
});
