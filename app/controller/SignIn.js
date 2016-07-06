Ext.define('TestApp.controller.SignIn', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            jumpHomeBtn:'button[itemId=jumpHomeBtn]',
            signInView:{
                selector:'signInView',
                xtype:'signInView',
                autoCreate:true
            }
        }
    }
});
