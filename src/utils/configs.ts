import { DUR_MONTH, DUR_WEEK } from './date';

export const GIT = import.meta.env.GIT;
export const IS_DEV = import.meta.env.DEV;
export const LOGS_DIR = import.meta.env.LOGS_DIR;
export const VERSION = import.meta.env.VERSION;

export const API_PREFIX = '/api/';

export const COOKIE_AUTH_NAME = 'auth';
export const COOKIE_AUTH_DURATION = DUR_WEEK;
export const COOKIE_DARK_NAME = 'dark';
export const COOKIE_DARK_DURATION = DUR_MONTH;

export const PAGE_HOME = '/';
export const PAGE_LOGIN = '/login';

export const ERRORS = {
  cookieAuth: {
    code: 1001,
    message: 'Invalid cookie auth',
    status: 401,
  },
  siteId: {
    code: 1101,
    message: 'Invalid site id',
    status: 400,
  },
  siteInvalid: {
    code: 1102,
    message: 'Invalid selected site',
    status: 400,
  },
  siteNoChange: {
    code: 1103,
    message: 'No changes found',
    status: 400,
  },
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
export const STATUS_TEXT = {
  200: 'Ok',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};
