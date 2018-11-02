Ext.define('TestApp.profile.Base', {
	extend: 'Ext.app.Profile',
	config: {
        controllers: [
            'SignIn',
            'WriteLog',
            'Index',
            'TestApp.controller.SignOnByNomal'
        ],
        views: [
            'SignIn',
            'WriteLog',
            'Index',
            
            'TestApp.view.SignOnByNomal'
        ]
	},
	launch: function() {
		var initializeCtrl = this.getApplication().getController('TestApp.controller.system.Initialize');
		initializeCtrl.do();
	}
});