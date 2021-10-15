module.exports = {
  friendlyName: "View shopselect",

  description: 'Display "Shopselect" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/dashboard/shopselect",
    },
  },

  fn: async function () {
    var fullUser = await User.findOne({ id: this.req.me.id }).populate(
      "company_id"
    );

    var shopsAssigned = await Usershop.find({
      user_id: this.req.me.id,
    })
      .populate("shop_id")
      .catch(function (err) {
        sails.log.error(err);
        throw serverError(err);
      });

    data = [];
    let id = 0;
    for (const shop of shopsAssigned) {
      let city = await City.findOne({ id: shop.shop_id.city_id });
      data.push({ id, shop, city });
      id++;
    }

    msg = "";
    if (!this.req.me.lastShopLogin) {
      msg = "You have no default shop selected. Select one first!";
    }
    if (!this.req.me.company_id)
    {
      msg+=" You have no Company! Update your profile first!";
      data=null;
    }

    return {
      msg: msg,
      company: fullUser.company_id,
      shops: data,
    };
  },
};
