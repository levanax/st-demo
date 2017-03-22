Ext.define('TestApp.controller.Home', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            homeView: {
                selector: 'homeView',
                xtype: 'homeView'
            },
            nomalBtn: 'button[itemId=nomalSignOn]',
            safetyBtn: 'button[itemId=safetySignOn]',
            cameraBtn: 'button[itemId=camera]'
        },
        routes: {
            'home': 'goHomeView'
        },
        control: {
            nomalBtn:{
                tap:function(){
                    this.redirectTo('signOn/nomal');
                }
            },
            safetyBtn:{
                tap:function(){
                    this.redirectTo('signOn/safety');
                }
            },
            cameraBtn:{
                tap:function(){
                    console.log(arguments[1].event)
                    arguments[1].event.preventDefault();
                    
                    navigator.camera.getPicture(function(){

                    }, function(e){
                        alert('throw error .');
                    }, {
                        saveToPhotoAlbum:true,
                        quality:100,
                        
                    });
                }
            },
            homeView: {
                initialize: function(view, eOpts) {

                    // view.on({
                    //     tap: function(button, e, eOpts) {
                    //         var btnItemId = button.getItemId();
                    //         var model = 'nomal';
                    //         if(btnItemId === 'safetySignOn'){
                    //             model = 'safety';
                    //         }
                            
                    //         this.redirectTo('signOn/'+model);
                    //     },
                    //     delegate: '> button',
                    //     scope: this
                    // })

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