module.exports = {

  friendlyName: 'View edit profile',

  description: 'Display "Edit profile" page.',

  inputs: {
    id: {
      type: "number",
      required: false,
      description: "View the edit profile page for a specified user with the given Id",
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-profile',
    },

    notfound: {
      description: "User profile not found!",
      responseType: "notfound",
    },

  },


  fn: async function (inputs) {

    var id = this.req.me.id;
    // Resopnd with $me profile
    if (typeof inputs.id !== undefined && !_.isUndefined(inputs.id)) { 
      id = inputs.id;
    }

    // Respond with the specified user
    var user = await User.findOne({id: inputs.id}).select([
      "id", 
      "fullName", 
      "emailAddress", 
      "company_id", 
      "emailChangeCandidate"
    ]);
    if (!user) {
      throw "notfound";
    }
    return {
      user: user,
    };

  }


};
