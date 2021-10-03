module.exports = {
  friendlyName: "Select shop",

  description: "Select the actual shop for the user.",
  extendedDescription: `When the user is logged in first time he/she have to select the current shop. The actual user is
  only able to change tha shop right after login.`,

  exits: {
    redirect: {
      description: "Redirect to the login page if not logged in.",
      responseType: "redirect",
    },

    invalidPostData: {
      statusCode: 409,
      description: "The provided POST data is incomplete.",
    },
  },

  setNotification: function (roomName, text) {
    sails.sockets.broadcast(
      roomName,
      "session",
      { notificationText: text },
      this.req
    );
  },

  fn: async function () {
    var req = this.req;
    var body = req.body;

    let roomName = `session${_.deburr(req.sessionID)}`;
    let messageText = "Shop selected (broadcast from the backend)";
    sails.log.debug(
      "Received POST data in selet-shop action: " + JSON.stringify(body)
    );

    if (body.lastShopLogin == undefined) {
      this.setNotification("POST data error");
      throw "invalidPostData";
    }

    // Update the record for the logged-in user.
    var updatedUser = await User.updateOne({ id: req.me.id }).set({
      lastShopLogin: body.lastShopLogin,
    });
    if (!updatedUser) {
      sails.log.error(
        "Cannot update the user: " +
          JSON.stringify(req.me) +
          " with: " +
          JSON.stringify(body)
      );
      throw "notFound";
    }
    sails.log.info("User shop-select update success.");
  },
};
