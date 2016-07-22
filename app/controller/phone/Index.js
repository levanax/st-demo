Ext.define('TestApp.controller.phone.Index', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            indexPhoneView: {
                selector: 'indexPhoneView',
                xtype: 'indexPhoneView'
            }
        },
        routes: {
            '': 'goIndexView'
        },
        control: {
            indexPhoneView: {
                initialize: function(view, eOpts) {
                    view.on({
                        tap: function(button, e, eOpts) {
                            this.redirectTo('home');
                        },
                        delegate: '> button[itemId=goHomeBtn]',
                        scope: this
                    });

                    view.on({
                        tap: function(button, e, eOpts) {
                            this.redirectTo('writeLog');
                        },
                        delegate: '> button[itemId=goWriteLogBtn]',
                        scope: this
                    });
                }
            }
        }
    },
    goIndexView: function() {
        this.changeView(Ext.create('TestApp.view.phone.Index'));
    }
});