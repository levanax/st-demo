Ext.define('TestApp.view.SignOnByNomal', {
    extend: 'Ext.form.Panel',
    xtype: 'signOnByNomalView',
    requires: [],
    config: {
        padding: '10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Sign On'
        }, {
            xtype: 'fieldset',
            title: 'Login system',
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