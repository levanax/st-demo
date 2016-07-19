Ext.define('TestApp.controller.phone.SignIn', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            jumpHomeBtn:'button[itemId=jumpHomeBtn]',
            signInPhoneView:{
                selector:'signInPhoneView',
                xtype:'signInPhoneView'
            }
        },
        routes:{
            'signIn':'goSignInView'
        },
        control:{
            signInPhoneView:{
                initialize:function(view,eOpts) {
                    // body...
                    console.log('in here /as .TestApp.controller.SignIn -phone');
                }
            },
            jumpHomeBtn:{
                tap:function(){
                    this.redirectTo('signOn');
                }
            }
        }
    },
    goSignInView:function(){
        this.changeView(Ext.create('TestApp.view.phone.SignIn'));
    }
});