'use strict';

//Assume request
angular.module('mentionrApp')
  .factory('dashboardFactory', function ($http) {
    // Service logic
    //Is this needed or is this being found on log in?
    var populateWordsBar = function(user){
      $http.get('/api/users/'+user).success(function(words){
        return words;
      });
    };

    var submitWord = function(word, userId){
      return $http({
        url: '/api/words/',
        method: 'POST',
        data: {userId: userId, word: word}
      })
      .success(function(userData){
        return userData;
      });
    };

    //Get Request for the Word Visualiser - Trigger on Click of Word from Left Bar
    //Returned Object with x array corresponding y array and total length

    var populateVisualizer = function(wordId){
      return $http.get('/api/words/' + wordId)
        .then(function(stats) {
          stats = stats.data;
          console.log(stats)
          var collateDates = {};
          var output = {x: [], y: [], all: stats.articles, total: stats.articles.length};
          var dateMin = stats.articles[0].date;
          var dateMax = stats.articles[0].date;

          for (var i = 0; i < stats.articles.length; i++) {
            dateMin = stats.articles[i].date < dateMin ? stats.articles[i].date : dateMin;
            dateMax = stats.articles[i].date > dateMax ? stats.articles[i].date : dateMax;
            var temp = new Date(stats.articles[i].date * 1000);
            var dateTime = (temp.getMonth() + 1) + '/' + temp.getDate() + '/' + temp.getFullYear();

            if (collateDates[dateTime] === undefined) {
              collateDates[dateTime] = {count: 1, urls: [stats.articles[i].url]};
            } else {
              collateDates[dateTime].count++;
              collateDates[dateTime].urls.push(stats.articles[i].url);
            }
          }
        
          var days = (dateMax - dateMin)/(60 * 60 * 24);
          var array = [];
          
          for (i = 0; i < Math.ceil(days); i++) {
            var d = parseFloat(dateMin) + (i * 60 * 60 * 24);
            var d2 = new Date(d * 1000);
            var d3 = (d2.getMonth() + 1) + '/' + d2.getDate() + '/' + d2.getFullYear();
            if (collateDates[d3] === undefined) {
              array.push({date: d3, data: {count: 0, urls: []} });
            } else {
              array.push({date: d3, data: collateDates[d3]});
            }
          }
          output.word = stats.word
          for (i = 0; i < array.length; i++) {
            output.x.push(array[i].date);
            output.y.push(array[i].data.count);
          }
          
          return output;
        });
    };
    
    // Public API here
    return {
      populateVisualizer: populateVisualizer,
      populateWordsBar: populateWordsBar,
      submitWord: submitWord
      };
  });
