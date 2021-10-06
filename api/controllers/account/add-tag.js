module.exports = {
  friendlyName: "Add tag",

  description: "Creates the tag record based on the received POST data.",

  inputs: {},

  exits: {
    notyet: {
      description: "The initiated action is not yet implemented.",
      responseType: "notimplemented",
    },

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
    let res = this.res;

    sails.log.debug(
      "Received POST data in add-tag action: " + JSON.stringify(req.body)
    );

    try {
      var value = parseInt(req.body.tagValue);
    } catch (err) {
      throw "missing";
    }
    sails.log.debug("Parsed body tagValue: " + value.toString());

    /** Waterline with the default DB (actually MySQL) */
    /*
    var createdTag = await Tag.createEach([
      {
        user_id: req.me.id,
        shop_id: req.me.lastShopLogin,
        tagValue: value,
      },
    ]).fetch();
    */

    /** Use the MongoDB datastore */
    let db = sails.getDatastore("tag").manager;
    let createTime = Date.now();
    var tagDoc = new Object({
      user_id: req.me.id,
      shop_id: req.me.lastShopLogin,
      tagValue: value,
      createdAt: createTime,
      updatedAt: createTime,
    });
    await db.collection("tag").insertOne(
      tagDoc,
      {
        forceServerObjectId: true,
      },
      function (err, result) {
        if (err) {
          throw "failed";
        }
      }
    );
    /** verify for Mongo */
    let createdTagCount = await db
      .collection("tag")
      .count(tagDoc, function (err, result) {
        if (err) {
          throw "failed";
        }
      });

    /** verify for MySQL */
    /*
    sails.log.debug("Created vote: " + JSON.stringify(createdTag));
    
    if (undefined === createdTag || !createdTag) {
      throw "failed";
    }
    */
  },
};
