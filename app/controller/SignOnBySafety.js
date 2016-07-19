Ext.define('TestApp.controller.SignOnBySafety', {
    extend: 'TestApp.controller.SignOnBase',
    requires: [],
    config: {
        refs: {
            signOnBySafetyView: {
                selector: 'signOnBySafetyView',
                xtype: 'signOnBySafetyView',
                autoCreate: true
            }
        },
        control: {
            signOnBySafetyView11: {
                initialize: function(view, eOpts) {
                    console.log('in initialize signOnBySafetyView ...');
                }
            }
        }
    }
});