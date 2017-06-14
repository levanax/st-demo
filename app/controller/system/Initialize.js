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
    onDeviceReady: function() {
        var uuid = device.uuid;
        Ext.Msg.alert(uuid);

        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);

        function onPause() {
            // Handle the pause event
            // alert('onPause');
        }

        function onResume() {
            // Handle the resume event
            // alert('onResume');
        }

        function onMenuKeyDown() {
            // Handle the menubutton event
            // alert('onMenuKeyDown');
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
        console.error(currentTime, arguments);

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