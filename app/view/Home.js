Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [
    ],
    config: {
        layout: 'fit',
        fullscreen: true,
    	items:[{
    		xtype:'container',
        	html:"this is home view ."
    	},{
            xtype: 'button',
            itemId:'jumpSignInView',
            ui:'forward',
            text: 'Jump to other view.'
        },{
            useCompatMultiPlate:true,
            xclassPhone:'TestApp.view.phone.SignIn',
            xclassTablet:'TestApp.view.tablet.SignIn'
        }]
    }
});