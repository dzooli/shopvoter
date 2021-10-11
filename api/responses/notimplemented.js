/**
 * notimplemented.js
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
    return res.status(499).view("499");
  }
};
