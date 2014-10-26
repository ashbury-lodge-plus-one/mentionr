'use strict';

angular.module('mentionrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('dashboard.word', {
      	url: '/word/:wordId',
      	templateUrl: 'app/dashboard/word.html',
      	controller: 'WordCtrl',
      	resolve: {
      		visualizationData : [ 'dashboardFactory', function(dashboardFactory) {
          	return dashboardFactory.populateVisualizer("544c9bdf808d429d5c265e06").then(function(data){
          		console.log(data)
    					return data;
            });
        	}]
      	}
      });
  });