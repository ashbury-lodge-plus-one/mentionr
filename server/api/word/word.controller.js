'use strict';

var Word = require('./word.model');
var User = require('../user/user.model');

var handleError = function(res, err) {
  return res.json(500, err);
};

exports.index = function (req, res, next) {
  Word.find({}, function(err, words) {  // Hold the articles
    if (err) return next(err);
    if (!words) return res.json(401);
    res.json(words);
  });
};

exports.addWord = function(req, res, next) {
  Word.find({word: req.body.word}, function(err, word) {
    if (err) {
      return next(err);
    }
    if (word) {
      User.findById(req.body.userId, function(err, user) {
        if (user.words.indexOf(word) === -1) {
          user.words.push(word);
        }
        user.save();
        res.json(word);
      });
    }
    else {
      Word.findOne(req.body, function(err, word) {
        if (err) return handleError(res, err);
        if (word) res.send(401);
        var newWord = new Word(req.body);
        newWord.save(function(err, word) {
          if (err) {
            return handleError(res, err);
          }
          User.findById(req.body.userId, function(err, user) {
            if (user.words.indexOf(word) === -1) {
              user.words.push(word);
            }
            user.save();
            res.json(word);
          });
        });
      });
    }
  })
}

exports.show = function (req, res, next) {
  var word = req.params.id;
  Word.findById(word, function (err, word) {
    if (err) return next(err);
    if (!word) return res.send(401);
    res.json(word);
  });
};

