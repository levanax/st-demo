Ext.define('TestApp.view.SignOnBySafety', {
    extend: 'Ext.form.Panel',
    xtype: 'signOnBySafetyView',
    requires: [
    ],
    config: {
    	items: [{
            xtype: 'fieldset',
            title: 'Safety model login system',
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