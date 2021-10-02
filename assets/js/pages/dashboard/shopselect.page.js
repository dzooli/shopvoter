parasails.registerPage("shopselect", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    syncing: false,

    // Form data
    formData: {},

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {},

    // Form rules
    formRules: {
      lastShopLogin: { required: true },
    },

    // Server error state for the form
    cloudError: "",
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend(this, window.SAILS_LOCALS);
  },

  mounted: async function () {},

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function (msg) {
      // Redirect to the tagger page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      this.$root.$emit("change-notification-type", "success");
      this.$root.$emit("change-notification-dismissable", true);
      this.$root.$emit("change-notification-text", msg);
      this.goto("/welcome/started");
    },

    rejectedForm: async function (msg) {
      this.syncing = false;
      this.$root.$emit("change-notification-type", "danger");
      this.$root.$emit("change-notification-dismissable", false);
      this.$root.$emit(
        "change-notification-text",
        JSON.stringify({
          error: msg.name,
          cause: msg.responseInfo.data.cause.name,
          code: msg.responseInfo.data.cause.raw.code,
        })
      );
    },

    submitShop: async function (event) {
      var buttonValue =
        event.target.parentElement.tagName == "BUTTON"
          ? event.target.parentElement.value
          : event.target.value;
      this.formData.lastShopLogin = parseInt(buttonValue);
      if (
        this.formData.lastShopLogin !== undefined &&
        typeof this.formData.lastShopLogin == "number"
      ) {
        this.syncing = true;
        await this.$refs.form.submit();
      }
    },
  },
});
