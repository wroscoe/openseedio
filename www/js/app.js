// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('openapp', ['ionic', 'pubnub.angular.service'])

.run(function($ionicPlatform, PubNub) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      window.bluetoothle = cordova.plugins.BluetoothLePlugin;
      console.log('cordova present');
      console.log(window.bluetoothle);
      console.log(cordova.plugins);
      console.log(window);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PubNub.init({
      publish_key:'demo',
      subscribe_key:'demo',
      uuid:'an_optional_user_uuid'
    });

  });
})


.controller('OpenCtrl', function($scope, PubNub) {


/*
  $ionicModal.fromTemplateUrl('templates/scanner-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.scannerModal = modal;
  });

*/

  $scope.showScanner = function showScanner() {
    // $scope.scannerModal.show();

    cordova.plugins.barcodeScanner.scan(
      function (result) {
        $scope.$apply(function () {
          $scope.setCode(result.text.replace(/.*\//, ''));
        });
      },
      function (error) {
        alert("Scanning failed: " + error);
      }
    );
  };

  $scope.setCode = function setCode(newCode) {
    $scope.lastCode = newCode;

    PubNub.ngPublish({
      channel: "tessel-locker",
      message: newCode
    });
  };

  $scope.scan = function scan() {
    // Filler function, should not be necessary
    $scope.scannerModal.hide();
  };

/*
  $scope.scanBLE = function() {
    console.log('scanBLE');
    console.log(navigator);
    
    var params = {};

    var err = function (e) {
      console.log(e);
    };

    window.bluetoothle.initialize(function() {
      console.log('intializing bluetooth');
      window.bluetoothle.startScan(function(status) {
        console.log('scan successful');
        console.log(status);
      },
      err, params);}
    , err, params);
    alert("scanBLUE");
  };
  */



  $scope.sendPubNub = function() {
    PubNub.ngPublish({
      channel: "tessel-locker",
      message: "hello"
    });
  };
});