'use strict';

angular.module('mentionrApp')

  .controller('WordCtrl', function ($location, $rootScope, $scope, visualizationData, Auth, dashboardFactory) {
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser();
      $scope.words = Auth.getCurrentUser().words;
      $rootScope.word = visualizationData.word;
      $scope.allMentions = visualizationData.all;
      
      if (visualizationData.x.length < 2) {
        var temp = new Date(Date.now()-86400000);
        var temp2 = new Date(Date.now()-2*86400000) 
        var dt = temp.getMonth() +1 + '/' + temp.getDate() + '/' + temp.getFullYear();
        var dt2 = temp2.getMonth() + 1 + '/' + temp2.getDate() + '/' + temp2.getFullYear();
        visualizationData.x.unshift(dt);
        visualizationData.y.unshift('0');
        visualizationData.x.unshift(dt2);
        visualizationData.y.unshift('0');
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
