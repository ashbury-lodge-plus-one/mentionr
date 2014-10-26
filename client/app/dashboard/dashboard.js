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
          visualizationData : [ 'dashboardFactory', '$stateParams', function(dashboardFactory, $stateParams) {
            console.log($stateParams) 
            return dashboardFactory.populateVisualizer($stateParams.wordId)
              .then(function(data){
                return data;
              });
          }]
        }
      });
  });