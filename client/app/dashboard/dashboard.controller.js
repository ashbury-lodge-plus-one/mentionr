'use strict';

angular.module('mentionrApp')
  .controller('DashboardCtrl', function ($scope, visualizationData, Auth, dashboardFactory) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser();

    $scope.submit = function(){
      var userId = $scope.getCurrentUser.userId;
      dashboardFactory.submitWord($scope.wordToSubmit,userId);
    };
    $scope.message = 'Hello';
  });
