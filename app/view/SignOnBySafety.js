Ext.define('TestApp.view.SignOnBySafety', {
    extend: 'Ext.form.Panel',
    xtype: 'signOnBySafetyView',
    requires: [],
    config: {
        padding: '10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Sign On'
        }, {
            xtype: 'fieldset',
            title: 'Safety model login system',
            instructions: 'contact us.',
            items: [{
                xtype: 'textfield',
                name: 'loginID',
                label: 'Login ID'
            }, {
                xtype: 'textfield',
                name: 'password',
                label: 'Password'
            }, {
                margin: '10 0',
                xtype: 'button',
                itemId: 'loginBtn',
                ui: 'forward',
                text: 'Sign on'
            }]
        }]
    }
});