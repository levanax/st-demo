Ext.define('TestApp.controller.tablet.SignIn', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
        refs:{
            jumpHomeBtn:'button[itemId=jumpHomeBtn]',
            signInTabletView:{
                selector:'signInTabletView',
                xtype:'signInTabletView'
            }
        },
        routes:{
            'signIn':'goSignInView'
        },
        control:{
            signInTabletView:{
                initialize:function(view,eOpts) {
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