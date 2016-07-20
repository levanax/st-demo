Ext.define('TestApp.controller.system.Initialize', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {},
    do: function() {
        console.debug('in doing ...');

        this.loadModelConfig();

        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        // alert(requestFileSystem);
    },
    loadModelConfig: function() {
        var startTime = new Date().getTime();
        Ext.Ajax.request({
            url: 'resources/config/safety/config.json',
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                // process server response here

                var execTime = new Date().getTime() - startTime;
                console.log('耗时：'+execTime+'ms');

                var currentPersData = {};
                currentPersData.pattern =  'safety';
                currentPersData.persViews = data.view;

                // console.log(Ext.JSON.encode(currentPersData));

                var persStore = Ext.data.StoreManager.lookup('pers');
                persStore.addData([currentPersData]);
            }
        });
    }
});