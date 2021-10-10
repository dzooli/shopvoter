module.exports = {
  friendlyName: "Roles",

  description: "Account roles.",

  inputs: {
    id: {
      description: "The id of the account to retrieve the roles.",
      type: "number",
      requred: false,
    },
  },

  exits: {
    notFound: {
      description: "User not found",
      resposeType: "notfound",
    },
  },

  fn: async function (inputs) {
    const req = this.req;
    var res = this.res;
    var sId = inputs.id || req.me.id;
    if (!sId) {
      throw "notFound";
    }
    let user = await User.findOne({ id: sId });
    if (!user) {
      throw "notFound";
    }
    return sails.helpers.getUserRoles(sId);
  },
};
