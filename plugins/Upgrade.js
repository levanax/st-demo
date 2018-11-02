var upgradeCtrl = {

  initialize: function() {
    this.onDeviceReady();
  },

  // bindEvents: function() {
  //   document.addEventListener('deviceready', this.onDeviceReady, false);
  // },

  onDeviceReady: function() {
    // check, if update was previously loaded and available for download
    chcp.isUpdateAvailableForInstallation(function(error, data) {
      if (error) {
        console.log('Nothing to install. Executing fetch.');
        chcp.fetchUpdate(upgradeCtrl.fetchUpdateCallback);
        return;
      }

      // update is in cache and can be installed - install it
      console.log('Current version: ' + data.currentVersion);
      console.log('About to install: ' + data.readyToInstallVersion);
      chcp.installUpdate(upgradeCtrl.installationCallback);
    });
  },

  fetchUpdateCallback: function(error, data) {
    if (error) {
      console.log('Failed to load the update with error code: ' + error.code);
      console.log(error.description);
      return;
    }
    console.log('Update is loaded');
  },

  installationCallback: function(error) {
    if (error) {
      console.log('Failed to install the update with error code: ' + error.code);
      console.log(error.description);
    } else {
      console.log('Update installed!');
    }
  }
};