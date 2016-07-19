Ext.define('TestApp.controller.SignOnBySafety', {
    extend: 'TestApp.controller.SignOnBase',
    requires: [],
    config: {
        refs: {
            signOnBySafetyView: {
                selector: 'signOnBySafetyView',
                xtype: 'signOnBySafetyView'
            }
        },
        control: {
            signOnBySafetyView: {
                initialize: function(view, eOpts) {
                    
                }
            }
        }
    }
});