Ext.define('TestApp.controller.tablet.SignIn', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            jumpHomeBtn:'button[itemId=jumpHomeBtn]',
            signInView:{
                selector:'signInView',
                xtype:'signInView',
                autoCreate:true
            }
        },
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