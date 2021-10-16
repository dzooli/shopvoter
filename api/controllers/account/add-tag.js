module.exports = {
  friendlyName: "Add tag",

  description: "Creates the tag record based on the received POST data.",

  inputs: {},

  exits: {
    missing: {
      description: "Something is missing.",
      responseType: "notfound",
    },

    failed: {
      description: "DB opertion has been failed",
      responseType: "dbfail",
    },
  },

  fn: async function (inputs) {
    let req = this.req;

    sails.log.debug(
      "Received POST data in add-tag action: " + JSON.stringify(req.body)
    );

    try {
      var value = parseInt(req.body.tagValue);
    } catch (err) {
      throw "missing";
    }
    sails.log.debug("Parsed body tagValue: " + value.toString());

    var createdTag = await Tag.createEach([
      {
        user_id: req.me.id,
        shop_id: req.me.lastShopLogin,
        tagValue: value,
      },
    ]).fetch();    
    sails.log.debug("Created vote: " + JSON.stringify(createdTag));
    
    if (undefined === createdTag || !createdTag) {
      throw "failed";
    }
    
  },
};
