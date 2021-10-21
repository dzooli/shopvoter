/**
 * is-admin
 *
 * A simple policy that blocks requests from non-<company|super>-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports=async function (req, res, proceed)
{
  if (!req.me)
  {
    return res.unauthorized();
  }
  compAdmin=await sails.helpers.hasRole(req.me.id, "companyadmin");
  superAdmin=await sails.helpers.hasRole(req.me.id, "superuser");
  return (compAdmin || superAdmin) ? proceed() : req.forbidden();
};
