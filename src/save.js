/**
 * @function save
 * @description This handles saving a cookie in the browser and in memory/headers for server
 */

const cookie = require('cookie');
const _pick = require('lodash/pick');

import { encode } from './encoding';
import { isResWritable } from './util';

const whiteListOpts = [
  'domain',
  'expires',
  'path',
];

const defaultBrowserOpts = {
  path: '/',
};

const defaultExpressOpts = {
  path: '/',
};

const defaultHapiOpts = {
  path: '/',
  isHttpOnly: false,
  isSecure: false,
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
    res.state(name, encode(val), Object.assign({}, defaultHapiOpts, options));
  }
};
