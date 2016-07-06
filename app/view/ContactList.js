Ext.define('TestApp.view.ContactList', {
    extend: 'Ext.List',
    xtype: 'contactListView',
    requires: [
    ],
    config: {
        fullscreen: true,
        itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
        data: [
           { firstName: 'Tommy',   lastName: 'Maintz'  },
           { firstName: 'Rob',     lastName: 'Dougan'  },
           { firstName: 'Ed',      lastName: 'Spencer' },
           { firstName: 'Jamie',   lastName: 'Avins'   },
           { firstName: 'Aaron',   lastName: 'Conran'  },
           { firstName: 'Dave',    lastName: 'Kaneda'  },
           { firstName: 'Jacky',   lastName: 'Nguyen'  },
           { firstName: 'Abraham', lastName: 'Elias'   },
           { firstName: 'Jay',     lastName: 'Robinson'},
           { firstName: 'Nigel',   lastName: 'White'   },
           { firstName: 'Don',     lastName: 'Griffin' },
           { firstName: 'Nico',    lastName: 'Ferrero' },
           { firstName: 'Jason',   lastName: 'Johnston'}
       ]
    }
});
