Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [
    ],
    config: {
    	items:[{
    		xtype:'container',
        	html:"this is home view ."
    	},{
            xtype: 'button',
            itemId:'jumpSignInView',
            ui:'forward',
            text: 'Jump to other view.'
        }]
    }
});