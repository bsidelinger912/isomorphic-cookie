/**
 * @function remove
 * @description this removes a cookie
 */

import cookie from 'cookie';

import { isResWritable } from './util';

export default (name, opt, res) => {
  const options = opt = Object.assign({}, opt || {});

  if (typeof document !== 'undefined') {
    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
    document.cookie = cookie.serialize(name, '', options);
  }

  if (isResWritable(res) && res.clearCookie) {
    res.clearCookie(name, options);
  }

  // hapi
  if (isResWritable(res) && res.unstate) {
    res.unstate(name);
  }
};
