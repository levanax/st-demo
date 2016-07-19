Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [],
    config: {
        padding:'10 10',
        items: [{
            xtype: 'container',
            html: "this is home view ."
        }, {
            xtype: 'button',
            itemId: 'nomalSignOn',
            ui: 'forward',
            text: 'SignOn by nomal'
        }, {
            margin:'10 0',
            xtype: 'button',
            itemId: 'safetySignOn',
            ui: 'forward',
            text: 'SignOn by safety'
        }]
    }
});