Ext.define('TestApp.view.phone.SignIn', {
    extend: 'Ext.form.Panel',
    xtype: 'signInView',
    requires: [
        'Ext.form.FieldSet'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [{
            xtype: 'fieldset',
            title: 'About You',
            instructions: 'Tell us all about yourself',
            items: [
                {
                    xtype: 'textfield',
                    name : 'firstName',
                    label: 'First Name'
                },
                {
                    xtype: 'textfield',
                    name : 'lastName',
                    label: 'Last Name'
                }
            ]
        }]
    }
});