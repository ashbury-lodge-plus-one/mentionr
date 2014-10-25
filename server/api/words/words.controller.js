'use strict';

var Word = require('./user.model');

var handleError = function(res, err) {
  return res.json(422, err);
};

exports.index = function (req, res, next) {
  Word.find({}, '-articles', function(err, words) {  // Hold the articles
    if (err) return next(err);
    if (!words) return res.json(401);
    res.json(words);
  });
};

exports.create = function (req, res, next) {
  Word.findOne(req.body)
  var newWord = new Word(req.body);
  newWord.save(function(err, word) {
    if (err) return handleError(res, err);
    res.json(word);
  });
};

exports.show = function (req, res, next) {
  var word = req.params.id;
  Word.findId(word, function (err, word) {
    if (err) return next(err);
    if (!word) return res.send(401);
    res.json(word);
  });
};

