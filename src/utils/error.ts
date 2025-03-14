export const ERRORS = {
  cookieAuth: {
    code: 1001,
    message: 'Invalid cookie auth',
    status: 401,
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
