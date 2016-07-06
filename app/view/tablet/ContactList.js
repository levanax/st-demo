Ext.define('TestApp.view.tablet.ContactList', {
    extend: 'Ext.List',
    xtype: 'contactListView',
    requires: [
    ],
    config: {
        fullscreen: true,
        itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
        data: [
           { firstName: 'tabletTestName',   lastName: 'Maintz'  },
           { firstName: 'tabletTestName',     lastName: 'Dougan'  },
           { firstName: 'tabletTestName',      lastName: 'Spencer' },
           { firstName: 'tabletTestName',   lastName: 'Avins'   },
           { firstName: 'tabletTestName',   lastName: 'Conran'  },
           { firstName: 'tabletTestName',    lastName: 'Kaneda'  },
           { firstName: 'Jacky',   lastName: 'Nguyen'  },
           { firstName: 'Abraham', lastName: 'Elias'   },
           { firstName: 'tabletTestName',     lastName: 'Robinson'}
       ]
    }
});
