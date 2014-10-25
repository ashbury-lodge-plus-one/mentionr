var request = require('request');
var mongoose = require('mongoose');
var startPoint = 8447299;

exports.watchData = function(req, res, next) {
  var currentMax;

  function loopSet() {
    request('https://hacker-news.firebaseio.com/v0/maxitem.json', function(
      error, response, body) {
      if (error) {
        throw error;
      } else {
        var currentMax = JSON.parse(body);
        if (currentMax > startPoint) {
          var newItemCount = currentMax - startPoint;
          console.log('New items added!', newItemCount);
          startPoint = currentMax;
          searchItem(currentMax);
        } else {
          console.log('No new items...' + ' Current count: ' +
            currentMax + ' Starting Count: ' + startPoint);
        }
      }
    });
    return;
  }
  setInterval(loopSet, 5000);
};

var searchItem = function(item) {
  console.log(item);
  request('https://hacker-news.firebaseio.com/v0/item/' + item + '.json', function(error, response, body) {
      if (error) {
        throw error;
      } else {
        var item = JSON.parse(body);
        request('http://localhost:9000', function(err, res, body){
          console.log(JSON.parse.body);
        })
        for(var i=0; i<wordCount; i++){
          var re = new RegExp(words[i]);
          if(re.test(item.text)){
            //save link to users database 
          }
        }
      }
    });
};



