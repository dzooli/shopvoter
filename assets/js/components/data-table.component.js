/**
 * <data-table>
 * -----------------------------------------------------------------------------
 * A searchable and filterable data table component.
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */
parasails.registerComponent("dataTable", {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: ["items", "columns", "colnames", "total", "actions"],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    const sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      syncing: false,
      cloudError: {},
      sortKey: '',
      filterKey: '',
      //sortOrders,
    };
  },

  computed: {
    filteredItems() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let items = this.items
      if (filterKey) {
        items = items.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
              .toLowerCase()
              .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        items = items.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return items
    },

    sortOrders() {
      const columnSortOrders = {}
      this.columns.forEach(function (key) {
        columnSortOrders[key] = 1
      })
      return columnSortOrders
    },
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="data-table">
    <form id="search">
    <div class="form-group">
     <label class="col-form-label" for="query">Search:</label>
     <input class="form-control" name="query" id="query" v-model=filterKey />
    </div>
    </form>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ colnames[key.replace('.', '_')] }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
          <th v-if="actions.length">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredItems">
          <td v-for="key in columns">
            {{ entry[key] }}
          </td>
          <td v-if="actions.length">
            <a href="#" v-for="action in actions"
            :title="action.name">
              <span :class="['pr-1', 'fa', action.icon]"
                :data-key="entry.id"
                :data-action="action.action"
                :data-method="action.method"
                :data-confirm="action.confirm"
                v-on:click.prevent="_doAction"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
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
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },

    _doAction(e) {
      console.log(e.target.attributes["data-action"].value);

      var actionName = e.target.attributes["data-action"].value;
      var actionMethod = e.target.attributes["data-method"].value;
      var itemId = e.target.attributes["data-key"].value;

      console.log("action called: ", actionName);
      console.log("with id: ", itemId);
      console.log("and method: ", actionMethod);

      // Redirect to a GET route
      if (actionMethod == "GET") {
        this.goto(actionName + "/?id=" + itemId);
      }
      // Or do other method
      // TODO: implement other method calls
    }
  },
});
