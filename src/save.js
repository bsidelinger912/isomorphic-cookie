/**
 * @function save
 * @description This handles saving a cookie in the browser and in memory/headers for server
 */

const cookie = require('cookie');
const _pick = require('lodash.pick');

import { encode } from './encoding';
import { isResWritable } from './util';

const whiteListOpts = [
  'domain',
  'expires',
  'path',
  'secure',
  'httpOnly',
];

export const defaultBrowserOpts = {
  path: '/',
  secure: true,
};

export const defaultExpressOpts = {
  path: '/',
  secure: true,
};

export const defaultHapiOpts = {
  path: '/',
  isSecure: true,
};

export default (name, val, opt = {}, res) => {
  const options = _pick(opt, whiteListOpts);

  // browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, encode(val), Object.assign({}, defaultBrowserOpts, options));
  }

  // express
  if (isResWritable(res) && res.cookie) {
    res.cookie(name, encode(val), Object.assign({}, defaultExpressOpts, options));
  }

  // hapi
  if (isResWritable(res) && res.state) {
    if ('undefined' !== typeof options.secure) {
      options.isSecure = options.secure;
    }
    res.state(name, encode(val), Object.assign({}, defaultHapiOpts, options));
  }
};
