parasails.registerPage("welcome", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: "",
    started: false,
    pageLoadedAt: Date.now(),
  },

  watch: {
    started: async function (newStarted, oldStarted) {
      await this.setMenuItemsVisibility(!newStarted);
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend({}, window.SAILS_LOCALS);
  },
  mounted: async function () {},

  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/welcome\/?([^\/]+)?\/?/,
  afterNavigate: async function (virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {
      case "hello":
        this.started = false;
        this.modal = "example";
        break;
      case "started":
        this.started = true;
        this.closeExampleModal();
        break;
      default:
        this.modal = "";
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    startApplication: async function () {
      this.goto("/welcome/started");
    },

    clickOpenExampleModalButton: async function () {
      this.goto("/welcome/hello");
      // Or, without deep links, instead do:
      // ```
      // this.modal = 'example';
      // ```
    },

    closeExampleModal: async function () {
      this.goto("/welcome");
      //this.goto("/dashboard/start");
      // Or, without deep links, instead do:
      // ```
      // this.modal = '';
      // ```
    },

    setMenuItemsVisibility: async function (visible) {
      var elements = document.querySelectorAll(".hide-on-start");
      if (visible) {
        elements.forEach((el) => {
          el.style.display = "block";
        });
        return;
      }

      elements.forEach((el) => {
        el.style.display = "none";
      });
    },
  },
});
