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
  },

  fn: async function () {
    // TODO: process this.req.body and store the changes in the User model
    let roomName = `session${_.deburr(this.req.sessionID)}`;
    let messageText = "Shop selected (broadcast from the backend)";
    sails.log.debug(
      "Received POST data in selet-shop action: " +
        JSON.stringify(this.req.body)
    );
    sails.sockets.broadcast(
      roomName,
      "session",
      { notificationText: messageText },
      this.req
    );
  },
};
