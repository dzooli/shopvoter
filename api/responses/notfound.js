/**
 * expired.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • serve an HTML error page about the specified token being invalid or expired
 *  • or send back 498 (Token Expired/Invalid) with no response body.
 *
 * Example usage:
 * ```
 *     return res.notfound();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingMissing: {
 *         description: 'Something is missing',
 *         responseType: 'notfound'
 *       }
 *     }
 * ```
 */
module.exports = function notfound() {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.notfound()");

  if (req.wantsJSON) {
    return res.status(404).send("404: Not Found");
  } else {
    return res.status(404).view("404");
  }
};
