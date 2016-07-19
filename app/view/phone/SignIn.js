Ext.define('TestApp.view.phone.SignIn', {
    extend: 'Ext.form.Panel',
    xtype: 'signInPhoneView',
    requires: [
        'Ext.form.FieldSet'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [{
            xtype: 'fieldset',
            title: 'About You',
            instructions: 'Tell us all about yourself',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Sign In'
            }, {
                xtype: 'textfield',
                name: 'firstName',
                label: 'First Name'
            }, {
                xtype: 'textfield',
                name: 'lastName',
                label: 'Last Name'
            }, {
                xtype: 'button',
                itemId: 'jumpHomeBtn',
                ui: 'forward',
                text: 'Jump to other view.'
            }]
        }, {
            xtype: 'container',
            html: 'this is phone view.'
        }]
    }
});