Ext.define('TestApp.profile.Nomal', {
	extend: 'Ext.app.Profile',
	config: {
		controllers: [
			'SignOnByNomal'
		],
		views: [
			'TestApp.view.SignOnByNomal'
		]
	},
	launch: function() {
	}
});