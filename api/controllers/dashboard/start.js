module.exports = {
  friendlyName: "Start",

  description: "Start dashboard.",

  inputs: {},

  exits: {
    success: {
      description:
        "Successful login and App started with disabled config options.",
    },

    redirect: {
      responseType: "redirect",
      description:
        "Logged in user starts the application after optinal configuration changes.",
    },

    notLoggedIn: {
      responseType: "unauthorized",
      description:
        "That email address and password combination is not recognized.",
    },
  },

  fn: async function (inputs) {
    if (this.req.me) {
      this.res.locals.appRunning = true;
      console.log(this.res.locals.appRunning);
      throw { redirect: "/welcome/started?start=1" };
    }
    throw "notLoggedIn";
  },
};
