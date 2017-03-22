Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [],
    config: {
        padding: '10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Home'
        }, {
            xtype: 'button',
            itemId: 'nomalSignOn',
            ui: 'forward',
            text: 'SignOn by nomal'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'safetySignOn',
            ui: 'forward',
            text: 'SignOn by safety'
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'signaturefield',
                id: 'signatureField',
                sigWidth: 350,
                sigHeight: 150,
                label: 'Enter Signature',
                labelWidth: '20%'
            }]
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'camera',
            ui: 'forward',
            text: 'Camera'
        }]
    }
});