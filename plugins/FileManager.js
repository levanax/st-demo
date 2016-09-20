var fileManager = fileManager || {};
(function() {
	var fileMgr = {};
	fileManager = fileMgr;

	var isSupportFileManager = function(){
		return typeof LocalFileSystem !== 'undefined'; //LocalFileSystem 暂时用来判断是否支持文件操作
	}
	/**
	* @param file {}
	* @param file.fullname  test.txt

	* @param file.size 1024*1024
	# @param callback function(){}
	*/
	var createFile = function(file, callback) {

		if (!callback) {
			callback = function() {};
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function(fs) {
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
	fileMgr.writeFile = function(file, options, callback) {
		if(!isSupportFileManager()){
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

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function(fs) {
			fs.root.getFile(file.path, fsParams,
				function(fileEntry) {
					fileEntry.createWriter(function(fileWriter) {

						if (options.isAppend) {
							//在文件结尾位置附加文字
							fileWriter.seek(fileWriter.length);
						}

						fileWriter.onwriteend = function(e) {
							alert('Write completed.');
						};

						fileWriter.onerror = function(e) {
							alert('Write failed: ' + e.toString());
						};


						var bb = new Blob(['TEST ,', file.content], {
							type: 'text/plain'
						});
						fileWriter.write(bb);
					}, errorHandler);
				},
				function(e) {
					var msg = '';
					switch (e.code) {
						case FileError.QUOTA_EXCEEDED_ERR:
							msg = 'QUOTA_EXCEEDED_ERR';
							break;
						case FileError.NOT_FOUND_ERR:
							createFile({
								fullname: file.path
							},function(){
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
					};
					if(msg !== ''){
						alert(msg);
					}
				});
		}, errorHandler);
	}

	/**
	* @param file {}
	* @param file.path  test.txt
	# @param callback function(){}
	*/
	fileMgr.readFile = function(file, callback) {
		if(!isSupportFileManager()){
			return false;
		}
		var $callback = callback;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function(fs) {
			fs.root.getFile(file.path, {},
				function(fileEntry) {
					// Get a File object representing the file,
					// then use FileReader to read its contents.
					fileEntry.file(function(file) {
						var reader = new FileReader();

						reader.onloadend = function(e) {
							// var txtArea = document.createElement('textarea');
							// txtArea.value = this.result;
							// document.body.appendChild(txtArea);

							$callback.apply({},[{
								status:'SUCCESS',
								content:JSON.stringify(this.result)
							}]);
						};
						reader.readAsText(file);
					}, errorHandler);
				}, function(e){
					if(e.code === FileError.NOT_FOUND_ERR){
						$callback.apply({},[{
							status:'FAIL',
							message:'path: '+file.path + ' not found .'
						}]);
					}else{
						errorHandler.apply({},arguments);
					}
				});
		}, errorHandler);
	}

	/**
	 *
	 * @param directory {}
	 * @param directory.path
	 *
	 * @param options {}
	 * @param options.autoCreate
	 *
	 * @param callback function(){}
     */
	fileMgr.requestDirectory = function(directory,options, callback){
		if(!isSupportFileManager()){
			return false;
		}
		var path = directory.path;
		var $callback = callback;

		var autoCreate = false;
		if(options.autoCreate){
			autoCreate = true;
		}

		function createDir(rootDirEntry, folders) {
			// Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
			if (folders[0] == '.' || folders[0] == '') {
				folders = folders.slice(1);
			}
			//alert('create : '+folders[0]);
			if(typeof folders[0] !== 'undefined'){
				rootDirEntry.getDirectory(folders[0], {create:true}, function(dirEntry) {
					if (folders.length) {
						createDir(dirEntry, folders.slice(1));
					}else{
						$callback.apply({},[{
							status:'SUCCESS'
						}]);
					}
				}, errorHandler);
			}else{
				$callback.apply({},[{
					status:'SUCCESS'
				}]);
			}
		};

		function checkDir(rootDirEntry, folders){
			if (folders[0] == '.' || folders[0] == '') {
				folders = folders.slice(1);
			}
			//alert('check  : '+folders[0]);
			rootDirEntry.getDirectory(folders[0], {}, function(dirEntry) {
				if(dirEntry.isDirectory){
					checkDir(dirEntry,folders.slice(1));

					if (folders.length === 0){
						$callback.apply({},[{
							status:'SUCCESS'
						}]);
					}
				}else{
					createDir(rootDirEntry,folders);
				}
			}, function(e){
				if(e.code === FileError.NOT_FOUND_ERR){
					if(autoCreate){
						createDir(rootDirEntry,folders);
					}else{
						$callback.apply({},[{
							status:'FAIL',
							message:'dir not found.'
						}]);
					}
				}else{
					errorHandler.apply({},arguments);
				}
			});
		}

		var onInitFs = function(fs){
			checkDir(fs.root, path.split('/'));
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, onInitFs, errorHandler);
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
		};

		alert('Error: ' + msg);
	}
})(fileManager)