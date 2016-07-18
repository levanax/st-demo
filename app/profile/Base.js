Ext.define('TestApp.profile.Base', {
    extend: 'Ext.app.Profile',
    config:{
        
    },
    launch: function() {
        var initializeCtrl = this.getApplication().getController('TestApp.controller.system.Initialize');
        initializeCtrl.do();
    }
});
