'use strict';

var Word = require('./word.model');

var handleError = function(res, err) {
  return res.json(500, err);
};

exports.index = function (req, res, next) {
  Word.find({}, '-articles', function(err, words) {  // Hold the articles
    if (err) return next(err);
    if (!words) return res.json(401);
    res.json(words);
  });
};

exports.create = function (req, res, next) {
  Word.findOne(req.body, function(err, word) {
    if (err) return handleError(res, err);
    if (word) return handleError(res, err);
    var newWord = new Word(req.body);
    newWord.save(function(err, word) {
      if (err) return handleError(res, err);
      res.json(word);
    });
  })
};

exports.show = function (req, res, next) {
  var word = req.params.id;
  Word.findById(word, function (err, word) {
    if (err) return next(err);
    if (!word) return res.send(401);
    res.json(word);
  });
};

