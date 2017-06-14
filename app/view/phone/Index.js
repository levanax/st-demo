Ext.define('TestApp.view.phone.Index', {
    extend: 'Ext.form.Panel',
    xtype: 'indexPhoneView',
    requires: [],
    config: {
        padding: '10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Index'
        }, {
            xtype: 'button',
            itemId: 'goHomeBtn',
            ui: 'forward',
            text: 'Go Home View'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'goWriteLogBtn',
            ui: 'forward',
            text: 'Go WriteLog View'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'goWriteLogBtn1',
            ui: 'forward',
            text: 'Go WriteLog View11111111111111'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'goWriteLogBtn2',
            ui: 'forward',
            text: 'Go WriteLog View22222222222222'
        }]
    }
});