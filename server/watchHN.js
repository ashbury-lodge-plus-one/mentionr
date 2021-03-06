var request = require('request');
var sentiment = require('sentiment');
var Word = require('./api/word/word.model');
var startPoint = 8510405; // Arbirtary...
var historyPoint = 8499000;


var saveEntry = function(item, id, entry, theSentiment) {
  var article = {
    title: item.title,
    storyUrl: item.url,
    url: 'http://news.ycombinator.com/item?id=' + item.id,
    by: item.by,
    date: item.time,
    body: item.text,
    itemType: item.type,
    sentiment: theSentiment
  };

  Word.findOne({_id: id}, function(err, word) {
    if (err) {
      return new Error(err);
    }
    if (!word) {
      var newWord = new Word({articles: [article]});
      return newWord.save();
    }
    word.articles.push(article);
    word.save();
  });
}

var getSentiment = function(string){
  if(!string || string === undefined){return 'Neutral'}
  var sent = sentiment(string).score;
  if(sent > 0){
    if(sent >= 0 && sent < 3){
      return "Positive";
    } else if(sent >= 3 && sent < 9){
      return "Quite Positive";
    } else if(sent >= 9 && sent < 12){
      return "Very Positive";
    } else if(sent >= 12 && sent < 15){
      return "Extremely Positive";
    } else if(sent >= 15){
      return "Incredibly Positive";
    }
  } else if (sent < 0) {
    if(sent < 0 && sent > -3){
      return "Negative";
    } else if(sent <= -3 && sent > -6){
      return "Quite Negative";
    } else if(sent <= -6 && sent > -9){
      return "Very Negative";
    } else if(sent <= -9 && sent > -12){
      return "Extremely Negative";
    } else if(sent <= -12){
      return "Incredibly Negative";
    }
  } else if(sent === 0) {
      return "Neutral";
  }
};

var searchItem = function(item) {
  request('https://hacker-news.firebaseio.com/v0/item/' + item + '.json', function(error, response, body) {
      if (error) {
        throw error;
      } else {
        var item = JSON.parse(body);
        Word.find({}, '-articles',function(err, words) {  // Hold the articles
          if (item && item.type !== null) {
            for (var i = 0; i < words.length; i++){
              var re = new RegExp(words[i].word, 'gi');
              if (re.test(item.text)) {
                var theSentiment = getSentiment(item.text);
                saveEntry(item, words[i]._id, words[i].word, theSentiment);
              }
            } 
          }
        })
      }
    });
};

exports.watchData = function(req, res, next) {
  var currentMax;

  var loopSet = function() {
    request('https://hacker-news.firebaseio.com/v0/maxitem.json',
      function(error, response, body) {
      if (error) {
        throw error;
      } else {
        var currentMax = JSON.parse(body);
        if (currentMax > startPoint) {
          var newItemCount = currentMax - startPoint;
          for(var i = 0; i < newItemCount; i++){
            var currentItem = (startPoint + i);
            searchItem(currentItem);
          }
          startPoint = currentMax;
        }
      }
    });
    return;
  }

  setInterval(loopSet, 5000);
};

exports.historyData = function(id, word) {
  for (var i = historyPoint; i < startPoint; i++) {
    request('https://hacker-news.firebaseio.com/v0/item/' + i + '.json',
      function(error, response, body) {
        if (error) {
          throw error;
        } else {
          var item = JSON.parse(body);
          if (item && item.type !== undefined) {
            var re = new RegExp(word, 'gi');
            if (re.test(item.text)) {
              var theSentiment = getSentiment(item.text);
              saveEntry(item, id, word, theSentiment);
            }
          }
        }
      });
  }
}
