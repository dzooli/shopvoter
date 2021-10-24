parasails.registerPage('index', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    total: 0,
    items: [],
    columns: ['id', 'fullName', 'emailAddress', 'companyName'],
    colnames: {
      id: "Id",
      fullName: "Name",
      emailAddress: "E-mail",
      companyName: "Company",
    },
    actions: [{
      name: "Edit",
      icon: "fa-pencil",
      link: "#",
    },
      {
        name: "Archive",
        icon: "fa-trash",
        link: "#",
    }  ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: async function ()
  {
    parasails.util.showFlash("danger", "Unauthorized!", false, this);
    var users=await Cloud.listUsers().tolerate((err) => {
      return;
    });
    if (!users|| !users.meta || users.meta.code!==200)
    {
      return;
    }
    this.items = users.data;
    this.total = users.meta.total;
  },

  mounted: async function () {
    //…
  },

  created: async function () {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  }
});
