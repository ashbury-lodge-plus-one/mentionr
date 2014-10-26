'use strict';

//Assume request
angular.module('mentionrApp')
  .factory('dashboardFactory', function ($http) {
    // Service logic
    //Is this needed or is this being found on log in?
    var bannedWords = {};
    bannedWords["a"] = 1;
    bannedWords["about"] = 1;
    bannedWords["above"] = 1;
    bannedWords["after"] = 1;
    bannedWords["again"] = 1;
    bannedWords["against"] = 1;
    bannedWords["all"] = 1;
    bannedWords["am"] = 1;
    bannedWords["an"] = 1;
    bannedWords["and"] = 1;
    bannedWords["any"] = 1;
    bannedWords["are"] = 1;
    bannedWords["aren't"] = 1;
    bannedWords["as"] = 1;
    bannedWords["at"] = 1;
    bannedWords["be"] = 1;
    bannedWords["because"] = 1;
    bannedWords["been"] = 1;
    bannedWords["before"] = 1;
    bannedWords["being"] = 1;
    bannedWords["below"] = 1;
    bannedWords["between"] = 1;
    bannedWords["both"] = 1;
    bannedWords["but"] = 1;
    bannedWords["by"] = 1;
    bannedWords["can't"] = 1;
    bannedWords["cannot"] = 1;
    bannedWords["could"] = 1;
    bannedWords["couldn't"] = 1;
    bannedWords["did"] = 1;
    bannedWords["didn't"] = 1;
    bannedWords["do"] = 1;
    bannedWords["does"] = 1;
    bannedWords["doesn't"] = 1;
    bannedWords["doing"] = 1;
    bannedWords["don't"] = 1;
    bannedWords["down"] = 1;
    bannedWords["during"] = 1;
    bannedWords["each"] = 1;
    bannedWords["few"] = 1;
    bannedWords["for"] = 1;
    bannedWords["from"] = 1;
    bannedWords["further"] = 1;
    bannedWords["had"] = 1;
    bannedWords["hadn't"] = 1;
    bannedWords["has"] = 1;
    bannedWords["hasn't"] = 1;
    bannedWords["have"] = 1;
    bannedWords["haven't"] = 1;
    bannedWords["having"] = 1;
    bannedWords["he"] = 1;
    bannedWords["he'd"] = 1;
    bannedWords["he'll"] = 1;
    bannedWords["he's"] = 1;
    bannedWords["her"] = 1;
    bannedWords["here"] = 1;
    bannedWords["here's"] = 1;
    bannedWords["hers"] = 1;
    bannedWords["herself"] = 1;
    bannedWords["him"] = 1;
    bannedWords["himself"] = 1;
    bannedWords["his"] = 1;
    bannedWords["how"] = 1;
    bannedWords["how's"] = 1;
    bannedWords["i"] = 1;
    bannedWords["i'd"] = 1;
    bannedWords["i'll"] = 1;
    bannedWords["i'm"] = 1;
    bannedWords["i've"] = 1;
    bannedWords["if"] = 1;
    bannedWords["in"] = 1;
    bannedWords["into"] = 1;
    bannedWords["is"] = 1;
    bannedWords["isn't"] = 1;
    bannedWords["it"] = 1;
    bannedWords["it's"] = 1;
    bannedWords["its"] = 1;
    bannedWords["itself"] = 1;
    bannedWords["let's"] = 1;
    bannedWords["me"] = 1;
    bannedWords["more"] = 1;
    bannedWords["most"] = 1;
    bannedWords["mustn't"] = 1;
    bannedWords["my"] = 1;
    bannedWords["myself"] = 1;
    bannedWords["no"] = 1;
    bannedWords["nor"] = 1;
    bannedWords["not"] = 1;
    bannedWords["of"] = 1;
    bannedWords["off"] = 1;
    bannedWords["on"] = 1;
    bannedWords["once"] = 1;
    bannedWords["only"] = 1;
    bannedWords["or"] = 1;
    bannedWords["other"] = 1;
    bannedWords["ought"] = 1;
    bannedWords["our"] = 1;
    bannedWords["ours"] = 1;
    bannedWords["ourselves"] = 1;
    bannedWords["out"] = 1;
    bannedWords["over"] = 1;
    bannedWords["own"] = 1;
    bannedWords["same"] = 1;
    bannedWords["shan't"] = 1;
    bannedWords["she"] = 1;
    bannedWords["she'd"] = 1;
    bannedWords["she'll"] = 1;
    bannedWords["she's"] = 1;
    bannedWords["should"] = 1;
    bannedWords["shouldn't"] = 1;
    bannedWords["so"] = 1;
    bannedWords["some"] = 1;
    bannedWords["such"] = 1;
    bannedWords["than"] = 1;
    bannedWords["that"] = 1;
    bannedWords["that's"] = 1;
    bannedWords["the"] = 1;
    bannedWords["their"] = 1;
    bannedWords["theirs"] = 1;
    bannedWords["them"] = 1;
    bannedWords["themselves"] = 1;
    bannedWords["then"] = 1;
    bannedWords["there"] = 1;
    bannedWords["there's"] = 1;
    bannedWords["these"] = 1;
    bannedWords["they"] = 1;
    bannedWords["they'd"] = 1;
    bannedWords["they'll"] = 1;
    bannedWords["they're"] = 1;
    bannedWords["they've"] = 1;
    bannedWords["this"] = 1;
    bannedWords["those"] = 1;
    bannedWords["through"] = 1;
    bannedWords["to"] = 1;
    bannedWords["too"] = 1;
    bannedWords["under"] = 1;
    bannedWords["until"] = 1;
    bannedWords["up"] = 1;
    bannedWords["very"] = 1;
    bannedWords["was"] = 1;
    bannedWords["wasn't"] = 1;
    bannedWords["we"] = 1;
    bannedWords["we'd"] = 1;
    bannedWords["we'll"] = 1;
    bannedWords["we're"] = 1;
    bannedWords["we've"] = 1;
    bannedWords["were"] = 1;
    bannedWords["weren't"] = 1;
    bannedWords["what"] = 1;
    bannedWords["what's"] = 1;
    bannedWords["when"] = 1;
    bannedWords["when's"] = 1;
    bannedWords["where"] = 1;
    bannedWords["where's"] = 1;
    bannedWords["which"] = 1;
    bannedWords["while"] = 1;
    bannedWords["who"] = 1;
    bannedWords["who's"] = 1;
    bannedWords["whom"] = 1;
    bannedWords["why"] = 1;
    bannedWords["why's"] = 1;
    bannedWords["with"] = 1;
    bannedWords["won't"] = 1;
    bannedWords["would"] = 1;
    bannedWords["wouldn't"] = 1;
    bannedWords["you"] = 1;
    bannedWords["you'd"] = 1;
    bannedWords["you'll"] = 1;
    bannedWords["you're"] = 1;
    bannedWords["you've"] = 1;
    bannedWords["your"] = 1;
    bannedWords["yours"] = 1;
    bannedWords["yourself"] = 1;
    bannedWords["yourselves"] = 1;

    var populateWordsBar = function(user){
      $http.get('/api/users/'+user).success(function(words){
        return words;
      });
    };

    var submitWord = function(word, userId){
      if (bannedWords[word]) {
        alert("Word not allowed.");
        return;
      }
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
