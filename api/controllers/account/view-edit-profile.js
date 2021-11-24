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

    var currentUser = await User.findOne({id: id});
    var currentUserRoles = await Userrole.find({user_id: id}).populate("role_id");
    var currentUserRoleIds = [];
    currentUserRoles.forEach(element => {
      currentUserRoleIds.push(element.role_id.level);
    });
    var currentUserHighestRole = Math.max(...currentUserRoleIds);
    
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
    var allRoles = [];
    var assignedRoles=[];
    var assignedRoleLevels=[];
    var assignedRoleIds=[];
    var userRoles=await Userrole.find({
      where: { user_id: id },
    }).populate("role_id").omit([
      "createdAt",
      "updatedAt",
      "user_id",
    ]);
    userRoles.forEach(function (element, idx)
    {
      let capName = _.capitalize(element.role_id.name);
      assignedRoles.push({
        id: element.role_id.id,
        name: capName,
        level: element.role_id.level
      });
      allRoles.push({
        id: element.role_id.id,
        name: capName,
        level: element.role_id.level,
      });
      assignedRoleLevels.push(element.role_id.level);
      assignedRoleIds.push({id: element.role_id.id});
    });

    // Find the available roles with greater or equal level as the highest (lowest level = highest priority) assigned
    var availableRoles=[];
    var unassignedRoles=[];
    availableRoles=await Role.find({ level: { '>=': currentUserHighestRole } }).select([
      "id",
      "name",
      "level"
    ]);
    availableRoles.forEach(function (element, idx)
    {
      // Do not add the already assigned roles to the unassigned list
      if (!_.find(assignedRoleIds, { id: element.id }))
      {
        let capName = _.capitalize(element.name);
        unassignedRoles.push({
          id: element.id,
          name: capName,
          level: element.level,
        });
        allRoles.push({
          id: element.id,
          name: capName,
          level: element.level,
        });
      }
    });
    unassignedRoles=_.difference(unassignedRoles, assignedRoles);

    return {
      user: user,
      rolesAvailable: unassignedRoles,
      rolesAssigned: assignedRoles,
      allRoles: allRoles,
    };

  }


};
