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
    password: 'admin',
    words: [
      {word: 'Google'},
      {word: 'Paypal'}
    ]
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Word.find({}).remove(function() {
//   Word.create({
//     word: 'javascript',
//     articles: [{
//       title: 'javascript is fun',
//       storyUrl: 'https://google.com',
//       body: 'Stuff goes here...',
//       url: 'http://anothercoolurl.com',
//       date: '1414302801',
//       by: 'Bob',
//       sentiment: 25
//     }]
//   }, function() {
//       console.log('finished populating words');
//     }
//   );
// });