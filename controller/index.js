var express = require('express')
  , bodyParser = require('body-parser');

var app = express(); 
app.use(bodyParser.json());

app.post('/receive', function (req, res) {
  var type = ;
//   console.log(req.headers['x-amz-sns-message-type']);
  validateRequest(req.heaaders);
  
  switch (req.headers['x-amz-sns-message-type']) {
    case 'SubscriptionConfirmation':
      subscriptionConfirmation(req.body);
      break;
    case 'Notification':
      notification(req.body);
      break;
    case 'UnsubscribeConfirmation':
      unsubscribeConfirmation(req.body);
      break;
    
  }
  
  res.send({status: 'success'})
})
app.get('/test', (req, res) => res.send('Hello World!'))


var PORT = process.argv[2] || 9000;
var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});


function subscriptionConfirmation(body) {
  console.log(body);
  // visit SubscribeURL
  
}

function notification(body) {
  
}

function unsubscribeConfirmation(body) {
  
}