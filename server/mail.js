var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mentionr.team@gmail.com',
        pass: 'mentionr123'
    }
});

var options = {
  from: 'Mentionr Team<mentionr.team@gmail.com>', // sender address
  to: 'jarrod.ruhland@gmail.com', // list of receivers
  subject: 'You\'ve been mentioned', // Subject line
  text: 'Hello world', // plaintext body
  html: '<h1>Mentionr Team</h1><p>You\'re being mentioned... Log in to Mentionr to see where...</p>' // html body
};

// send mail with defined transport object
module.exports = {
  sendMail: function(to, text) {
    // setup the template
    // options.to = to;
    // options.text = text;

    // send the message
    transporter.sendMail(options, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent to: ' + options.to)
        console.log(info.response);
      }
    });
  }
}