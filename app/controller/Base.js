Ext.define('TestApp.controller.Base', {
    extend: 'Ext.app.Controller',
    requires: [
    ],
    config: {
        refs:{
        	homeView:{
        		selector:'homeView',
        		xtype:'homeView',
                autoCreate:true
        	}
        },
        routes: {
            // '': 'goHomeView'
        }
    },
    init:function(){
        "use strict";
        var vp = Ext.Viewport;
        vp.onAfter('activeitemchange', function (t, value, oldValue, eOpts) {
            if (Ext.isDefined(oldValue)) {
                //destroying oldValue
                vp.remove(oldValue, true);
            }
        });
    },
    /**
     * 切换视图
    *  @public
     * @param view
     */
    changeView:function(view){
        "use strict";
        Ext.Viewport.animateActiveItem(view,{});
    },
    /**
    * @private
    **/
    goHomeView:function(){
        this.changeView(Ext.create('TestApp.view.Home'));
    }
});
