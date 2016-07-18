Ext.define('TestApp.controller.Home', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            jumpSignInView:'button[itemId=jumpSignInView]'
        },
        routes:{
            'home':'goHomeView'
        },
        control:{
            jumpSignInView:{
                tap:function(){
                    var userService = Ext.create('TestApp.service.User');
                    console.log(userService.test());

                    this.redirectTo('signIn');
                }
            }
        }
    },
    goHomeView:function() {
        this.changeView(this.getHomeView());
    }
});