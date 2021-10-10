/**
 * is-super-admin
 *
 * A simple policy that blocks requests from non-company-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (!req.me) {
    return res.unauthorized();
  }

  if (!req.me.roles) {
    sails.log.debug("Forbidden do to non super-admin");
    return res.forbidden();
  }
  sails.log.debug("Checking for company admin role...");
  var accepted = await sails.helpers.hasRole(req.me.id, "companyadmin");
  return accepted ? proceed() : req.forbidden();
};
