var fileManager = fileManager || {};
(function() {
	var fileMgr = {};
	fileManager = fileMgr;

	/**
	* @param file {}
	* @param file.fullname  test.txt
	* @param file.size 1024*1024
	# @param callback function(){}
	*/
	fileMgr.createFile = function(file, callback) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, file.size, function(fs) {
			fs.root.getFile(file.fullname, {
					create: true,
					exclusive: false
				},
				function() {
					alert('create success ..');
				}, errorHandler);
		}, errorHandler);
	}

	/**
	* @param file {}
	* @param file.path
	* @param file.content

	# @param callback function(){}
	*/
	fileMgr.writeFile = function(file, callback) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function(fs) {
			fs.root.getFile(file.path, {
					create: true
				},
				function(fileEntry) {
					fileEntry.createWriter(function(fileWriter) {

						fileWriter.onwriteend = function(e) {
							alert('Write completed.');
						};

						fileWriter.onerror = function(e) {
							alert('Write failed: ' + e.toString());
						};


						var bb = new Blob(['TEST ,',file.content], {
							type: 'text/plain'
						});
						fileWriter.write(bb);
					}, errorHandler);
				}, errorHandler);
		}, errorHandler);
	}

	/**
	* @param file {}
	* @param file.path  test.txt
	# @param callback function(){}
	*/
	fileMgr.readFile = function(file, callback) {
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

							alert(JSON.stringify(this.result));
						};

						reader.readAsText(file);
					}, errorHandler);
				}, errorHandler);
		}, errorHandler);
	}


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