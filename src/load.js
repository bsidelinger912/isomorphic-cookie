/**
 * @function load
 * @description this loads a cookie
 */

import cookie from 'cookie';

import { decode } from './encoding';

export default (name, request, doNotParse) => {
  let cookies;

  if (typeof document !== 'undefined') {
    cookies = cookie.parse(document.cookie);
  } else if (request) {
    // grab cookies from the request if they pass it
    // @TODO: find out and comment exactly which servers and such these support
    if (request.cookie) {
      cookies = request.cookie;

    } else if (request.cookies) {
      cookies = request.cookies;

    } else if (request.headers && request.headers.cookie) {
      cookies = cookie.parse(request.headers.cookie);
    }
  }

  const cookieVal = cookies && decode(cookies[name], doNotParse);

  return cookieVal;
};
