Ext.define('TestApp.controller.system.Initialize', {
    extend: 'TestApp.controller.Base',
    requires: [
    ],
    config: {
    },
    do:function(){
        console.log('in doing ...');


        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    onDeviceReady:function(){
        alert(requestFileSystem);
    }
});