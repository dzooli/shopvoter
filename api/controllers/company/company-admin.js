module.exports = {
  friendlyName: "Company Admin list action",

  description: "Returns a list of company admins",

  inputs: {
    id: {
      type: "number",
      required: false,
    },
  },

  exits: {
    notFound: {
      description: "The company admin with specified ID is not available.",
      responseType: "notfound",
    },
  },

  fn: async function (inputs) {
    if (!this.req.wantsJSON && process.env.NODE_ENV === 'production') {
      return;
    }

    // Get all
    var cadmins,
      cadminusers = [];

    cadmins = await Userrole.find()
      .populate("role_id")
      .omit(["createdAt", "updatedAt"]);
    cadmins = cadmins.filter((element) => {
      return element.role_id.name === "companyadmin";
    });
    for (const element of cadmins) {
      var user = await User.findOne({
          id: element.user_id
        })
        .populate("company_id")
        .select(["fullName", "company_id"]);
      let newElement = _.extend(element, user, {
        id: user.id,
        companyName: user.company_id.name,
        companyId: user.company_id.id,
      });
      newElement = _.omit(newElement, ["user_id", "company_id", "role_id"]);
      cadminusers.push(newElement);
    }

    sails.log.debug("Company admins: ");
    sails.log.debug(result);
    if (typeof inputs.id === "undefined") {
      return this.res.jsonresponse({
        total: cadminusers.length, 
        items: cadminusers
      });
    }

    // Filter if id passed
    var result = cadminusers.filter((element) => {
      return element.id == inputs.id;
    });
    sails.log.debug("Company admins: ");
    sails.log.debug(result);
    return this.res.jsonresponse({
      total: (inputs.id) ? 1 : result.length,
      items: result
    });
  },
};
