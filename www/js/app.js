// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('openapp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.controller('OpenCtrl', function($scope, $ionicModal) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];

  $ionicModal.fromTemplateUrl('templates/scanner-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.scannerModal = modal;
  });

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
  };

  $scope.scan = function scan() {
    // Filler function, should not be necessary
    $scope.scannerModal.hide();
  };
});