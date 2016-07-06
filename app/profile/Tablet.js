Ext.define('TestApp.profile.Tablet', {
    extend: 'TestApp.profile.Base',
    requires:[
    ],
    config:{
    	controllers:[
	        'SignIn'
	    ],
    	views:['SignIn','ContactList']
    },
    isActive: function() {
        return Ext.os.is.Tablet;
    },
    launch: function() {
    	Ext.Viewport.add({xtype:'contactListView'});
        this.callParent();
    }
});
