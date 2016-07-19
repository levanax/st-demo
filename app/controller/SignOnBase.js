Ext.define('TestApp.controller.SignOnBase', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {},
        routes: {
            'signOn/:model': 'goSignOnView'
        },
        control: {}
    },
    /**
    * 在路由里 区分不同模式
    **/
    goSignOnView: function(model) {
        var view = null;
        switch (model) {
            case 'safety':
                view = Ext.create('TestApp.view.SignOnBySafety');
                break;
            default:
                view = Ext.create('TestApp.view.SignOnByNomal');
                break;
        }

        if (view) {
            this.changeView(view);
        }
    }
});