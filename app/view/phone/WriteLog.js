Ext.define('TestApp.view.phone.WriteLog', {
    extend: 'Ext.form.Panel',
    xtype: 'writeLogView',
    requires: [
        'Ext.form.FieldSet'
    ],
    config: {
        tabBarPosition: 'bottom',
        padding:'10 10 10 10',
        items: [{
            xtype: 'fieldset',
            title: 'Log edit',
            instructions: 'Tell us all about yourself',
            items: [
                {
                    xtype: 'textfield',
                    name : 'subject',
                    label: 'Subject'
                },
                {
                    xtype: 'textareafield',
                    maxRows: 6,
                    name : 'content',
                    label: 'Content'
                },{
                    margin:'10 0',
                    xtype: 'button',
                    itemId:'saveBtn',
                    ui:'normal',
                    text: 'Save'
                }
            ]
        },
        {
            xtype: 'container',
            html:'this is phone view.'
        }]
    }
});