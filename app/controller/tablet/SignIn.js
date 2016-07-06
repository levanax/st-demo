Ext.define('TestApp.controller.tablet.SignIn', {
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
                    console.log('in here /as .TestApp.controller.SignIn tablet');
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
        this.changeView(Ext.create('TestApp.view.tablet.SignIn'));
    }
});