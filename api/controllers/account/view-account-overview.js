module.exports = {
  friendlyName: "View account overview",

  description: 'Display "Account Overview" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/account/account-overview",
    },
  },

  fn: async function () {
    var company = await Company.findOne({
      id: this.req.me.company_id
    });

    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.
    return {
      stripePublishableKey: sails.config.custom.enableBillingFeatures ?
        sails.config.custom.stripePublishableKey :
        undefined,
      companyName: company ? company.name : "unknown",
    };
  },
};
