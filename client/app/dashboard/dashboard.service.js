'use strict';

//Assume request


angular.module('mentionrApp')
  .factory('dashboard', function ($http) {
    // Service logic
    var populateWordsBar = function(user){
      $http.get('/api/users/'+user).success(function(words){
        return words;
      });
    };

    //Get Request for the Word Visualiser - Trigger on Click of Word from Left Bar
    //Returned Object with x array corresponding y array and total length
    var populateVisualizer = function(wordId){
      $http.get('/api/words/'+wordId).success(function(stats){
        var collateDates = {};
        var output = {x: [], y: [], all: [], total: stats.length};
        var dateMin = stats[0].date;
        var dateMax = stats[0].date;
        for (var i = 0; i < stats.length; i++) {
          dateMin = stats[i].date < dateMin ? stats[i].date : dateMin;
          dateMax = stats[i].date > dateMax ? stats[i].date : dateMax;
          var temp = new Date(stats[i].date*1000);
          var dateTime = temp.getMonth() + '/' + temp.getDate() + '/' + temp.getFullYear();
          if (collateDates[dateTime] === undefined) {
            collateDates[dateTime] = {count: 1, urls: [stats[i].url]};
          } else {
            collateDates[dateTime].count++;
            collateDates[dateTime].urls.push(stats[i].url);
          }
        }
      
        var days = (dateMax-dateMin)/(60*60*24);
        
        var array = [];
        
        for (var j = 0; j < Math.ceil(days); j++) {
          var d = dateMin + j*60*60*24;
          var d2 = new Date(d*1000);
          var d3 = d2.getMonth() + '/' + d2.getDate() + '/' + d2.getFullYear();
          if (collateDates[d3] === undefined) {
            array.push({date: d3, data: {count: 0, urls: []}});
          } else {
            array.push({date: d3, data: collateDates[d3]});
          }
        }
        
        output.all = collateDates;
        for (var ii = 0; ii < array.length; ii++) {
          output.x.push(array[ii].date);
          output.y.push(array[ii].data.count);
        }
        
        return output;
    });
    
    };
    
    // Public API here
    return {
      populateVisualizer: populateVisualizer,
      populateWordsBar: populateWordsBar
      };
  });
