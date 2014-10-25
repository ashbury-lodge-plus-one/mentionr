'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  articles: [{ name: String, url: String, date: String }],
});

module.exports = mongoose.model('Word', WordSchema);
