Ext.define('TestApp.profile.Phone', {
    extend: 'TestApp.profile.Base',
    requires:[
    ],
    config:{
    	controllers:[
	        'SignIn'
	    ],
    	views:['SignIn']
    },
    isActive: function() {
        return Ext.os.is.Phone; 
    },
    launch: function() {
    	Ext.Viewport.add({xtype:'contactListView'});
        this.callParent();
    }
});
