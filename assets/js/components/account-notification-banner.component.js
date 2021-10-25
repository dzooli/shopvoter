/**
 * <account-notification-banner>
 * ----------------------------------------------------------------------------------------------------------------------
 *
 * @type {Component}
 *
 * @event change-notification-type   [change the alert type to a BS alert class. example: 'success' means 'alert-success']
 * @event change-notification-text   [change the alert text']
 * @event change-notification-dismissable   [change the alert dismissable status']
 *
 * @property text [initial text to display]
 * -----------------------------------------------------------------------------------------------------------------------
 */

parasails.registerComponent("account-notification-banner", {
  //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝║ ║╠╩╗║  ║║    ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩  ╩╚═╚═╝╩  ╚═╝
  props: ["text"],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      dismissable: true,
      type: "alert-warning",
      notificationText: "",
      roomName: undefined,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div>
    <div class="container-fluid flex-lg-row flex-md-fill justify-content-between"
      style="display: flex;"
      @click.prevent="_dismiss"
    >
      <div ref="messageDiv"
        v-bind:class="[ dismissable ? 'alert-dismissable' : '', type, 'alert', 'mt-2', 'flex-fill', 'small']"
        role="alert" v-if="notificationText"
      >
        {{notificationText}}
      </div>
      <a role="alert"
        href=""
        v-if="dismissable && notificationText"
        @click.prevent=""
        v-bind:class="['alert', 'alert-dismissable', type, 'fa', 'fa-close', 'mt-2', 'small', 'nav-link']"
      >
      </a>
    </div>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  mounted: async function ()
  {
    await Cloud.observeMySession();
    // Listen for updates to the user's session
    Cloud.on("session", (msg) =>
    {
      if (msg.notificationText) {
        this._changeType("warning");
        this.notificationText = msg.notificationText;
      } else
      {
        this.notificationText = "";
      }
    });
    this.$root.$on("change-notification-type", this._changeType);
    this.$root.$on("change-notification-text", this._changeText);
    this.$root.$on("change-notification-dismissable", this._setDissmissable);
  },

  beforeMount: function () {
    if (this.text) {
      this.notificationText = this.text;
    }
  },

  beforeDestroy: function () {
    Cloud.off("session");
    this.$root.$off("change-notification-type");
    this.$root.$off("change-notification-text");
    this.$root.$off("change-notification-dismissable");
  },

  watch: {
    loggedInUserId: function (unused) {
      throw new Error(
        "Changes to `loggedInUserId` are not currently supported in <account-notification-banner>!"
      );
    },
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ║╣ ╚╗╔╝║╣ ║║║ ║   ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    //…
    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // > Public methods are rarely exposed by Vue components, but sometimes they
    // > are an important escape hatch.  They are callable via something like
    // > `this.$refs.componentNameInCamelCase.doSomething())`, and, by convention,
    // > are always prefixed with "do".
    // N/A
    //  ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    //…
    _dismiss: function () {
      this.notificationText = "";
    },

    _changeType: function (newType) {
      this.type = "alert-" + newType;
    },

    _changeText: function (newText) {
      this.notificationText = newText;
    },

    _setDissmissable: function (dismissable) {
      this.dismissable = dismissable;
    },
  },
});
