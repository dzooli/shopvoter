module.exports={

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


  fn: async function (inputs)
  {

    var id=this.req.me.id;
    // Resopnd with $me profile
    if (typeof inputs.id!==undefined&&!_.isUndefined(inputs.id))
    {
      id=inputs.id;
    }

    // Respond with the specified user
    var user=await User.findOne({ id: inputs.id }).select([
      "id",
      "fullName",
      "emailAddress",
      "company_id",
      "emailChangeCandidate"
    ]);
    if (!user)
    {
      throw "notfound";
    }

    // Lowest role level is the role with max(level)
    var allRoles=await Role.find({ sort: 'level DESC' }).select(["level"]);
    var maxLevel=100;
    if (allRoles)
    {
      maxLevel=allRoles[0].level;
    }

    // Prepare the assigned roles return value
    var assignedRoles = [];
    var assignedRoleLevels = [];
    var userRoles=await Userrole.find({
      where: { user_id: id },
    }).populate("role_id").omit([
      "createdAt",
      "updatedAt",
      "user_id",
    ]);
    userRoles.forEach(function (element, idx) {
      assignedRoles.push({
        id: element.role_id.id,
        name: element.role_id.name,
        level: element.role_id.level
      });
      assignedRoleLevels.push(element.role_id.level);
    });

    // Find the available roles with greater or equal level as the highest (lowest level = highest priority) assigned
    var availableRoles = [];
    var userLevel=maxLevel;
    if (assignedRoles)
    {
      userLevel=Math.min(...assignedRoleLevels);
    }
    availableRoles=await Role.find({ level: { '>=': userLevel } }).select([
      "id",
      "name",
      "level"
    ]);

    return {
      user: user,
      rolesAvailable: availableRoles,
      rolesAssigned: assignedRoles
    };

  }


};
