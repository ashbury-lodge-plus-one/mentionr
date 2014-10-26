'use strict';

var User = require('../api/user/user.model');
var Word = require('../api/word/word.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Word.find({}).remove(function() {
//   Word.create({
//     word: 'the',
//     articles: []
//   }, function() {
//       console.log('finished populating words');
//     }
//   );
// });