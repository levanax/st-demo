Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [],
    config: {
        padding:'10 10',
        items: [{
            xtype : 'toolbar',
            docked: 'top',
            title: 'Home'
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