Ext.define('TestApp.view.phone.WriteLog', {
    extend: 'Ext.form.Panel',
    xtype: 'writeLogView',
    requires: [
        'Ext.form.FieldSet'
    ],
    config: {
        tabBarPosition: 'bottom',
        padding: '10 10 10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Write Log'
        }, {
            xtype: 'fieldset',
            instructions: 'Tell us all about yourself',
            items: [{
                xtype: 'textfield',
                name: 'subject',
                label: 'Subject'
            }, {
                xtype: 'textareafield',
                maxRows: 6,
                name: 'content',
                label: 'Content'
            }, {
                margin: '10 0',
                xtype: 'button',
                name: 'saveBtn',
                ui: 'normal',
                text: 'Save'
            }, {
                margin: '10 0',
                xtype: 'button',
                name: 'readBtn',
                ui: 'normal',
                text: 'read'
            }]
        }]
    }
});