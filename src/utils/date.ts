export const DUR_HOUR = 60 * 60;
export const DUR_DAY = DUR_HOUR * 24;
export const DUR_WEEK = DUR_DAY * 7;
export const DUR_MONTH = DUR_DAY * 30;
export const DUR_YEAR = DUR_DAY * 365;

const DURATIONS = {
  d: DUR_DAY,
  h: DUR_HOUR,
  m: DUR_MONTH,
  w: DUR_WEEK,
  y: DUR_YEAR,
};

export const getApiDateParam = (value: number | string | null): number => {
  const now = parseInt(Date.now() * 0.001, 10);

  const nowValue = value === 'now' && now;

  const regArr = /^(\+|-)?(\d+)(h|d|w|m|y)$/.exec(value) || [];
  const [, regMulti = '+', regNum, regJump] = regArr;
  const multiplier = regMulti === '+' ? 1 : -1;
  const number = parseInt(regNum, 10) || 0;
  const jump = DURATIONS[regJump];
  const regValue = now + multiplier * number * jump;

  const numValue = parseInt(value, 10) || 0;

  return nowValue || regValue || numValue;
};

export const dateToDateString = (date: Date): string => [
  date.getFullYear(),
  (date.getMonth() + 1).toString().padStart(2, '0'),
  date.getDate().toString().padStart(2, '0'),
].join('-');

export const dateToFullString = (date: Date): string => dateToDateString(date) + ' ' + dateToTimeString(date);

export const dateToTimeString = (date: Date): string => [
  date.getHours().toString().padStart(2, '0'),
  date.getMinutes().toString().padStart(2, '0'),
  date.getSeconds().toString().padStart(2, '0'),
].join(':');

export const isValid = (date: Date) => date instanceof Date && !isNaN(date);
