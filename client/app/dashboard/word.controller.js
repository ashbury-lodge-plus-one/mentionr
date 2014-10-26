'use strict';

angular.module('mentionrApp')
  .controller('WordCtrl', function ($location, $scope, visualizationData, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.words = Auth.getCurrentUser().words
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };    
    $scope.allMentions = visualizationData.all
    console.log($scope.allMentions)
    if (visualizationData.x.length === 1) {
      visualizationData.x.unshift('10/24/2014')
      visualizationData.y.unshift('0')
    }

    $scope.submit = function(){
      var userId = $scope.getCurrentUser || 1;
      console.log("word",$scope.wordToSubmit);
      console.log("ID:",userId)
      dashboardFactory.submitWord($scope.wordToSubmit,userId);
    }

  	$scope.WordChart = {
      labels : visualizationData.x,
      datasets : [
        {
          fillColor : 'rgba(151,187,205,0)',
          strokeColor : '#FF6600',
          pointColor : 'rgba(151,187,205,0)',
          pointStrokeColor : '#e67e22',
          data : visualizationData.y
        }
      ]
  	};
  	$scope.myChartOptions = {};
  	$scope.vizData = visualizationData;
    $scope.message = 'Hello';
  });
