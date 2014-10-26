'use strict';

var User = require('../api/user/user.model');
var Word = require('../api/word/word.model');

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin',
//     words: []
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

// Word.find({}).remove(function() {
//   Word.create({
//     word: 'javascript',
//     articles: []

//   }, function() {
//       console.log('finished populating words');
//     }
//   );
// });