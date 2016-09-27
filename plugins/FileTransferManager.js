var fileTransferManager = fileTransferManager || {};
(function (_this) {
    /**
     * 请查找 @public 为可调用方法
     * error.code:
     1 = FileTransferError.FILE_NOT_FOUND_ERR
     2 = FileTransferError.INVALID_URL_ERR
     3 = FileTransferError.CONNECTION_ERR
     4 = FileTransferError.ABORT_ERR
     5 = FileTransferError.NOT_MODIFIED_ERR
     */


    function toArray(arg) {
        if (toString.apply(arg) === '[object Array]') {
            return arg;
        } else {
            return [arg];
        }
    }

    /**
     *
     * @private
     * @param fileURL
     * @param callbacks {}
     * @param callbacks.win
     * @param callbacks.fail
     * @param callbacks.onprogress
     *
     * @param ops 可选参数，请参考cordova-plugin-file-transfer
     */
    function uploadFileByFileURL(fileURL, uploadUri, callbacks, ops) {
        //alert('in uploadFile ... ' + JSON.stringify(fileURL)+ JSON.stringify(uploadUri)+ JSON.stringify(ops));

        var options = new FileUploadOptions();
        options.fileKey = "clientLog"; //表单名称
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1); //要保存在伺服器上的檔時使用的檔案名稱
        options.mimeType = "text/plain"; //要上載的資料的 mime 類型
        options.httpMethod = 'POST';

        var params = {}; //一組要在HTTP请求中傳遞的可選的鍵值對
        options.params = params;

        var ft = new FileTransfer();

        if (callbacks.onprogress) {
            ft.onprogress = callbacks.onprogress;
        }

        var SERVER = uploadUri; //上传服务器地址
        options = Object.assign(options, ops);

        //alert([fileURL, encodeURI(SERVER),'-------',JSON.stringify(options)].join(' || '));
        ft.upload(fileURL, encodeURI(SERVER), callbacks.win, callbacks.fail, options, false);
    }

    var uploadFileByFilePath = function (filePath, uploadUri, callbacks, ops) {
        var me = this;

        var onInitFs = function (fs) {
            fs.root.getFile(filePath, {
                create: false
            }, function (fileEntry) {
                uploadFileByFileURL(fileEntry.toURL(), uploadUri, callbacks, ops);
            }, function (e) {
                if (e.code === FileError.NOT_FOUND_ERR) {
                    callbacks.fail.apply({}, [{
                        status: 'FAIL',
                        message: 'file not found.'
                    }]);
                } else {
                    errorHandler.apply({}, arguments);
                }
            });
        }
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024 * 2, onInitFs, errorHandler);
    }

    /**
     * 上传文件 可指定path，或文件内存位置file:///...
     * @public
     * @param file {}
     * @param file.path ''||[]
     * @param file.nativeURL ''||[]  @优先
     * @param file.uploadUri
     *
     * @param callbacks {}
     * @param callbacks.callback
     * @param callbacks.onprogress 上传进度，暂未处理
     *

     * @param ops 可选参数，请参考cordova-plugin-file-transfer
     */
    _this.upload = function (file, callbacks, ops) {

        var tempCallbacks = {
            win: function () {
                //alert('upload complete .');
                run();
            },
            fail: function (e) {
                //alert('fail 98989898 !!!!!');
                if (e.status === 'FAIL') {
                    callbacks.callback.apply({}, [{
                        status: 'FAIL',
                        message: 'fail not found.'
                    }]);
                } else {
                    callbacks.callback.apply({}, [{
                        status: 'FAIL',
                        message: 'upload fail'
                    }]);
                }
            },
            onprogress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    var percentage = progressEvent.loaded / progressEvent.total;
                } else {
                }
            }
        }

        if (callbacks.onprogress) {
            tempCallbacks.onprogress = callbacks.onprogress;
        }

        var queue = null;
        var isNativeURL = false;
        if (file.nativeURL) {
            isNativeURL = true;
            if (toString.apply(file.nativeURL) !== '[object Array]') {
                file.nativeURL = [file.nativeURL];
            }
            queue = file.nativeURL;
        } else {
            if (toString.apply(file.path) !== '[object Array]') {
                file.path = [file.path];
            }
            queue = file.path;
        }
        var run = function () {
            var tempVar = queue.splice(0, 1)[0];
            //alert('run : ' + tempVar)
            if (tempVar) {
                if (isNativeURL) {
                    uploadFileByFileURL(tempVar,file.uploadUri, tempCallbacks, ops);
                } else {
                    uploadFileByFilePath(tempVar,file.uploadUri,tempCallbacks, ops);
                }
            } else {
                callbacks.callback.apply({}, [{
                    status: 'SUCCESS'
                }]);
            }
        }
        run();
    }

    /**
     * @private
     */
    function errorHandler(e) {
        var msg = '';
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }
        alert('Error: ' + msg);
    }

})(fileTransferManager);