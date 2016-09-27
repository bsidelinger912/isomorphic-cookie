/**
 * @file encoding
 * @description this holds encoding and decoding logic in a centralized place
 */

const base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$");

/**
 * checks for base64 encoding by trying to decode
 */
function isBase64(string) {
  return base64Matcher.test(string);
}

/**
 * this handles encoding so that encoding and decoding logic are co-located
 */
export function encode(value) {
  let returnValue = value;

  // convert objects to strings first
  if (typeof returnValue === 'object') {
    returnValue = JSON.stringify(returnValue);
  }

  // if it's not base64 encoded, we need to uri encode it
  if (!isBase64(returnValue)) {
    returnValue = encodeURIComponent(returnValue);
  }

  return returnValue;
}


export function decode(value, doNotParse) {
  let returnValue = value;

  // if they passed a base64 value, we didn't encode and won't mess
  if (!isBase64(returnValue)) {
    // if it wasn't base64, we uri encoded when setting, so decode
    returnValue = decodeURIComponent(value);
  }

  // check if it's JSON
  if (!doNotParse) {
    try {
      returnValue = JSON.parse(returnValue);
    } catch (e) {
      // leave it be, it's a string
    }
  }

  return returnValue;
}
