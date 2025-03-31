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
  siteNoName: {
    code: 1104,
    message: 'No name provided',
    status: 400,
  },
  sitePreexistName: {
    code: 1105,
    message: 'Site name already exist',
    status: 400,
  },
};
