'use strict';

//Assume request


angular.module('mentionrApp')
  .factory('dashboard', function ($http) {
    // Service logic
    var populateWordsBar = function(user){
      $http.get('/api/users/'+user).success(function(words){
        return words;
      })
    }

    //Get Request for the Word Visualiser - Trigger on Click of Word from Left Bar
    //Returned Object with x array corresponding y array and total length
    var populateVisualizer = function(wordId){
      $http.get('/api/words/'+wordId).success(function(stats){
        var collateDates = {};
        var output = {x: [], y: [], total: stats.length};

        for (var i = 0; i < stats.length; i++) {
          var temp = stats[i].date;
          if (collateDates[temp] === undefined) {
            collateDates[temp] = {count: 1, urls: [stats[i].url]};
          } else {
            collateDates[temp].count++;
            collateDates[temp].urls.push(stats[i].url);
          }
        }
        for (var date in collateDates){
          output.x.push(date);
          output.y.push(collateDates[date]);
        }
        return output;
      })
    }

    
    // Public API here
    return {
      populateVisualizer: populateVisualizer,
      populateWordsBar: populateWordsBar
      }
  });
