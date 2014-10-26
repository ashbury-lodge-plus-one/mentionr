var request = require('request');
var mongoose = require('mongoose');
var sentiment = require('sentiment');
var Word = require('./api/word/word.model');
var startPoint = 8510405; // Arbirtary...
var historyPoint = 8365500;

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
    } else if(sent >= 3 && sent < 6){
      return "Positive";
    } else if(sent >= 6 && sent < 9){
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
        request('http://localhost:9000/api/words', function(err, res, body) {
          body = JSON.parse(body);
          if (item !== null || item.type !== null) {
            for (var i = 0; i < body.length; i++){
              var re = new RegExp(body[i].word, 'gi');
              if (re.test(item.text)) {
                var theSentiment = getSentiment(item.text);
                saveEntry(item, body[i]._id, body[i].word, theSentiment);
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
          for(var i=0; i<newItemCount; i++){
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
    request('https://hacker-news.firebaseio.com/v0/item/' + word + '.json',
      function(error, response, body) {
        if (error) {
          throw error;
        } else {
          var item = JSON.parse(body);
          if (item && item.type !== undefined) {
            var re = new RegExp(word);
            if (re.test(item.text)) {
              var theSentiment = getSentiment(item.text);
              saveEntry(item, id, word, theSentiment);
            }
          }
        }
      });
  }
}
