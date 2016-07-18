Ext.define('TestApp.view.tablet.SignIn', {
    extend: 'Ext.form.Panel',
    xtype: 'signInTabletView',
    requires: [
        'Ext.field.Password',
        'Ext.field.Email'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [{
            xtype: 'textfield',
            name: 'name',
            label: 'Name'
        },
        {
            xtype: 'emailfield',
            name: 'email',
            label: 'Email'
        },
        {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Password'
        },{
            xtype: 'button',
            itemId:'jumpHomeBtn',
            ui:'forward',
            text: 'Jump to other view.'
        },
        {
            xtype: 'container',
            html:'this is tablet view.'
        }]
    }
});
