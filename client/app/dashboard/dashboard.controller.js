'use strict';

angular.module('mentionrApp')
  .controller('DashboardCtrl', function ($scope, Auth, $location, dashboardFactory) {
 
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getCurrentUser();

    $scope.submit = function(word, id) {
      dashboardFactory.submitWord(word, id)
        .then(function(resp) {
          $scope.user.words.push(resp.data);
        });
      };
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.words = Auth.getCurrentUser().words;
    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };  
  });
