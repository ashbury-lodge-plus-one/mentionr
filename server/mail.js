var nodemailer = require('nodemailer');
var User = require('./api/user/user.model');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mentionr.team@gmail.com',
        pass: 'mentionr123'
    }
});

var updateTemplate = {
  from: 'Mentionr Team<mentionr.team@gmail.com>', // sender address
  subject: 'You\'ve been mentioned!', // Subject line
  text: 'You\'re being mentioned... Log in to Mentionr to see where...', // plaintext body
  html: '<h1>Mentionr Team</h1><p>You\'re being mentioned... Log in to Mentionr to see where...</p>' // html body
};

var welcomeTemplate = {
  from: 'Mentionr Team<mentionr.team@gmail.com>', // sender address
  subject: 'Welcome to Mentionr', // Subject line
  text: 'Thanks for signing up for the Mentionr Beta, enjoy!', // plaintext body
  html: 'Thanks for signing up for the Mentionr Beta, enjoy!' // html body
};

// send mail with defined transport object
module.exports = {
  sendUpdates: function() {
    User.find({}, '-role -hashedPassword -provider -salt -words',
      function(err, users) {
        var len = users.length;
        for (var i = 0; i < len; i++) {
          var user = users[i];
          updateTemplate.to = user.email;
          transporter.sendMail(updateTemplate, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Message sent to: ' + updateTemplate.to)
              console.log(info.response);
            }
          });
        }
      });

    // send the message
  },

  sendWelcome: function(to) {
    welcomeTemplate.to = to;
    // send the message
    transporter.sendMail(welcomeTemplate, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Welcome email sent to: ' + to)
        console.log(info.response);
      }
    });
  }
}