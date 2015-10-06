// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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


.controller('videoController', function($scope, $http) {
  $scope.videos = null
  $http.get("http://mizikjams.com/api/videos.json")
  .success(function (data) {$scope.videos = data.videos});

  $scope.moredata = false; debugger;
    $scope.loadMoreData=function(){
        $scope.item.push({id: $scope.item.length});
        if($scope.item.length==8)
        {
            $scope.moredata=true;
        }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

  $scope.items=[];

  $scope.doRefresh=function(){
     $http.get("http://mizikjams.com/api/videos.json")
     .success(function (data) {
     $scope.videos = data.videos;
     $scope.$broadcast('scroll.refreshComplete');

    });

  }

});



