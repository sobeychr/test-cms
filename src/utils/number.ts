export const KB = 1024;
export const MB = KB * KB;
export const GB = MB * 1024;

export const parseSize = (bytes: number): object => ({
  gb: bytes / GB,
  kb: bytes / KB,
  mb: bytes / MB,
});
