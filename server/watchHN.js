var request = require('request');
var mongoose = require('mongoose');
var sentiment = require('sentiment');
var Word = require('./api/word/word.model');
var startPoint = 8510122 - 25; // Arbirtary...

var saveEntry = function(item, id, entry, theSentiment) {
  var article = {
    title: item.title,
    storyUrl: item.url,
    url: 'http://news.ycombinator.com/item?id=' + item.id,
    by: item.by,
    date: item.time,
    body: item.text,
    score: item.score,
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
