Ext.define('TestApp.controller.Home', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            homeView: {
                selector: 'homeView',
                xtype: 'homeView'
            },
            androidVerifyFingerprintLogin: 'button[itemId=androidVerifyFingerprintLogin]',
            checkScreenLock2Btn: 'button[itemId=checkScreenLock2Btn]',
            checkScreenLockBtn: 'button[itemId=checkScreenLockBtn]',
            checkSIMBtn: 'button[itemId=checkSIMBtn]',
            checkSIMPermissionBtn: 'button[itemId=checkSIMPermissionBtn]',
            requestSIMPermissionBtn: 'button[itemId=requestSIMPermissionBtn]',
            checkUpdateBtn: 'button[itemId=checkUpdateBtn]',
            nomalBtn: 'button[itemId=nomalSignOn]',
            safetyBtn: 'button[itemId=safetySignOn]',
            cameraBtn: 'button[itemId=camera]',
            touchIDBtn: 'button[itemId=touchID]',
            touchIDBtn2: 'button[itemId=touchID2]',
            touchIDBtn3: 'button[itemId=touchID3]',
            touchIDBtn4: 'button[itemId=touchID4]',
            touchIDBtn5: 'button[itemId=touchID5]',
            touchIDBtn6: 'button[itemId=touchID6]',
        },
        routes: {
            'home': 'goHomeView'
        },
        control: {
            androidVerifyFingerprintLogin: {
                tap: function() {
                    var verifyFingerprintAuth = function() {
                        //加密
                        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

                        /**
                         * @return {
                         *      isAvailable:boolean,
                         *      isHardwareDetected:boolean,
                         *      hasEnrolledFingerprints:boolean
                         *   }
                         */
                        function isAvailableSuccess(result) {
                            // alert("FingerprintAuth available: " + JSON.stringify(result));
                            if (result.isAvailable) {
                                var encryptConfig = {
                                    clientId: 'TestApp',
                                    username: 'levana.xue',
                                    password: '876543210',
                                    maxAttempts: 50,
                                    locale: 'zh_TW',
                                    disableBackup: false,
                                    userAuthRequired: true,
                                    dialogTile: '身份验证',
                                    dialogMessage: '请验证指纹，若指纹错误次数过多，请使用backup验证后，再验证指纹',
                                }; // See config object for required parameters
                                FingerprintAuth.encrypt(encryptConfig, function(data) {
                                    var result = [];
                                    if (data.withFingerprint) {
                                        result.push('Successfully encrypted credentials.');
                                        result.push("Encrypted credentials: " + data.token);
                                        alert('验证指纹通过');
                                    } else if (data.withBackup) {
                                        result.push("Authenticated with backup password");
                                        alert('验证backup通过,再次验证指纹');
                                        verifyFingerprintAuth();
                                    }
                                    // alert(JSON.stringify(data));

                                }, function(error) {
                                    alert(JSON.stringify(error));
                                });
                            } else {
                                alert('设备不支持指纹或未开启');
                            }
                        }

                        function isAvailableError(message) {
                            throw new Error("isAvailableError(): " + message);
                        }
                    }
                    verifyFingerprintAuth();
                }
            },
            checkScreenLock2Btn: {
                tap: function() {
                    function successCallback(isLocked) {
                        if (isLocked) {
                            alert('Phone is locked.');
                        } else {
                            alert('Phone is unlocked.');
                        }
                    }

                    function errorCallback() {
                        alert(JSON.stringify(arguments))
                    }

                    cordova.plugins.lockInfo.isLocked(
                        successCallback,
                        errorCallback
                    );
                }
            },
            checkScreenLockBtn: {
                tap: function() {
                    screenLock.isScreenLockEnabled(success, failure);

                    function success(result) {
                        if (result) {
                            alert('this device has screen lock enabled.');
                        } else {
                            alert('this device does not have screen lock enabled.');
                        }
                    };

                    function failure(err) {
                        alert("Error " + err);
                    };
                }
            },
            checkSIMBtn: {
                tap: function() {
                    window.plugins.sim.getSimInfo(function(data) {
                        alert(JSON.stringify(data));
                    }, function(error) {
                        alert(JSON.stringify(error));
                    });
                }
            },
            checkSIMPermissionBtn: {
                tap: function() {
                    function successCallback(result) {
                        alert(JSON.stringify(result));
                    }

                    function errorCallback(error) {
                        alert(JSON.stringify(error));
                    }
                    window.plugins.sim.hasReadPermission(successCallback, errorCallback);
                }
            },
            requestSIMPermissionBtn: {
                tap: function() {
                    function successCallback(result) {
                        alert(JSON.stringify(result));
                    }

                    function errorCallback(error) {
                        alert(JSON.stringify(error));
                    }
                    window.plugins.sim.requestReadPermission(successCallback, errorCallback);
                }
            },
            checkUpdateBtn: {
                tap: function() {
                    upgradeCtrl.initialize();
                }
            },
            nomalBtn: {
                tap: function() {
                    this.redirectTo('signOn/nomal');
                }
            },
            safetyBtn: {
                tap: function() {
                    this.redirectTo('signOn/safety');
                }
            },
            cameraBtn: {
                tap: function() {
                    console.log(arguments[1].event)
                    arguments[1].event.preventDefault();

                    navigator.camera.getPicture(function() {

                    }, function(e) {
                        alert('throw error .');
                    }, {
                        saveToPhotoAlbum: true,
                        quality: 100,

                    });
                }
            },
            touchIDBtn: {
                tap: function() {
                    window.plugins.touchid.isAvailable(
                        // success handler; available
                        function() {
                            window.plugins.touchid.didFingerprintDatabaseChange(
                                function(changed) {
                                    if (changed) {
                                        alert('指紋信息存在更新');
                                        // re-auth the user by asking for his credentials before allowing a fingerprint scan again
                                    } else {
                                        // call the fingerprint scanner
                                        alert('指紋信息不存在更新');
                                    }
                                }
                            );
                        },
                        // error handler; not available
                        function(msg) {
                            // use a more traditional auth mechanism
                            alert('error: ' + msg);
                        }
                    );
                }
            },
            touchIDBtn2: {
                tap: function() {
                    window.plugins.touchid.verifyFingerprint('Scan your fingerprint please',
                        function(msg) {
                            alert('ok: ' + msg);
                        },
                        function(msg) {
                            alert('not ok: ' + JSON.stringify(msg));
                        }
                    )
                }
            },
            touchIDBtn3: {
                tap: function() {
                    window.plugins.touchid.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
                        'Scan your fingerprint please', // this will be shown in the native scanner popup
                        'Enter PIN', // this will become the 'Enter password' button label
                        function(msg) {
                            alert('ok: ' + msg)
                        }, // success handler: fingerprint accepted
                        function(msg) {
                            alert('not ok: ' + JSON.stringify(msg))
                        } // error handler with errorcode and localised reason
                    );
                }
            },
            touchIDBtn4: {
                tap: function() {
                    var me = this;
                    //加密
                    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

                    /**
                     * @return {
                     *      isAvailable:boolean,
                     *      isHardwareDetected:boolean,
                     *      hasEnrolledFingerprints:boolean
                     *   }
                     */
                    function isAvailableSuccess(result) {
                        alert("FingerprintAuth available: " + JSON.stringify(result));
                        if (result.isAvailable) {
                            var encryptConfig = {
                                clientId: 'TestApp',
                                username: 'levana.xue',
                                password: '876543210',
                                maxAttempts: 3,
                                locale: 'zh_TW',
                                disableBackup: true,
                                userAuthRequired: true,
                                dialogTile: '身份验证',
                                dialogMessage: '请验证指纹',
                            }; // See config object for required parameters
                            FingerprintAuth.encrypt(encryptConfig, function(data) {
                                var result = [];
                                if (data.withFingerprint) {
                                    result.push('Successfully encrypted credentials.');
                                    result.push("Encrypted credentials: " + data.token);
                                    localStorage.setItem("token", data.token);
                                } else if (data.withBackup) {
                                    result.push("Authenticated with backup password");
                                }
                                alert(JSON.stringify(data));
                            }, function(error) {
                                alert(JSON.stringify(error));
                            });
                        } else {
                            alert('设备不支持指纹或未开启');
                        }
                    }

                    function isAvailableError(message) {
                        throw new Error("isAvailableError(): " + message);
                    }
                }
            },
            touchIDBtn5: {
                tap: function() {
                    var me = this;
                    //解密
                    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

                    /**
                     * @return {
                     *      isAvailable:boolean,
                     *      isHardwareDetected:boolean,
                     *      hasEnrolledFingerprints:boolean
                     *   }
                     */
                    function isAvailableSuccess(result) {
                        alert("FingerprintAuth available: " + JSON.stringify(result));
                        if (result.isAvailable) {
                            var token = localStorage.getItem("token");
                            var encryptConfig = {
                                clientId: 'TestApp',
                                username: 'levana.xue',
                                locale: 'zh_TW',
                                token: token,
                                disableBackup: true,
                                dialogTile: '身份验证',
                                dialogMessage: '请验证指纹',
                            }; // See config object for required parameters
                            FingerprintAuth.decrypt(encryptConfig, function(data) {
                                var result = [];
                                if (data.withFingerprint) {
                                    result.push('Successfully encrypted credentials.');
                                    result.push("Encrypted credentials: " + data.password);
                                } else if (data.withBackup) {
                                    result.push("Authenticated with backup password");
                                }
                                alert(JSON.stringify(data));
                            }, function(error) {
                                alert(JSON.stringify(error));
                            });
                        } else {
                            alert('设备不支持指纹或未开启');
                        }
                    }

                    function isAvailableError(message) {
                        throw new Error("isAvailableError(): " + message);
                    }
                }
            },
            touchIDBtn6: {
                tap: function() {
                    var me = this;
                    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

                    function isAvailableSuccess(result) {
                        if (result.isAvailable) {
                            var encryptConfig = {
                                clientId: 'TestApp',
                                username: 'levana.xue',
                                locale: 'zh_TW',
                                disableBackup: true,
                            };
                            FingerprintAuth.delete(encryptConfig, function(data) {
                                alert(JSON.stringify(data));
                            }, function(error) {
                                alert(JSON.stringify(error));
                            });
                        } else {
                            alert('设备不支持指纹或未开启');
                        }
                    }

                    function isAvailableError(message) {
                        throw new Error("isAvailableError(): " + message);
                    }
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