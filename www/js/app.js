// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'jett.ionic.filter.bar'])

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

.controller('videoController', function($scope, $http,$timeout, $ionicSideMenuDelegate, $ionicLoading, $ionicFilterBar) {
  $scope.videos = null

  $ionicLoading.show({
    template:'<ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true

  })

  $http.get("http://mizikjams.com/api/videos.json")
  .success(function (data) {
    $ionicLoading.hide()
    $scope.videos = data.videos

  });

  $scope.doRefresh=function(){
     $http.get("http://mizikjams.com/api/videos.json")
     .success(function (data) {
     $scope.videos = data.videos;
     $scope.$broadcast('scroll.refreshComplete');

    });

  }

  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }

  var filterBarInstance;

   function getVideos () {
     $http.get("http://mizikjams.com/api/videos.json")
     .success(function (data) {
       $scope.videos = data.videos
     });
   }

   getVideos();

   $scope.showFilterBar = function () {
     filterBarInstance = $ionicFilterBar.show({
       videos: getVideos(),
       update: function (filteredItems, filterText) {
         $scope.videos = filteredItems;
         if (filterText) {
           console.log(filterText);
         }
        filterProperties: ['title', 'band']
       }

     });
   };

   $scope.refreshItems = function () {
     if (filterBarInstance) {
       filterBarInstance();
       filterBarInstance = null;
     }

     $timeout(function () {
         getVideos();
         $scope.$broadcast('scroll.refreshComplete');
       });
     };
});
