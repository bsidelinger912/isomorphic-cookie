/**
 * @function remove
 * @description this removes a cookie
 */

import cookie from 'cookie';

import { isResWritable } from './util';

export default (name, opt, res) => {
  if (typeof opt === 'undefined') {
    opt = {};
  } else if (typeof opt === 'string') {
    // Will be deprecated in future versions
    opt = { path: opt };
  } else {
    // Prevent mutation of opt below
    opt = Object.assign({}, opt);
  }

  if (typeof document !== 'undefined') {
    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
    document.cookie = cookie.serialize(name, '', opt);
  }

  if (isResWritable(res) && res.clearCookie) {
    res.clearCookie(name, opt);
  }

  // hapi
  if (isResWritable(res) && res.unstate) {
    res.unstate(name);
  }
};
