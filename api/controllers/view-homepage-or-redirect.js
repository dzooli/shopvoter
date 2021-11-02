module.exports = {
  friendlyName: "View homepage or redirect",

  description:
    "Display or redirect to the appropriate homepage, depending on login status.",

  exits: {
    success: {
      statusCode: 200,
      description:
        "Requesting user is a guest, so show the public landing page.",
      viewTemplatePath: "pages/homepage",
    },

    redirect: {
      responseType: "redirect",
      description:
        "Requesting user is logged in, so redirect to the internal welcome page.",
    },
  },

  fn: async function () {
    if (this.req.me)
    {
      var isAdmin = await sails.helpers.hasRole(this.req.me.id, "superuser");
      var isCAdmin = await sails.helpers.hasRole(this.req.me.id, "companyadmin");

      if (isAdmin) {
        var user=await User.update({ id: this.req.me.id }).set({ isSuperAdmin: true });
      }
      
      if ( isAdmin || isCAdmin )
      {
        throw { redirect: "/welcome/admin" };
      }

      if (this.req.me.lastShopLogin == null) {
        throw { redirect: "/dashboard/shopselect" };
      }
      
      throw { redirect: "/welcome/hello" };
    }

    return {};
  },
};
