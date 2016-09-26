var fileManager = fileManager || {};
(function () {
    /**
     * note: 以队列形式（queue）执行写入方法
     *
     *
     *
     */

    var fileMgr = {};
    fileManager = fileMgr;

    var isSupportFileManager = function () {
        return typeof LocalFileSystem !== 'undefined'; //LocalFileSystem 暂时用来判断是否支持文件操作
    }
    /**
     * @param file {}
     * @param file.fullname  test.txt

     * @param file.size 1024*1024
     # @param callback function(){}
     */
    var createFile = function (file, callback) {

        if (!callback) {
            callback = function () {
            };
        }
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (fs) {
            fs.root.getFile(file.fullname, {
                create: true,
                exclusive: true
            }, callback, errorHandler);
        }, errorHandler);
    }

    /**
     * @param file {}
     * @param file.path
     * @param file.content

     * @param options {}
     * @param options.autoCreate boolean
     * @param options.isAppend boolean

     # @param callback function(){}
     */
    fileMgr.writeFile = function (file, options, callback) {
        if (!isSupportFileManager()) {
            console.debug(file.content);
            return false;
        }
        // alert('file:'+JSON.stringify(file));
        // alert('options:'+JSON.stringify(options));
        // alert('callback:'+JSON.stringify(callback));

        var $arguments = arguments;
        var $this = this;

        //process params
        var options = {
            autoCreate: true,
            isAppend: true
        };

        var fsParams = {};

        if (options.isAppend) {
            fsParams.create = false;
        }

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (fs) {
            fs.root.getFile(file.path, fsParams,
                function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {

                        if (options.isAppend) {
                            //在文件结尾位置附加文字
                            fileWriter.seek(fileWriter.length);
                        }

                        fileWriter.onwriteend = function (e) {
                            //alert('Write completed.');
                        };

                        fileWriter.onerror = function (e) {
                            alert('Write failed: ' + e.toString());
                        };


                        var bb = new Blob([file.content], {
                            type: 'text/plain'
                        });
                        fileWriter.write(bb);
                    }, errorHandler);
                },
                function (e) {

                    var msg = '';
                    switch (e.code) {
                        case FileError.QUOTA_EXCEEDED_ERR:
                            msg = 'QUOTA_EXCEEDED_ERR';
                            break;
                        case FileError.NOT_FOUND_ERR:
                            createFile({
                                fullname: file.path
                            }, function () {
                                $arguments.callee($arguments[0], $arguments[1], $arguments[2]);
                            });
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
                });
        }, errorHandler);
    }

    /**
     * @param file {}
     * @param file.path  test.txt
     # @param callback function(){}
     */
    fileMgr.readFile = function (file, callback) {
        if (!isSupportFileManager()) {
            return false;
        }
        var $callback = callback;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (fs) {
            fs.root.getFile(file.path, {},
                function (fileEntry) {
                    // Get a File object representing the file,
                    // then use FileReader to read its contents.
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function (e) {
                            // var txtArea = document.createElement('textarea');
                            // txtArea.value = this.result;
                            // document.body.appendChild(txtArea);

                            $callback.apply({}, [{
                                status: 'SUCCESS',
                                content: JSON.stringify(this.result)
                            }]);
                        };
                        reader.readAsText(file);
                    }, errorHandler);
                }, function (e) {
                    if (e.code === FileError.NOT_FOUND_ERR) {
                        $callback.apply({}, [{
                            status: 'FAIL',
                            message: 'path: ' + file.path + ' not found .'
                        }]);
                    } else {
                        errorHandler.apply({}, arguments);
                    }
                });
        }, errorHandler);
    }

    /**
     * 删除文件
     * @param file {}
     * @param file.path  ''||[]
     *
     * @param callback function(){}
     */
    fileMgr.removeFile = function (file, callback) {
        var $callback = callback;

        function remove(rootDirEntry, paths) {
            var path = paths.splice(0, 1)[0];
            if(path){
                rootDirEntry.getFile(path, {create: false}, function (fileEntry) {
                    fileEntry.remove(function () {
                        //alert('delete file'+path)
                        if (paths.length !== 0) {
                            remove(rootDirEntry, paths);
                        } else {
                            //removed all.
                            //alert('delete file complete.');
                            $callback.apply({}, [{
                                status: 'SUCCESS'
                            }]);
                        }
                    }, errorHandler);
                }, function (e) {
                    if (e.code === FileError.NOT_FOUND_ERR) {
                        $callback.apply({}, [{
                            status: 'FAIL',
                            message: 'file not found.'
                        }]);
                    } else {
                        errorHandler.apply({}, arguments);
                    }
                });
            }else{
                $callback.apply({}, [{
                    status: 'SUCCESS'
                }]);
            }
        }

        function onInitFs(fs) {
            var paths = null;
            if (toString.apply(file.path) === '[object Array]') {
                paths = file.path;
            } else {
                paths = [file.path];
            }
            remove(fs.root, paths);
        }

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, onInitFs, errorHandler);
    }

    /**
     * 检查目录是否存在，也可自动创建，请查看参数
     * @param directory {}
     * @param directory.path
     *
     * @param options {}
     * @param options.autoCreate boolean false
     * @param options.allowRetrieveFiles boolean false
     *
     * -------------------------------------------------
     * @param callback function(){}
     * note: callback(data) 回调函数响应参数值
     * data.status
     * data.message
     *
     * data.entries []  ? allowRetrieveFiles=true
     * data.entries[0].obj.isFile
     * data.entries[0].obj.isDirectory
     * data.entries[0].obj.name
     * data.entries[0].obj.fullPath
     * data.entries[0].obj.nativeURL
     *
     * --------------------------------------------------
     *
     */
    fileMgr.requestDirectory = function (directory, options, callback) {
        if (!isSupportFileManager()) {
            return false;
        }
        var path = directory.path;
        var $callback = callback;

        var defaultOpt = {
            autoCreate: false,
            allowRetrieveFiles: false
        };
        options = Object.assign(defaultOpt, options);

        /**
         * 创建目录
         * @param rootDirEntry
         * @param folders
         */
        function createDir(rootDirEntry, folders) {
            // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
            if (folders[0] == '.' || folders[0] == '') {
                folders = folders.slice(1);
            }
            //alert('create : '+folders[0]);
            if (toString.apply(folders[0]) === "[object String]" && folders[0].trim() !== '') {
                rootDirEntry.getDirectory(folders[0], {create: true}, function (dirEntry) {
                    folders = folders.slice(1);
                    if (folders.length) {
                        createDir(dirEntry, folders);
                    } else {
                        $callback.apply({}, [{
                            status: 'SUCCESS'
                        }]);
                    }
                }, errorHandler);
            } else {
                $callback.apply({}, [{
                    status: 'SUCCESS'
                }]);
            }
        };

        /**
         * 检索目录下文件夹或文件 return []
         * @param rootDirEntry
         * @return entries [] 目录下文件列表
         */
        function retrieveFiles(rootDirEntry) {
            var dirReader = rootDirEntry.createReader();
            var entries = [];

            // Call the reader.readEntries() until no more results are returned.
            var readEntries = function () {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        var array = entries.sort();
                        $callback.apply({}, [{
                            status: 'SUCCESS',
                            entries: array
                        }]);
                    } else {
                        entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                        readEntries();
                    }
                }, errorHandler);
            };
            readEntries(); // Start reading dirs.
        }

        /**
         * 检查目录是否存在
         * @param rootDirEntry
         * @param folders
         */
        function checkDir(rootDirEntry, folders) {
            if (folders[0] == '.' || folders[0] == '') {
                folders = folders.slice(1);
            }
            //alert('check  : '+folders[0]);
            rootDirEntry.getDirectory(folders[0], {}, function (dirEntry) {
                if (dirEntry.isDirectory) {
                    folders = folders.slice(1);
                    if (folders.length === 0) {
                        if (options.allowRetrieveFiles) {
                            retrieveFiles(dirEntry);
                        } else {
                            $callback.apply({}, [{
                                status: 'SUCCESS'
                            }]);
                        }
                    } else {
                        checkDir(dirEntry, folders);
                    }
                } else {
                    createDir(rootDirEntry, folders);
                }
            }, function (e) {
                if (e.code === FileError.NOT_FOUND_ERR) {
                    if (options.autoCreate) {
                        createDir(rootDirEntry, folders);
                    } else {
                        $callback.apply({}, [{
                            status: 'FAIL',
                            message: 'dir not found.'
                        }]);
                    }
                } else {
                    errorHandler.apply({}, arguments);
                }
            });
        }

        var onInitFs = function (fs) {
            checkDir(fs.root, path.split('/'));
        }
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, onInitFs, errorHandler);
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
})(fileManager)