/**
 * <tagging-view>
 * -----------------------------------------------------------------------------
 * A status message with automatic change on timeout.
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */
parasails.registerComponent("taggingView", {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: ["timeout"],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      message: "",
      plural_secs: "s",
      counter: 0,
      timerId: 0,
      buttonsDisabled: false,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="jumbotron mt-2">
    <div class="row mb-5">
        <div style="flex: auto; text-align: center;">
            <span class="text-center" v-if="counter == 0" style="display: inline-block;">{{message}}</span>
            <span class="text-center" v-if="counter != 0" style="display: inline-block;">Please wait {{counter}} second{{plural_secs}}.</span>
        </div>
        <div class="flex-row justify-content-between mb-0 pb-0 pt-4" style="display: flex; width: 100%; padding: 24px;">
            <button class="btn btn-primary btn-lg" @click="sendOpinion" :disabled="buttonsDisabled ? true : false">1</button>
            <button class="btn btn-primary btn-lg" @click="sendOpinion" :disabled="buttonsDisabled ? true : false">2</button>
            <button class="btn btn-primary btn-lg" @click="sendOpinion" :disabled="buttonsDisabled ? true : false">3</button>
            <button class="btn btn-primary btn-lg" @click="sendOpinion" :disabled="buttonsDisabled ? true : false">4</button>
            <button class="btn btn-primary btn-lg" @click="sendOpinion" :disabled="buttonsDisabled ? true : false">5</button>
        </div>
    </div>
  </div>
    `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //…
  },
  mounted: async function () {
    this.message =
      "Rate our service with a simple tap below. 1 means bad, 5 means very good.";
  },
  beforeDestroy: function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    startCounter: async function () {
      this.counter = this.timeout;
      this.buttonsDisabled = true;
      this.timerId = setInterval(() => {
        this.counter--;
        if (this.counter == 1) {
          this.plural_secs = "";
        }
        if (this.counter == 0) {
          this.buttonsDisabled = false;
          this.plural_secs = "s";
          clearInterval(this.timerId);
        }
      }, 1000);
    },

    sendOpinion: async function (ev) {
      this.startCounter();
    },
  },
});
