Ext.define('TestApp.controller.tablet.Index', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            indexTabletView: {
                selector: 'indexTabletView',
                xtype: 'indexTabletView'
            }
        },
        routes:{
            '': 'goIndexView'
        },
        control:{
            indexTabletView:{
                initialize: function(view, eOpts) {
                    view.on({
                        tap: function(button, e, eOpts) {
                            this.redirectTo('signIn');
                        },
                        delegate: '> button[itemId=goSignInBtn]',
                        scope: this
                    })
                }
            }
        }
    },
    goIndexView:function() {
        this.changeView(Ext.create('TestApp.view.tablet.Index'));
    }
});