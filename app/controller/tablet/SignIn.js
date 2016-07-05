Ext.define('TestApp.controller.tablet.SignIn', {
    extend: 'TestApp.controller.SignIn',
    requires: [
    ],
    config: {
        control:{
            signInView:{
                initialize:function(view,eOpts) {
                    // body...
                    console.log('in here /as .TestApp.controller.SignIn tablet');
                }
            }
        }
    }
});