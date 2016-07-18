Ext.define('TestApp.profile.Phone', {
    extend: 'TestApp.profile.Base',
    requires:[
    ],
    config:{
    	controllers:[
	        'SignIn','WriteLog'
	    ],
    	views:['SignIn','WriteLog']
    },
    isActive: function() {
        return Ext.os.is.Phone; 
    },
    launch: function() {
    	Ext.Viewport.add(Ext.create('TestApp.view.phone.WriteLog'));
        this.callParent();
    }
});
