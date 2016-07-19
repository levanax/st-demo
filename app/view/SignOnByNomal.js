Ext.define('TestApp.view.SignOnByNomal', {
    extend: 'Ext.form.Panel',
    xtype: 'signOnByNomalView',
    requires: [
    ],
    config: {
    	items: [{
            xtype: 'fieldset',
            title: 'Login system',
            instructions: 'contact us.',
            items: [
                {
                    xtype: 'textfield',
                    name : 'loginID',
                    label: 'Login ID'
                },
                {
                    xtype: 'textfield',
                    name : 'password',
                    label: 'Password'
                },{
                    xtype: 'button',
                    itemId:'loginBtn',
                    ui:'forward',
                    text: 'Sign on'
                }
            ]
        }]
    }
});