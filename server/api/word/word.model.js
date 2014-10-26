'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  articles: [{
    title: String,
    storyUrl: String,
    body: String,
    url: String,
    date: String,
    by: String,
    score: Number,
    itemType: String,
    sentiment: String
  }],
});

module.exports = mongoose.model('Word', WordSchema);
