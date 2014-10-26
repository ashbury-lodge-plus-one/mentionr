'use strict';

angular.module('mentionrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
        	visualizationData : [ 'dashboardFactory', function(dashboardFactory) {
        		return dashboardFactory.populateVisualizer().then(function(data){
					return data
        		});
        	}]
        }
      });
  });