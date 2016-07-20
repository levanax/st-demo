Ext.define('TestApp.controller.Base', {
    extend: 'Ext.app.Controller',
    requires: [],
    config: {
        refs: {
            homeView: {
                selector: 'homeView',
                xtype: 'homeView',
                autoCreate: true
            }
        }
    },
    init: function() {
        "use strict";
        var vp = Ext.Viewport;
        vp.onAfter('activeitemchange', function(t, value, oldValue, eOpts) {
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
    changeView: function(view) {
        "use strict";
        Ext.Viewport.animateActiveItem(view, {});
    },
    /**
     * @private 
     * @param action
     */
    checkDataIntercept: function(action) {
        var persStore = Ext.data.StoreManager.lookup('pers');
        var persModel = persStore.getAt(0);

        if (persModel) {
            action.resume();
        } else {
            console.warn('拦截到URL');
        }
    }
});