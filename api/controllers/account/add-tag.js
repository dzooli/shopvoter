module.exports = {
  friendlyName: "Add tag",

  description: "Creates the tag record based on the received POST data.",

  inputs: {},

  exits: {
    notyet: {
      description: "The initiated action is not yet implemented.",
      responseType: "notimplemented",
    },
  },

  fn: async function (inputs) {
    var req = this.req;
    var res = this.res;

    sails.log.debug(JSON.stringify(req.body));
    //throw "notyet";
  },
};