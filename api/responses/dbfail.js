/**
 * dbfail.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • serve an HTML error page about the specified token being invalid or expired
 *  • or send back 498 (Token Expired/Invalid) with no response body.
 *
 * Example usage:
 * ```
 *     return res.dbfail();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingMissing: {
 *         description: 'Something is missing',
 *         responseType: 'dbfail'
 *       }
 *     }
 * ```
 */
module.exports = function dbfail() {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.dbfail()");

  if (req.wantsJSON) {
    return res.status(480).send("480: DB operation fail");
  } else {
    return res.status(480).view("480");
  }
};
