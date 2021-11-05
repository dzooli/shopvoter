module.exports = {
  friendlyName: "View account overview",

  description: 'Display "Account Overview" page.',

  inputs: {
    id: {
      type: "number",
      required: false,
    },
  },

  exits: {
    success: {
      viewTemplatePath: "pages/account/account-overview",
    },
    notfound: {
      description: "User not found",
      responseType: "notfound",
    },
    unauthorized: {
      description: "Not authorized action",
      responseType: "unauthorized"
    }
  },

  fn: async function (inputs) {
    let req = this.req;
    let res = this.res;
    let user = req.me;
    
    if (typeof inputs !== undefined && !_.isUndefined(inputs.id)) {
      sails.log.debug("Typeof inputs.id: ", typeof inputs);
      user = await User.findOne({id: inputs.id});
    }
    if (!user) {
      throw "notfound";
    }

    let companyId = user.company_id;

    var userIsSuper = await sails.helpers.hasRole(req.me.id, "superuser");
    var userIsCa=await sails.helpers.hasRole(req.me.id, "companyadmin");

    // admins can view all user profiles
    if (userIsSuper 
    // companyadmins can view user profiles from the same company
    || (userIsCa && req.me.company_id == companyId)
    ) {
      let company = await Company.findOne({
        id: companyId,
      });

      // If billing features are enabled, include our configured Stripe.js
      // public key in the view locals.  Otherwise, leave it as undefined.
      var result = {
        stripePublishableKey: sails.config.custom.enableBillingFeatures ?
          sails.config.custom.stripePublishableKey :
          undefined,
        companyName: company ? company.name : "unknown",
        user: user,
      };
      return result;
    } else {
      throw 'unauthorized';
    }
  },
};
