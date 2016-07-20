Ext.define('TestApp.controller.SignOnBase', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {},
        routes: {
            'signOn/:model': 'goSignOnViewByJson'
        },
        before:{
            goSignOnViewByJson:'checkDataIntercept'
        },
        control: {}
    },
    /**
    * 通过配置文件  控制不同模式去向不同页面
    **/
    goSignOnViewByJson: function(model) {
        var persStore = Ext.data.StoreManager.lookup('pers');
        var persModel = persStore.getAt(0);
        var persViewModel = persModel.getPersViews();

        
        var viewXClass = persViewModel.get('signOn');

        var view = Ext.create(viewXClass);

        if (view) {
            this.changeView(view);
        }
    },
    /**
    * 在路由里 控制不同模式去向不同页面
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

/**
* 加载app时，请求默认配置信息 resources/config/default/config.json
* 选择券商后，再次根据券商请求相应 config.json 配置合并，若config重复，则使用券商config
* 以 TestApp.view.SignOnBySafety 为例，配置为 value
**/