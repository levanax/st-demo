/**
* 
**/
Ext.define('TestApp.view.tablet.Index', {
    extend: 'Ext.form.Panel',
    xtype: 'indexTabletView',
    requires: [
    ],
    config: {
        padding:'10 10',
        items: [{
            xtype : 'toolbar',
            docked: 'top',
            title: 'Index'
        }, {
            xtype: 'button',
            itemId: 'goSignInBtn',
            ui: 'forward',
            text: 'Go SignIn View'
        }]
    }
});