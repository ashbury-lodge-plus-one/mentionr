'use strict';

angular.module('mentionrApp')
  .controller('DashboardCtrl', function ($scope, Auth, $location, dashboardFactory) {
 
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getCurrentUser();
    $scope.bannedWords = {};


    $scope.submit = function(word, id) {
      dashboardFactory.submitWord(word, id)
        .then(function(resp) {
          if (resp) {
            $scope.user.words.push(resp.data);
          }
        });
    };

    $scope.removeWord = function(item, word, id) {
      var i = item.$index;
      dashboardFactory.removeWord(word._id, id);
      $scope.user.words.splice(i, 1);
    };

    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.words = Auth.getCurrentUser().words;
    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };  
  });
