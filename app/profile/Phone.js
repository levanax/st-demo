Ext.define('TestApp.profile.Phone', {
    extend: 'TestApp.profile.Base',
    requires:[
    ],
    config:{
    	controllers:[
	        'SignIn','SignInTest','KLineChart'
	    ],
    	views:['SignIn','KLineChart']
    },
    isActive: function() {
        return Ext.os.is.Phone; 
    },
    launch: function() {
    	Ext.Viewport.add(Ext.create('TestApp.view.phone.SignIn'));
        this.callParent();
    }
});
