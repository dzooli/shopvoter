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
    //    if (!this.req.wantsJSON) {
    //      return;
    //    }

    var totalCount = await User.count();
    var users = await User.find(inputs.id ? {
        id: inputs.id
      } : {})
      .select(['id', 'fullName', 'emailAddress', 'company_id'])
      .populate('company_id');
    return this.res.jsonresponse({
      total: totalCount,
      items: users
    });
  }


};
