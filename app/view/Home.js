Ext.define('TestApp.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeView',
    requires: [],
    config: {
        scrollable: true,
        fullscreen:true,
        padding: '10 10',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Home'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'androidVerifyFingerprintLogin',
            ui: 'forward',
            text: 'android 验证指纹登入'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'checkScreenLock2Btn',
            ui: 'forward',
            text: 'check screen lock2-lockinfo'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'checkScreenLockBtn',
            ui: 'forward',
            text: 'check screen lock'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'checkSIMBtn',
            ui: 'forward',
            text: 'Check SIM'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'checkSIMPermissionBtn',
            ui: 'forward',
            text: 'Check SIM permission'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'requestSIMPermissionBtn',
            ui: 'forward',
            text: 'reuqest SIM permission'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'checkUpdateBtn',
            ui: 'forward',
            text: 'Check update'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'nomalSignOn',
            ui: 'forward',
            text: 'SignOn by nomal'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'safetySignOn',
            ui: 'forward',
            text: 'SignOn by safety'
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'signaturefield',
                id: 'signatureField',
                sigWidth: 350,
                sigHeight: 150,
                label: 'Enter Signature',
                labelWidth: '20%'
            }]
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'camera',
            ui: 'forward',
            text: 'Camera'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID',
            ui: 'forward',
            text: 'Touch ID . iphone5s+'
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID2',
            ui: 'forward',
            text: 'Touch ID2 . iphone5s+ '
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID3',
            ui: 'forward',
            text: 'Touch ID3 . iphone5s+ '
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID4',
            ui: 'forward',
            text: '加密 . android6.0+ '
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID5',
            ui: 'forward',
            text: '解密 . android6.0+ '
        }, {
            margin: '10 0',
            xtype: 'button',
            itemId: 'touchID6',
            ui: 'forward',
            text: '刪除加密. android6.0+ '
        }]
    }
});