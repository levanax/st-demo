Ext.define('TestApp.controller.phone.SignIn', {
    extend: 'TestApp.controller.SignIn',
    requires: [
    ],
    config: {
        routes:{
            'signIn':'goSignInView'
        },
        control:{
            signInView:{
                initialize:function(view,eOpts) {
                    // body...
                    console.log('in here /as .TestApp.controller.SignIn -phone');
                }
            },
            jumpHomeBtn:{
                tap:function(){
                    this.redirectTo('home');
                }
            }
        }
    },
    goSignInView:function(){
        this.changeView(Ext.create('TestApp.view.phone.SignIn'));
    }
});