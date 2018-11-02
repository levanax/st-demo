Ext.define('TestApp.profile.Phone', {
    extend: 'TestApp.profile.Base',
    requires: [],
    config: {
    },
    isActive: function() {
        return Ext.os.is.Phone;
    },
    launch: function() {
        Ext.Viewport.add(Ext.create('TestApp.view.Home'));
        this.callParent();
    }
});