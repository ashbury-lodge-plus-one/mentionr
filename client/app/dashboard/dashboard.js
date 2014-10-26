'use strict';

angular.module('mentionrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        // resolve: {
     //    	visualizationData : [ 'dashboardFactory', function(dashboardFactory) {
     //    		return dashboardFactory.populateVisualizer("544c622a5a6c2b534900717a").then(function(data){
					// return data;
     //    		});
     //    	}]
        // },
        // authenticate: true
      })
      .state('dashboard.word', {
      	url: '/word/:wordId',
      	templateUrl: 'app/dashboard/word.html',
      	controller: 'WordCtrl',
      	resolve: {
      		visualizationData : [ 'dashboardFactory', function(dashboardFactory) {
        		return dashboardFactory.populateVisualizer('544c8d015b5aa50000c7ef59')
              .then(function(data){
      					return data;
          		});
          	}]
      	}
      });
  });