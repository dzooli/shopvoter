module.exports = {
  friendlyName: "Has role",

  description:
    "Returns true or false depending on the specified role has association to the user (identified by inputs.id).",

  inputs: {
    id: {
      type: "number",
      required: true,
      description: "The id of the user for getting the specific roles.",
      example: 1,
    },
    role: {
      type: "string",
      required: true,
      description: "The specific role name to search",
      example: "superuser",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    var roles=await sails.helpers.getUserRoles(inputs.id);
    var hasRole = false;
    if (roles.roles) {
      roles.roles.forEach((element) => {
        if (element.name === inputs.role) {
          hasRole = true;
        }
      });
    }
    return hasRole;
  },
};
