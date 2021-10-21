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
  if (!req.me) {
    return res.unauthorized();
  }

  var accepted = await sails.helpers.hasRole(req.me.id, "companyadmin");
  return accepted ? proceed() : req.forbidden();
};
