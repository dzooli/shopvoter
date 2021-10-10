module.exports = {
  friendlyName: "Get user roles",

  description: "Get the list of associated roles of the given user.",

  inputs: {
    id: {
      type: "number",
      required: true,
      description: "The id of the user for getting the associated roles.",
      example: 1,
    },
  },

  exits: {
    success: {
      outputFriendlyName: "User roles",
    },
  },

  fn: async function (inputs) {
    if (!inputs.id) {
      return {};
    }
    // Get user roles.
    var userRoles = await Userrole.find({ user_id: inputs.id }).populate(
      "role_id"
    );

    var result = {
      user_id: inputs.id,
      roles: [],
    };
    userRoles.forEach((element) => {
      let sanitized = {
        id: element.role_id.id,
        name: element.role_id.name,
        level: element.role_id.level,
        description: element.role_id.description,
      };
      result.roles.push(sanitized);
    });
    // Send back the result through the success exit.
    return result;
  },
};
