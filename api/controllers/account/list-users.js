module.exports = {


  friendlyName: 'List',


  description: 'List users.',


  inputs: {
    id: {
      type: "number",
      requied: false,
      description: "Return only the user with this id",
    },
    page: {
      type: "number",
      required: false,
      description: "Start with this page of total results",
    },
    pagesize: {
      type: "number",
      required: false,
      description: "Page size. Use this together with page parameter."
    }

  },


  exits: {
    notFound: {
      description: "The with the specified ID is not available.",
      responseType: "notfound",
    },
  },


  fn: async function (inputs) {
    var req = this.req;
    var res=this.res;

    if (!req.wantsJSON && process.env.NODE_ENV === 'production') {
      return;
    }

    var userIsSuper = await sails.helpers.hasRole(req.me.id, "superuser");
    var userIsCa=await sails.helpers.hasRole(req.me.id, "companyadmin");

    var filters = {
      id: undefined,
      company_id: 0,
    }
    // Filter for company admins
    if (!userIsSuper && userIsCa) {
      filters.company_id = req.me.company_id;
    } else if (userIsSuper) // or for super admins
    {
      filters = _.omit(filters, ["company_id"]);
    }

    if (inputs.id) {
      filters.id = inputs.id;
    }

    var totalCount = await User.count(filters);
    var users=await User.find(filters)
      .select(['id', 'fullName', 'emailAddress', 'company_id'])
      .populate('company_id');
    users.forEach(element => {
      element=_.extend(element, { companyName: element.company_id.name });
    });
    return res.jsonresponse({
      total: totalCount,
      items: users
    });
  }


};
