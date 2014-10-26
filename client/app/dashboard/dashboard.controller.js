'use strict';

angular.module('mentionrApp')
  .controller('DashboardCtrl', function ($scope, Auth, dashboardFactory) {
 
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.words = Auth.getCurrentUser().words;


    $scope.submit = function() {
      var userId = $scope.getCurrentUser._id;
      dashboardFactory.submitWord($scope.wordToSubmit, userId);
    };
  	
    $scope.message = 'Hello';
  });
