var request = require('request');
var mongoose = require('mongoose');
var sentiment = require('sentiment');
var Word = require('./api/word/word.model');
var startPoint = 8510297; // Arbirtary...
var historyPoint = 8365500;

var saveEntry = function(item, id, entry, theSentiment) {
  var article = {
    title: item.title,
    storyUrl: item.url,
    url: 'http://news.ycombinator.com/item?id=' + item.id,
    by: item.by,
    date: item.time,
    body: item.text,
    type: item.type,
    sentiment: theSentiment
  };

  Word.findOne({_id: id}, function(err, word) {
    if (err) {
      return new Error(err);
    }
    if (!word) {
      var newWord = new Word({_id: id, articles: [article]});
      return newWord.save();
    }
    word.articles.push(article);
    word.save();
  });
}

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
              var re = new RegExp(body[i].word);
              if (re.test(item.text)) {
                var theSentiment = sentiment(item.text);
                saveEntry(item, body[i]._id, body[i].word, theSentiment.score);
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
          if (item !== null || item.type !== null) {
            var re = new RegExp(word);
            if (re.test(item.text)) {
              var theSentiment = sentiment(item.text);
              saveEntry(item, id, word, theSentiment.score);
            }
          }
        }
      });
  }
}
