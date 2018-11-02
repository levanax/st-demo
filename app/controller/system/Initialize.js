(function(){
    var thisCtrl = null;
Ext.define('TestApp.controller.system.Initialize', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {},
    do: function() {
        console.debug('in doing ...');

        window.onerror = this.onErrorEmergencyMechanism; //record error

        this.loadModelConfig();
        this.loadUpgrade();

        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    init: function(){
        thisCtrl = this;
    },
    onDeviceReady: function() {
        var uuid = device.uuid;
        window.isDeviceReady = true;
        // Ext.Msg.alert(uuid);

        if(typeof cordova.plugins.SecureStorage !== 'undefined'){
            var ss;
            var _init = function () {
                ss = new cordova.plugins.SecureStorage(
                    function () {
                        // alert('SecureStorage: OK');
                    },
                    function () {
                        navigator.notification.alert(
                            'Please enable the screen lock on your device. This app cannot operate securely without it.',
                            function () {
                                ss.secureDevice(
                                    function () {
                                        _init();
                                    },
                                    function () {
                                        _init();
                                    }
                                );
                            },
                            'SecureStorage: Screen lock is disabled'
                        );
                    },
                    'my_app');
            };

            _init();

            var secureStorageCtrl = thisCtrl.getApplication().getController('TestApp.controller.Home');
            secureStorageCtrl.setSecureStorageManager(ss);
        }

        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);
        document.addEventListener("offline",doOffline, false);
        document.addEventListener("online", doOnline, false);


        function onPause() {
            // Handle the pause event
            // alert('onPause');
        }
        
        var socket = io.connect('http://192.168.7.128:3000');

        socket.on('connection', function () {
            console.log('已连接');
            socket.emit('register', { id: 'levana' });
            thisCtrl.socket_is_connect = true
        });

        
        socket.on('disconnect', function () {
            console.log('已断开连接');
            
            thisCtrl._heart = setInterval(function(){
                socket.open()
                if(thisCtrl.socket_is_connect){
                    clearInterval(thisCtrl._heart)
                }
            }, 10 * 1000);

            thisCtrl.socket_is_connect = false
        });
        

        socket.on('message', function (data) {
          console.log(data);
          var _data = data;
          var backgroundModeIsActive = cordova.plugins.backgroundMode.isActive();
             cordova.plugins.notification.local.schedule({
                id: new Date().getTime(),
                title: 'Demo-'+_data.date,
                text: _data.message,
                foreground: true
            });
        });

        function onResume() {
            // Handle the resume event
            // alert('onResume');
            socket.open()
        }
        
        function doOffline(){
            // socket.open()
            // cordova.plugins.notification.local.schedule({
            //     id: new Date().getTime(),
            //     title: 'Demo',
            //     text: '网络已断开',
            //     foreground: true
            // });
            // setInterval(function(){
                
            // }, 30 * 1000);
        }
        function doOnline(){
            // cordova.plugins.notification.local.schedule({
            //     id: new Date().getTime(),
            //     title: 'Demo',
            //     text: '网络恢复连接',
            //     foreground: true
            // });
            socket.open()
        }

        function onMenuKeyDown() {
            // Handle the menubutton event
            // alert('onMenuKeyDown');
        }


        
        if(typeof cordova.plugins.backgroundMode !== 'undefined' ){
            cordova.plugins.backgroundMode.setEnabled(true);

            document.addEventListener("backbutton", function(){
                cordova.plugins.backgroundMode.overrideBackButton();
            }, false);
            cordova.plugins.backgroundMode.on('activate', function() {
                cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
             });
            //  setInterval(function(){
            //      var backgroundModeIsActive = cordova.plugins.backgroundMode.isActive();
            //      cordova.plugins.notification.local.schedule({
            //         id: new Date().getTime(),
            //         title: 'My first notification',
            //         text: 'test content ... backgroundModeIsActive: '+backgroundModeIsActive,
            //         foreground: true
            //     });
            //  }, 60 * 60 * 1000);
        }
    },
    loadUpgrade: function() {

    },
    loadModelConfig: function() {
        var startTime = new Date().getTime();
        Ext.Ajax.request({
            url: 'resources/config/safety/config.json',
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                // process server response here

                var execTime = new Date().getTime() - startTime;
                console.log('耗时：' + execTime + 'ms');

                var currentPersData = {};
                currentPersData.pattern = 'safety';
                currentPersData.persViews = data.view;

                // console.log(Ext.JSON.encode(currentPersData));

                var persStore = Ext.data.StoreManager.lookup('pers');
                persStore.addData([currentPersData]);
            }
        });
    },
    onErrorEmergencyMechanism: function(errorMessage, scriptURI, lineNumber, columnNumber, error) {
        "use strict";
        var val = {
            message: errorMessage,
            script: scriptURI,
            line: lineNumber,
            columnNumber: columnNumber,
            error: error
        };
        var currentTime = Ext.Date.format(new Date(), 'Y-d-m H:i:s');
        console.error(currentTime);

        var file = scriptURI.match('app[a-zA-Z0-9\/\.]*');
        var msg = [];
        msg.push('file: ' + file);
        msg.push('line: ' + lineNumber);
        msg.push('columnNumber: ' + columnNumber);
        msg.push('<br/>');
        msg.push('time: ' + currentTime);
        msg.push('<br/>');
        msg.push(errorMessage);


        Ext.Msg.show({
            title: 'System Error',
            message: msg.join(' & ')
        });
    }
});

})();