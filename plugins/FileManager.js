var fileManager = fileManager || {};
(function () {
    var emptyFunction = function(){};
    /**
     * 提供了 文件创建、文件写入、文件删除，目录创建、目录下文件读取 方法
     *
     * note: 以队列形式（queue）执行写入方法，仅作记录，未实现
     * 暂时参数全部都是 持久文件，大小也是写死 1024 * 1024 ，日后改善
     */

    var fileMgr = {};
    fileManager = fileMgr;

    var isSupportFileManager = function () {
        return typeof LocalFileSystem !== 'undefined'; //LocalFileSystem 暂时用来判断是否支持文件操作
    }
    /**
     *
     * @public
     * @param file {}
     * @param file.path
     * note：若创建 a/b/c.txt ， a/b/ 文件夹不存在会报错，请先用 requestDirectory 方法创建路径目录 再创建文件

     * @param file.size 1024*1024
     # @param callback function(){}
     */
    fileMgr.createFile = function (file, callback) {
        if (!isSupportFileManager()) {
            return false;
        }

        callback = callback || emptyFunction;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (fs) {
            fs.root.getFile(file.path, {
                create: true
            }, function(fileEntry){
                if(fileEntry.isFile === true){
                    callback.apply({},[{
                        status:'SUCCESS'
                    }])
                }else{
                    callback.apply({},[{
                        status:'FAIL'
                    }])
                }
            }, errorHandler);
        }, errorHandler);
    }

    /**
     *
     * @public
     * @param file {}
     * @param file.path
     * @param file.content

     * @param options {}
     * @param options.autoCreate boolean
     * @param options.isAppend boolean
     * @param options.limitMaxsize number

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

        callback = callback || function(){};
        var $arguments = arguments;
        var $this = this;

        //process params
        var defaultOpt = {
            autoCreate: true,
            isAppend: true,
            limitMaxsize:1024*1024*2  //2MB
        };
        options = Object.assign(defaultOpt, options);

        var fsParams = {};

        if (options.isAppend) {
            fsParams.create = false;
        }

        var createFile = function (fs, path, callback) {
            fs.root.getFile(file.path, {
                create: true,
                exclusive: true
            }, callback, errorHandler);
        }

        var writerFileFun = function (fileEntry) {
            if (file.content.length !== 0) {
                fileEntry.createWriter(function (fileWriter) {
                    /**
                     * ref api : https://dev.w3.org/2009/dap/file-system/file-writer.html
                     */
                    //alert('fileWriter ' +JSON.stringify(fileWriter));

                    var limitMaxsize = options.limitMaxsize;
                    // 控制文件大小
                    var calcTotalLength = fileWriter.length + file.content.length;

                    if ( calcTotalLength  < limitMaxsize ) {
                        if (options.isAppend) {
                            fileWriter.seek(fileWriter.length);
                        }

                        fileWriter.onwriteend = function (e) {
                            //alert('Write completed. path'+file.path+'content'+file.content);
                        };
                        fileWriter.onerror = function (e) {
                            alert('Write failed: ' + e.toString());
                        };

                        var bb = new Blob([file.content], {
                            type: 'text/plain'
                        });
                        fileWriter.write(bb);
                    }else{
                        callback.apply({},[{
                            status:'FAIL',
                            code:'FILE_SIZE_OVERFLOW',
                            message:'文件大小已满'
                        }]);
                    }
                }, errorHandler);
            }
        }

        var initFs = function (fs) {
            fs.root.getFile(file.path, {},
                function (fileEntry) {
                    writerFileFun(fileEntry)
                },
                function (e) {
                    if (e.code === FileError.NOT_FOUND_ERR) {
                        if (options.autoCreate) {
                            createFile(fs, file.path, function (fileEntry) {
                                writerFileFun(fileEntry)
                            });
                        } else {
                            throw new Error('file not exist.');
                        }
                    } else {
                        errorHandler.apply({}, arguments);
                    }
                });
        }

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, initFs, errorHandler);
    }

    /**
     *
     * @public
     *
     * @param file {}
     * @param file.path  test.txt
     *
     * @param options {} 预留
     *
     # @param callback function(){}
     */
    fileMgr.readFile = function (file, options, callback) {
        if (!isSupportFileManager()) {
            return false;
        }
        var $callback = callback;
        var read = function (fileEntry) {
            fileEntry.file(function (file) {
                //alert('read file :'+JSON.stringify(file));
                var reader = new FileReader();
                reader.onloadend = function (fileData) {
                    //alert('read file :'+JSON.stringify(this)+' ~~  '+JSON.stringify(e));
                    $callback.apply({}, [{
                        status: 'SUCCESS',
                        data: {
                            fileDetail: file,
                            content: this.result
                        }
                    }]);
                };
                reader.readAsText(file);
            }, errorHandler);
        }
        var initFs = function (fs) {
            fs.root.getFile(file.path, {},
                function (fileEntry) {
                    // Get a File object representing the file, then use FileReader to read its contents.
                    read(fileEntry);
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
        }
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, initFs, errorHandler);
    }

    /**
     *
     * 删除文件
     * @public
     *
     * @param file {}
     * @param file.path  ''||[]
     *
     * @param callback function(){}
     */
    fileMgr.removeFile = function (file, callback) {
        var $callback = callback;

        function remove(rootDirEntry, paths) {
            var path = paths.splice(0, 1)[0];
            if (path) {
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
            } else {
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
     *
     * @public
     *
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
     * data.entries[0].isFile
     * data.entries[0].isDirectory
     * data.entries[0].name
     * data.entries[0].fullPath
     * data.entries[0].nativeURL
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

        console.error('Error: ' + msg);
    }
})(fileManager)