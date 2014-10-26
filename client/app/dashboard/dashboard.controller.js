'use strict';

angular.module('mentionrApp')
  .controller('DashboardCtrl', function ($scope, visualizationData) {
    $scope.allMentions = visualizationData.all
    if (visualizationData.x.length === 1) {
      visualizationData.x.unshift('10/24/2014')
      visualizationData.y.unshift('0')
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
