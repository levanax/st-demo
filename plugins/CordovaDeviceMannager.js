/**
 * Created by levana.xue on 2017/7/27.
 *
 * 该文件使用到以下Cordova插件：
 *
 * https://github.com/levanax/Cordova-Screen-Lock-Enabled
 * iOS > 8.0  Android > 4.1
 *
 * https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth
 * Android 6+
 *
 * https://github.com/EddyVerbruggen/cordova-plugin-touch-id
 * IOS8+
 *
 * ----------------------------------------------------------------------------
 * 备用：https://github.com/sjhoeksma/cordova-plugin-keychain-touch-id
 * ----------------------------------------------------------------------------
 */

/**
// CordovaDeviceMannager.isScreenLockEnabled(function(data){
//                         if(data.isEnabled){
//                             CordovaDeviceMannager.isAvailableFingerprint(function(data){
//                                 if(data.isAvailable){
//                                     CordovaDeviceMannager.encryptFingerprint({
//                                         password:'0011223344'
//                                     },function(data){
//                                         if(data.isSuccess){
//                                             localStorage.setItem('pwdToken',data.token);
//                                             alert('登记成功！');
//                                         }else{
//                                             switch(data.error){
//                                                 case 'FINGERPRINT_CANCELLED':
//                                                     alert('取消验证');
//                                                     break;
//                                                 case 'FINGERPRINT_ERROR':
//                                                     alert('验证错误，超过最大次数，请稍候再试');
//                                                     break;
//                                                 default:
//                                                     alert('encryptFingerprint error'+data.error);
//                                                     break;
//                                             }
//                                         }
//                                     },{
//                                         scope:this,
//                                         dialogTitle:'test title',
//                                         dialogMessage:'请验证指纹'
//                                     });
//                                 }else{
//                                     alert('isAvailableFingerprint error: '+data.error);
//                                 }
//                             },{scope:this});
//                         }else{
//                             alert('screenLock error: '+data.error);
//                         }
//                     },{scope:this});

//--------------------------------------------------------------------------------

// CordovaDeviceMannager.isScreenLockEnabled(function(data){
//                         if(data.isEnabled){
//                             CordovaDeviceMannager.isAvailableFingerprint(function(data){
//                                 if(data.isAvailable){

//                                     var pwdToken = localStorage.getItem('pwdToken');
//                                     CordovaDeviceMannager.decryptFingerprint({
//                                         token:pwdToken
//                                     },function(data){
//                                         if(data.isSuccess){
//                                             alert('验证通过！'+ data.password);
//                                         }else{
//                                             if(data.isChanged){
//                                                 alert('指纹已变更');
//                                             }else{
//                                                 switch(data.error){
//                                                     case 'FINGERPRINT_CANCELLED':
//                                                         alert('取消验证');
//                                                         break;
//                                                     case 'FINGERPRINT_ERROR':
//                                                         alert('验证错误，超过最大次数，请稍候再试');
//                                                         break;
//                                                     default:
//                                                         alert('encryptFingerprint error'+data.error);
//                                                         break;
//                                                 }
//                                             }
//                                         }
//                                     },{
//                                         scope:this,
//                                         dialogTitle:'test title',
//                                         dialogMessage:'请验证指纹'
//                                     });
//                                 }else{
//                                     alert('isAvailableFingerprint error: '+data.error);
//                                 }
//                             },{scope:this});
//                         }else{
//                             alert('screenLock error: '+data.error);
//                         }
//                     },{scope:this});

//--------------------------------------------------------------------------------
*/
var CordovaDeviceMannager = CordovaDeviceMannager || {};
(function(_this) {
    'use strict';

    var CordovaDeviceMannagerContant = {
            FINGERPRINT_PASSWORD: 'Fingerprint_password'
        }
        /**
         * 设备锁是否开启
         * @param callback {Function}
         * @param callback.data {Object}
         * @param callback.data.isEnabled {boolean}
         * @param callback.data.error {String}
         * @param options {Object}
         * @param options.scope {Object}
         */
    _this.isScreenLockEnabled = function(callback, options) {
        var scope = options ? options.scope : {};
        if (!window.isDeviceReady) {
            callback.call(scope, {
                isEnabled: false
            })
            return false;
        }
        screenLock.isScreenLockEnabled(function(result) {
            if (result) {
                callback.call(scope, {
                    isEnabled: true
                });
            } else {
                callback.call(scope, {
                    isEnabled: false
                });
            }
        }, function(err) {
            callback.call(scope, {
                isEnabled: false,
                error: err
            });
        });
    }

    /**
     * 指纹是否可用
     * @param callback {Function}
     * @param callback.data {Object}
     * @param callback.data.isAvailable {boolean}
     * @param callback.data.error {String}
     * @param options {Object}
     * @param options.scope {Object}
     */
    _this.isAvailableFingerprint = function(callback, options) {
        var scope = options ? options.scope : {};
        if (!window.isDeviceReady) {
            callback.call(scope, {
                isAvailable: false
            })
            return false;
        }
        if (Ext.os.is('Android')) {
            FingerprintAuth.isAvailable(function(result) {
                if (result.isAvailable) {
                    callback.call(scope, {
                        isAvailable: true
                    });
                } else {
                    callback.call(scope, {
                        isAvailable: false
                    });
                }
            }, function(message) {
                callback.call(scope, {
                    isAvailable: false,
                    error: message
                });
                console.error("isAvailableFingerprint error : " + message);
            });
        } else {
            //IOS
            window.plugins.touchid.isAvailable(
                function() {
                    callback.call(scope, {
                        isAvailable: true
                    });
                },
                function(msg) {
                    callback.call(scope, {
                        isAvailable: false,
                        error: msg
                    });
                }
            );
        }
    }

    /**
     * Android 与 IOS 提供同样方法
     * 绑定时利用指纹加密数据
     * @param params {Object}
     * @param params.username {String} （Android）
     * @param params.password {String} 利用指纹加密的密码（Android）
     * @param callback {Function}
     * @param callback.data {Object}
     * @param callback.data.error {String}
     * @param callback.data.isSuccess {boolean}
     * @param callback.data.token {String} 可以理解指纹加密密码的钥匙
     * @param options {Object}
     * @param options.scope {Object}
     * @param options.dialogTitle {String}
     * @param options.dialogMessage {String}
     * @param options.languageCode {String}
     */
    _this.encryptFingerprint = function(params, callback, options) {
            var scope = options ? options.scope : {};
            if (!window.isDeviceReady) {
                callback.call(scope, {
                    error: 'NO_IS_DEVICE_READY'
                })
                return false;
            }
            if (Ext.os.is('Android')) {
                var encryptConfig = {
                    clientId: "goTradeApp",
                    username: params.username,
                    disableBackup: true,
                    maxAttempts: 5,
                    password: params.password,
                    userAuthRequired: true,
                    dialogTitle: options.dialogTitle,
                    dialogMessage: options.dialogMessage,
                    locale: options.languageCode
                };

                var execEvent = function(){
                    FingerprintAuth.encrypt(encryptConfig, function(result) {
                        callback.call(scope, {
                            isSuccess: true,
                            token: result.token
                        });
                    }, function(error) {
                        var tempParams = {
                            isSuccess: false,
                            error: error
                        }

                        var isRemoveOldData = false;
                        switch (error) {
                            case 'ILLEGAL_BLOCK_SIZE_EXCEPTION':
                            case "INIT_CIPHER_FAILED":
                                isRemoveOldData = true;
                                tempParams.isChanged = true;
                                break;
                            case 'FINGERPRINT_CANCELLED':
                            case "FINGERPRINT_ERROR":
                                //取消 | 验证错误超过最大次数
                                break;
                        }
                        callback.call(scope, tempParams);
                    });
                }
                FingerprintAuth.delete(encryptConfig, function(data) {
                    execEvent();
                }, function(error) {
                    execEvent();
                });
            } else {
                //ios
                window.plugins.touchid.verifyFingerprint(
                    options.dialogMessage, // this will be shown in the native scanner popup
                    function(msg) {
                        localStorage.setItem(CordovaDeviceMannagerContant.FINGERPRINT_PASSWORD, params.password);
                        callback.call(scope, {
                            isSuccess: true,
                            token: 'defaultToken'
                        });
                    }, // success handler: fingerprint accepted
                    function(msg) {
                        //console.debug('not ok: ' + JSON.stringify(msg))
                        callback.call(scope, {
                            isSuccess: false
                        });
                    } // error handler with errorcode and localised reason
                );
            }
        }
        /**
         * 验证指纹时，取出指纹加密数据
         * 注：Android 与IOS 实现不同
         * @param params {Object}
         * @param params.username {String} （Android）
         * @param params.token {String}
         *
         * @param callback {Function}
         * @param callback.data {Object}
         * @param callback.data.isChanged {Boolean}
         * @param callback.data.isSuccess {Boolean}
         * @param callback.data.password {Boolean}
         * @param callback.data.error {String}
         * @param options {Object}
         * @param options.scope {Object}
         * @param options.dialogTitle {String}
         * @param options.dialogMessage {String}
         * @param options.languageCode {String}
         */
    _this.decryptFingerprint = function(params, callback, options) {
        var scope = options ? options.scope : {};
        if (!window.isDeviceReady) {
            callback.call(scope, {
                error: 'NO_IS_DEVICE_READY'
            })
            return false;
        }
        if (Ext.os.is('Android')) {
            var encryptConfig = {
                clientId: 'goTradeApp',
                username: params.username,
                token: params.token,
                disableBackup: true,
                dialogTitle: options.dialogTitle,
                dialogMessage: options.dialogMessage,
                locale: options.languageCode
            };
            FingerprintAuth.decrypt(encryptConfig, function(data) {
                callback.call(scope, {
                    isChanged: false,
                    isSuccess: true,
                    password: data.password
                });
            }, function(error) {
                var tempParams = {
                    error: error
                }
                var isRemoveOldData = false;
                switch (error) {
                    case 'ILLEGAL_BLOCK_SIZE_EXCEPTION':
                    case "INIT_CIPHER_FAILED":
                        isRemoveOldData = true;
                        tempParams.isChanged = true;
                        break;
                    case 'FINGERPRINT_CANCELLED':
                    case "FINGERPRINT_ERROR":
                        //取消 | 验证错误超过最大次数  
                        break;
                }
                if (isRemoveOldData) {
                    FingerprintAuth.delete(encryptConfig, function(data) {
                        callback.call(scope, tempParams);
                    }, function(error) {
                        callback.call(scope, tempParams);
                    });
                } else {
                    callback.call(scope, tempParams);
                }
            });
        } else {
            window.plugins.touchid.didFingerprintDatabaseChange(
                function(changed) {
                    if (changed) {
                        callback.call(scope, {
                            isChanged: true
                        });
                    } else {
                        //指纹未更新
                        window.plugins.touchid.verifyFingerprint(
                            options.dialogMessage, // this will be shown in the native scanner popup
                            function(msg) {
                                //console.debug('ok: ' + msg);
                                var password = localStorage.getItem(CordovaDeviceMannagerContant.FINGERPRINT_PASSWORD);
                                callback.call(scope, {
                                    isSuccess: true,
                                    password: password
                                });
                            }, // success handler: fingerprint accepted
                            function(msg) {
                                //console.debug('not ok: ' + JSON.stringify(msg))
                                callback.call(scope, {
                                    isSuccess: false
                                });
                            } // error handler with errorcode and localised reason
                        );
                    }
                }
            );
        }
    }
})(CordovaDeviceMannager);