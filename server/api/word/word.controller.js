'use strict';

var Word = require('./word.model');
var User = require('../user/user.model');
var fetchData = require('../../watchHN').historyData;

var handleError = function(res, err) {
  return res.json(500, err);
};

exports.index = function (req, res, next) {
  Word.find({}, '-articles',function(err, words) {  // Hold the articles
    if (err) return next(err);
    if (!words) return res.json(401);
    res.json(words);
  });
};

exports.removeWord = function(req, res, next) {
  var user = req.params.user;
  var word = req.params.id;

  User.findOne({_id: user}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(401);
    }
    var words = user.words;
    var len = words.length;
    for (var i = 0; i < len; i++) {
      if (words[i]._id.toString() === word) {
        words.splice(i, 1);
        break;
      }
    }
    user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      res.json(200);
    });
  })

};

exports.addWord = function(req, res, next) {
  req.body.word = req.body.word.toLowerCase();
  Word.findOne({word: req.body.word}, function(err, word) {
    if (err) {
      return next(err);
    }
    User.findById(req.body.userId, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(401);
      }
      if (word) {
        if (user.words.indexOf(word) === -1) {
          user.words.push(word);
        }
        user.save(function(err, user) {
          fetchData(word._id, word.word);

          res.json(word);
        });
      } else {
        var newWord = new Word(req.body);
        newWord.save(function(err, word) {
          if (err) {
            return handleError(res, err);
          }
          user.words.push(word);
          user.save(function(err, user) {
            fetchData(word._id, word.word);

            res.json(word);
          });
        });
      }
    });
  });
}

exports.show = function (req, res, next) {
  var word = req.params.id;
  Word.findById(word, function (err, word) {
    if (err) return next(err);
    if (!word) return res.send(401);
    res.json(word);
  });
};

