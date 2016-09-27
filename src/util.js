/**
 * @file util
 * @description some utility functions
 */

export function isResWritable(res) {
  if (!res) {
    return false
  }

  // TODO: check if this is the same in Hapi
  if (res.headersSent === true) {
    return false
  }

  return true
}
