Ext.define('TestApp.profile.Tablet', {
    extend: 'TestApp.profile.Base',
    requires: [],
    config: {
        controllers: [
            'SignIn',
            'Index'
        ],
        views: [
            'SignIn',
            'Index'
        ]
    },
    isActive: function() {
        return Ext.os.is.Tablet;
    },
    launch: function() {
        Ext.Viewport.add(Ext.create('TestApp.view.tablet.SignIn'));
        this.callParent();
    }
});