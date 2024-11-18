import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CONFIG, ENV } from '$lib/util/config';
import { setCookie } from '$lib/util/cookie';

const { COOKIE_TOKEN, LOGIN_PASSWORD, LOGIN_USERNAME, PAGE_HOME } = CONFIG;
const { SERVER_HOST, SERVER_PORT } = ENV;

const createToken = () => {
  return 'mockToken';
};

const onLogin = async event => {
  const request = event.request;

  const referer = request.headers.get('referer') || '';
  if(!referer.includes(SERVER_HOST) || !referer.includes(SERVER_PORT)) {
    return fail(401, { hasError: true });
  }

  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  if(username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
    setCookie(event.cookies, COOKIE_TOKEN, createToken());
    return redirect(301, PAGE_HOME);
  }

  const hasError = !!(username || password);
  if(hasError) {
    return fail(401, { hasError });
  }

  return { success: false };
};

export const actions = {
  login: onLogin,
} satisfies Actions;
