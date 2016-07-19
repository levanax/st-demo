Ext.define('TestApp.controller.Home', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            homeView: {
                selector: 'homeView',
                xtype: 'homeView'
            }
        },
        routes: {
            'home': 'goHomeView'
        },
        control: {
            homeView: {
                initialize: function(view, eOpts) {

                    view.on({
                        tap: function(button, e, eOpts) {
                            var btnItemId = button.getItemId();
                            var model = 'nomal';
                            if(btnItemId === 'safetySignOn'){
                                model = 'safety';
                            }
                            
                            this.redirectTo('signOn/'+model);
                        },
                        delegate: '> button',
                        scope: this
                    })

                    // var userService = Ext.create('TestApp.service.User');
                    // console.log(userService.test());
                }
            }
        }
    },
    goHomeView: function() {
        this.changeView(Ext.create('TestApp.view.Home'));
    }
});