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
      if (await sails.helpers.hasRole(this.req.me.id, "superuser")
        || await sails.helpers.hasRole(this.req.me.id, "companyadmin"))
      {
        var user=await User.update({ id: this.req.me.id }).set({ isSuperAdmin: true });
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
