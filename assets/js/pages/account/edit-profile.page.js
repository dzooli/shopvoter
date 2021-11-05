parasails.registerPage("edit-profile", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    caEndpoint: "companyAdmin",
    companyAdmins: {},

    // Main syncing/loading state for this page.
    syncing: false,

    // Form data
    formData: {
      /* … */
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // Form rules
    formRules: {
      id: {
        required: true,
      },
      fullName: {
        required: true
      },
      emailAddress: {
        required: true,
        isEmail: true
      },
      companyAdmin: {
        required: true
      },
    },

    // Server error state for the form
    cloudError: "",
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function () {
    _.extend(this, window.SAILS_LOCALS);

    // Set the form data.
    this.formData.id = this.user.id;
    this.formData.companyAdmin = this.user.company_id;
    this.formData.fullName = this.user.fullName;
    this.formData.emailAddress = this.user.emailChangeCandidate ?
      this.user.emailChangeCandidate :
      this.user.emailAddress;

    this.$emit("update:syncing", true);
    this.syncing = true;
    var admins = await Cloud[this.caEndpoint].with({}).tolerate((err) => {
      this.$emit("update:cloudError", "failedWithCloudExit");
      console.log("Failed to get the company admin list!");
    });
    this.companyAdmins = admins ? admins.data : undefined;
    this.$emit("update:syncing", false);
    this.syncing = false;
  },

  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function () {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = "/account?id=" + this.user.id;
    },
  },
});
