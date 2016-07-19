Ext.define('TestApp.controller.SignOnByNomal', {
    extend: 'TestApp.controller.SignOnBase',
    requires: [
    ],
    config: {
        refs:{
            signOnByNomalView:{
                selector:'signOnByNomalView',
                xtype:'signOnByNomalView'
            }
        },
        control:{
            signOnByNomalView:{
                initialize: function(view, eOpts) {
                    console.log('in initialize signOnByNomalView ...');
                }
            }
        }
    }
});