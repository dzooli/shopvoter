/**
 * expired.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • serve an HTML error page about the specified token being invalid or expired
 *  • or send back 498 (Token Expired/Invalid) with no response body.
 *
 * Example usage:
 * ```
 *     return res.notimplemented();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       notyet: {
 *         description: 'The initiated action is not yet implemented.',
 *         responseType: 'notimplemented'
 *       }
 *     }
 * ```
 */
module.exports = function notimplemented() {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.notimplemented()");

  if (req.wantsJSON) {
    return res.status(499).send("Not implemented function.");
  } else {
    return res.status(498).view("499");
  }
};
