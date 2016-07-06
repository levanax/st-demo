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
                    this.redirectTo('signIn');
                }
            }
        }
    },
    goHomeView:function() {
        this.changeView(this.getHomeView());
    }
});