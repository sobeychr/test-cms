const DUR_HOUR = 60 * 60;
const DUR_DAY = DUR_HOUR * 24;
const DUR_WEEK = DUR_DAY * 7;
const DUR_MONTH = DUR_DAY * 30;
const DUR_YEAR = DUR_DAY * 365;

const DURATIONS = {
  d: DUR_DAY,
  h: DUR_HOUR,
  m: DUR_MONTH,
  w: DUR_WEEK,
  y: DUR_YEAR,
};

export const getApiDateParam = (value: number | string | null) => {
  const now = parseInt(Date.now() * 0.001, 10);

  const nowValue = value === 'now' && now;

  const regArr = /^(-)?(\d+)(h|d|w|m|y)$/.exec(value) || [];
  const [, regMulti = '+', regNum, regJump] = regArr;
  const multiplier = regMulti === '+' ? 1 : -1;
  const number = parseInt(regNum, 10) || 0;
  const jump = DURATIONS[regJump];
  const regValue = now + multiplier * number * jump;

  const numValue = parseInt(value, 10) || 0;

  return nowValue || regValue || numValue;
};
