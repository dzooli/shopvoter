module.exports = {


  friendlyName: 'Select shop',


  description: 'Select the actual shop for the user.',
  extendedDescription: `When the user is logged in first time he/she have to select the current shop. The actual user is
  only able to change tha shop right after login.`,


  inputs: {
    shop_id: {
      type: 'number',
      example: '1',
      description: "The shop id",
      whereToGet: { description: "Select the shop after login with the shown buttons."},
    }

  },

  exits: {
    redirect: {
      description: "Redirect to the login page if not logged in."
      responseType: "redirect"
    },

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
